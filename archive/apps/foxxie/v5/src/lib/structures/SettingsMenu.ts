import {
  configurableGroups,
  isSchemaGroup,
  acquireSettings,
  remove,
  SchemaGroup,
  SchemaKey,
  set,
  writeSettings,
} from "#lib/database";
import { api } from "#external/Api";
import { LanguageKeys } from "#lib/i18n";
import { GuildMessage, Events } from "#lib/types";
import { floatPromise, sendLoadingMessage } from "#utils/util";
import { deleteMessage } from "#utils/Discord";
import {
  LLRCData,
  LongLivingReactionCollector,
} from "#external/LongLivingReactionCollector";
import { container } from "@sapphire/pieces";
import { deepClone, minutes, ZeroWidthSpace } from "@ruffpuff/utilities";
import { RESTJSONErrorCodes } from "discord-api-types/v9";
import { DiscordAPIError, MessageCollector, MessageEmbed } from "discord.js";
import type { TFunction } from "@sapphire/plugin-i18next";
import * as Lexure from "lexure";
import { FoxxieArgs } from "./commands/parsers/FoxxieArgs";
import type { FoxxieCommand } from "./commands/FoxxieCommand";

const EMOJIS = { BACK: "◀", STOP: "⏹" };
const TIMEOUT = minutes(15);

const enum UpdateType {
  Set,
  Remove,
  Reset,
  Replace,
}

export class SettingsMenu {
  private readonly message: GuildMessage;

  private t: TFunction;

  private schema: SchemaKey | SchemaGroup;

  private messageCollector: MessageCollector | null = null;

  private errorMessage: string | null = null;

  private llrc: LongLivingReactionCollector | null = null;

  private readonly embed: MessageEmbed;

  private response: GuildMessage | null = null;

  private oldValue: unknown = undefined;

  public constructor(message: GuildMessage, language: TFunction) {
    this.message = message;
    this.t = language;
    this.schema = configurableGroups;
    this.embed = new MessageEmbed().setAuthor({
      name: this.message.author.username,
      iconURL: this.message.author.displayAvatarURL({
        size: 128,
        format: "png",
        dynamic: true,
      }),
    });
  }

  public async init(context: FoxxieCommand.Context): Promise<void> {
    this.response = (await sendLoadingMessage(this.message)) as GuildMessage;
    await this.response.react(EMOJIS.STOP);
    this.llrc = new LongLivingReactionCollector()
      .setListener(this.onReaction.bind(this))
      .setEndListener(this.stop.bind(this));
    this.llrc.setTime(TIMEOUT);
    this.messageCollector = this.response.channel.createMessageCollector({
      filter: (msg) => msg.author!.id === this.message.author.id,
    });

    this.messageCollector.on("collect", (msg) =>
      this.onMessage(msg as GuildMessage, context)
    );
    await this._renderResponse();
  }

  private async render() {
    const { t } = this;
    const description: string[] = [];
    if (isSchemaGroup(this.schema)) {
      description.push(
        t(LanguageKeys.Commands.Admin.ConfMenuRenderAtFolder, {
          path: this.schema.name,
        })
      );
      if (this.errorMessage) description.push(this.errorMessage);
      const keys: string[] = [];
      const folders: string[] = [];
      for (const [key, value] of this.schema
        .sort((a, b) => a.name.localeCompare(b.name))
        .entries()) {
        if (value.dashboardOnly) continue;
        if (isSchemaGroup(value)) folders.push(key);
        else keys.push(key);
      }

      if (!folders.length && !keys.length)
        description.push(t(LanguageKeys.Commands.Admin.ConfMenuRenderNoKeys));
      else
        description.push(
          t(LanguageKeys.Commands.Admin.ConfMenuRenderSelect),
          "",
          ...folders.map((folder) => `📁 ${folder}`),
          ...keys.map((key) => `⚙️ ${key}`)
        );
    } else {
      description.push(
        t(LanguageKeys.Commands.Admin.ConfMenuRenderAtPiece, {
          path: this.schema.name,
        })
      );
      if (this.errorMessage) description.push("\n", this.errorMessage, "\n");

      const [value, serialized, language] = await acquireSettings(
        this.message.guild,
        (settings) => {
          const language = settings.getLanguage();
          const key = this.schema as SchemaKey;
          return [
            settings[key.property],
            key.display(settings, language),
            language,
          ];
        }
      );
      this.t = language;
      description.push(
        t(this.schema.description),
        "",
        t(LanguageKeys.Commands.Admin.ConfMenuRenderUpdate)
      );
      if (this.schema.array && (value as unknown[]).length)
        description.push(t(LanguageKeys.Commands.Admin.ConfMenuRenderRemove));
      if (this.updatedValue)
        description.push(t(LanguageKeys.Commands.Admin.ConfMenuRenderReset));
      if (this.updatedValue)
        description.push(t(LanguageKeys.Commands.Admin.ConfMenuRenderUndo));
      description.push(
        "",
        t(LanguageKeys.Commands.Admin.ConfMenuRenderCValue, {
          value: serialized,
        })
      );
    }

    const { parent } = this.schema;
    if (parent) await floatPromise(this._reactResponse(EMOJIS.BACK));
    else
      await floatPromise(
        this._removeReactionFromUser(EMOJIS.BACK, this.message.client.user!.id)
      );

    return this.embed
      .setColor(await container.db.fetchColor(this.message))
      .setDescription(
        `${description.filter((v) => v !== null).join("\n")}\n${ZeroWidthSpace}`
      )
      .setFooter({
        text: parent ? t(LanguageKeys.Commands.Admin.ConfMenuRenderBack) : "",
      })
      .setTimestamp();
  }

  private async onMessage(
    message: GuildMessage,
    context: FoxxieCommand.Context
  ) {
    // In case of messages that do not have a content, like attachments, ignore
    if (!message.content) return;

    this.llrc?.setTime(TIMEOUT);
    this.errorMessage = null;
    if (isSchemaGroup(this.schema)) {
      const schema = this.schema.get(message.content.toLowerCase());
      if (schema && !schema.dashboardOnly) {
        this.schema = schema as SchemaKey | SchemaGroup;
        this.oldValue = undefined;
      } else {
        this.errorMessage = this.t(
          LanguageKeys.Commands.Admin.ConfMenuInvalidKey
        );
      }
    } else {
      //                                                                                                           parser context
      const conf = container.stores
        .get("commands")
        .get("conf") as FoxxieCommand;
      // @ts-expect-error lexer is a private property.
      const lexureParser = new Lexure.Parser(
        conf.lexer.setInput(message.content).lex()
      );
      const lexureArgs = new Lexure.Args(lexureParser.parse());
      const args = new FoxxieArgs(
        this.message,
        conf,
        lexureArgs,
        context,
        this.t,
        0
      );

      const commandLowerCase = args.next().toLowerCase(); //
      if (commandLowerCase === "set")
        await this.tryUpdate(UpdateType.Set, args);
      else if (commandLowerCase === "remove")
        await this.tryUpdate(UpdateType.Remove, args);
      else if (commandLowerCase === "reset")
        await this.tryUpdate(UpdateType.Reset);
      else if (commandLowerCase === "undo") await this.tryUndo();
      else
        this.errorMessage = this.t(
          LanguageKeys.Commands.Admin.ConfMenuInvalidAction
        );
    }

    if (!this.errorMessage) await floatPromise(deleteMessage(message));
    await this._renderResponse();
  }

  private async onReaction(reaction: LLRCData): Promise<void> {
    if (reaction.userId !== this.message.author.id) return;
    this.llrc?.setTime(TIMEOUT);
    if (reaction.emoji.name === EMOJIS.STOP) {
      this.llrc?.end();
    } else if (reaction.emoji.name === EMOJIS.BACK) {
      await floatPromise(
        this._removeReactionFromUser(EMOJIS.BACK, reaction.userId)
      );
      if (this.schema.parent) {
        this.schema = this.schema.parent;
        this.oldValue = undefined;
      }
      await this._renderResponse();
    }
  }

  private async _removeReactionFromUser(reaction: string, userId: string) {
    if (!this.response) return;
    try {
      return await api()
        .channels(this.message.channel.id)
        .messages(this.response.id)
        .reactions(
          encodeURIComponent(reaction),
          userId === this.message.client.user!.id ? "@me" : userId
        )
        .delete();
    } catch (error) {
      if (error instanceof DiscordAPIError) {
        if (error.code === RESTJSONErrorCodes.UnknownMessage) {
          this.response = null;
          this.llrc?.end();
          return this;
        }

        if (error.code === RESTJSONErrorCodes.UnknownEmoji) {
          return this;
        }
      }

      // Log any other error
      this.message.client.emit(Events.Error, error);
    }
  }

  private async _reactResponse(emoji: string) {
    if (!this.response) return;
    try {
      await this.response.react(emoji);
    } catch (error) {
      if (
        error instanceof DiscordAPIError &&
        error.code === RESTJSONErrorCodes.UnknownMessage
      ) {
        this.response = null;
        this.llrc?.end();
      } else {
        this.message.client.emit(Events.Error, error as Error);
      }
    }
  }

  private async _renderResponse() {
    if (!this.response) return;
    try {
      const embed = await this.render();
      await this.response.edit({ embeds: [embed], content: null });
    } catch (error) {
      if (
        error instanceof DiscordAPIError &&
        error.code === RESTJSONErrorCodes.UnknownMessage
      ) {
        this.response = null;
        this.llrc?.end();
      } else {
        this.message.client.emit(Events.Error, error as Error);
      }
    }
  }

  private async tryUpdate(
    action: UpdateType,
    args: FoxxieArgs | null = null,
    value: unknown = null
  ) {
    try {
      const key = this.schema as SchemaKey;
      const [oldValue, skipped] = await writeSettings(
        this.message.guild,
        async (settings) => {
          const oldValue = deepClone(settings[key.property]);

          switch (action) {
            case UpdateType.Set: {
              this.t = await set(settings, key, args!);
              break;
            }
            case UpdateType.Remove: {
              this.t = await remove(settings, key, args!);
              break;
            }
            case UpdateType.Reset: {
              Reflect.set(settings, key.property, key.default);
              this.t = settings.getLanguage();
              break;
            }
            case UpdateType.Replace: {
              Reflect.set(settings, key.property, value);
              this.t = settings.getLanguage();
              break;
            }
          }

          return [oldValue, false];
        }
      );

      if (skipped) {
        this.errorMessage = this.t(
          LanguageKeys.Commands.Admin.ConfMenuNoChange,
          { key: key.name }
        );
      } else {
        this.oldValue = oldValue;
      }
    } catch (error) {
      this.errorMessage = String(error.message || error);
    }
  }

  private async tryUndo() {
    if (this.updatedValue) {
      await this.tryUpdate(UpdateType.Replace, null, this.oldValue);
    } else {
      const key = this.schema as SchemaKey;
      this.errorMessage = this.t(LanguageKeys.Commands.Admin.ConfMenuNoChange, {
        key: key.name,
      });
    }
  }

  private async stop(): Promise<void> {
    if (this.response) {
      if (this.response.reactions.cache.size) {
        await floatPromise(this.response.reactions.removeAll());
      }

      const content = this.t(LanguageKeys.Commands.Admin.ConfMenuSaved);
      await floatPromise(this.response.edit({ content, embeds: [] }));
    }

    if (!this.messageCollector!.ended) this.messageCollector!.stop();
  }

  private get updatedValue(): boolean {
    return this.oldValue !== undefined;
  }
}
