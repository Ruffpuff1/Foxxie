import { ModerationCommand } from '#lib/structures';
import { ChatInputArgs, CommandName, GuildInteraction } from '#lib/types';
import { PermissionFlagsBits } from 'discord-api-types/v9';
import { RegisterChatInputCommand } from '#utils/decorators';
import { CommandOptionsRunTypeEnum } from '@sapphire/framework';
import { enUS, floatPromise } from '#utils/util';
import type { TFunction } from '@sapphire/plugin-i18next';
import { Guild, GuildMember, MessageEmbed, Role, User } from 'discord.js';
import { cast, chunk, resolveToNull, ZeroWidthSpace } from '@ruffpuff/utilities';
import { LanguageKeys } from '#lib/i18n';
import { pronouns } from '#utils/transformers';
import { BrandingColors } from '#utils/constants';
import { PaginatedMessage } from '@sapphire/discord.js-utilities';
import { isGuildOwner } from '#utils/Discord';
import { acquireSettings, GuildSettings } from '#lib/database';

const SORT = (x: Role, y: Role) => Number(y.position > x.position) || Number(x.position === y.position) - 1;
const roleMention = (role: Role): string => role.toString();
const roleLimit = 10;

@RegisterChatInputCommand(
    CommandName.Info,
    builder =>
        builder //
            .setDescription('info cmd')
            .addSubcommand(command =>
                command //
                    .setName('user')
                    .setDescription(enUS(LanguageKeys.Commands.General.InfoDescriptionUser))
                    .addUserOption(option =>
                        option //
                            .setName('user')
                            .setDescription('the user')
                            .setRequired(false)
                    )
                    .addBooleanOption(option =>
                        option //
                            .setName('ephemeral')
                            .setDescription(enUS(LanguageKeys.System.OptionEphemeralDefaultFalse))
                            .setRequired(false)
                    )
            )
            .addSubcommand(command =>
                command //
                    .setName('server')
                    .setDescription(enUS(LanguageKeys.Commands.General.InfoDescriptionServer))
                    .addBooleanOption(option =>
                        option //
                            .setName('ephemeral')
                            .setDescription(enUS(LanguageKeys.System.OptionEphemeralDefaultFalse))
                            .setRequired(false)
                    )
            ),
    [],
    {
        runIn: [CommandOptionsRunTypeEnum.GuildAny],
        requiredClientPermissions: PermissionFlagsBits.EmbedLinks
    }
)
export class UserCommand extends ModerationCommand {
    public chatInputRun(...[interaction, ctx, args]: ChatInputArgs<CommandName.Info>) {
        const subcommand = interaction.options.getSubcommand(true);
        switch (subcommand) {
            case 'user':
                return this.user(interaction, ctx, args!);
            case 'server':
                return this.server(interaction, ctx, args!);
            default:
                throw new Error(`Subcommand "${subcommand}" not supported.`);
        }
    }

    private async user(...[interaction, , { t, user: args }]: Required<ChatInputArgs<CommandName.Info>>): Promise<any> {
        const user = args.user?.user || interaction.user;
        await interaction.deferReply({ ephemeral: args.ephemeral });

        await floatPromise(user.fetch());

        const display = await this.buildUserDisplay(cast<GuildInteraction>(interaction), t, user);

        await display.run(interaction, interaction.user);
    }

    private async server(...[interaction, , { t, server: args }]: Required<ChatInputArgs<CommandName.Info>>): Promise<any> {
        await interaction.deferReply({ ephemeral: args.ephemeral });

        const display = await this.buildServerDisplay(cast<GuildInteraction>(interaction), interaction.guild!, t);
        await display.run(interaction, interaction.user);
    }

    private async buildServerDisplay(interaction: GuildInteraction, guild: Guild, t: TFunction) {
        const [messages, owner, color] = await this.fetchServerData(guild);

        const template = new MessageEmbed() //
            .setColor(color || interaction.guild.me!.displayColor || BrandingColors.Primary)
            .setAuthor({
                name: `${guild.name} [${guild.id}]`,
                iconURL: guild.iconURL({ dynamic: true })!,
                url: guild.vanityURLCode ? `https://discord.gg/${guild.vanityURLCode}` : undefined
            });

        const titles = t(LanguageKeys.Commands.General.InfoServerTitles);
        const channels = guild.channels.cache.filter(c => c.type !== 'GUILD_CATEGORY');
        const { staticEmojis, animated, hasEmojis } = this.getServerEmojiData(guild);
        const none = t(LanguageKeys.Globals.None);

        const display = new PaginatedMessage({ template }) //
            .addPageEmbed(embed => {
                embed //
                    .setThumbnail(guild.iconURL({ dynamic: true })!)
                    .setDescription(
                        [
                            t(LanguageKeys.Commands.General.InfoServerCreated, {
                                owner: owner.user.tag,
                                created: guild.createdAt
                            }),
                            guild.description ? `*"${guild.description}"*` : null
                        ]
                            .filter(a => Boolean(a))
                            .join('\n')
                    );

                embed //
                    .addField(
                        t(LanguageKeys.Commands.General.InfoServerTitlesRoles, {
                            count: guild.roles.cache.size - 1
                        }),
                        this.getServerRoles(guild, t)
                    );

                return embed
                    .addField(
                        titles.members,
                        t(LanguageKeys.Commands.General.InfoServerMembers, {
                            size: guild.memberCount,
                            cache: guild.members.cache.size
                        }),
                        true
                    )
                    .addField(
                        t(LanguageKeys.Commands.General.InfoServerTitlesChannels, {
                            count: channels.size
                        }),
                        t(LanguageKeys.Commands.General.InfoServerChannels, {
                            channels
                        }),
                        true
                    )
                    .addField(
                        t(LanguageKeys.Commands.General.InfoServerTitlesEmojis, {
                            count: staticEmojis + animated
                        }),
                        hasEmojis
                            ? t(LanguageKeys.Commands.General.InfoServerEmojis, {
                                  static: staticEmojis,
                                  animated
                              })
                            : none,
                        true
                    )
                    .addField(
                        titles.stats,
                        t(LanguageKeys.Commands.General.InfoServerMessages, {
                            messages
                        }),
                        true
                    )
                    .addField(
                        titles.security,
                        t(LanguageKeys.Commands.General.InfoServerSecurity, {
                            filter: guild.verificationLevel,
                            content: guild.explicitContentFilter
                        })
                    );
            });

        this.addServerRoles(guild, display);

        return display;
    }

    private addServerRoles(guild: Guild, display: PaginatedMessage): void {
        const roles = [
            ...guild.roles.cache
                .filter(role => role.id !== guild.id)
                .sort(SORT)
                .values()
        ];

        if (roles.length > roleLimit) {
            for (const page of chunk(roles, 24)) {
                if (page.length <= 12) {
                    display.addPageBuilder(builder =>
                        builder.setEmbeds([new MessageEmbed().addField(ZeroWidthSpace, page.map(roleMention).join('\n'))]).setContent(null!)
                    );
                } else {
                    const left = page.slice(0, 12);
                    const right = page.slice(12);

                    display.addPageBuilder(builder =>
                        builder
                            .setEmbeds([
                                new MessageEmbed()
                                    .addField(ZeroWidthSpace, left.map(roleMention).join('\n'), true)
                                    .addField(ZeroWidthSpace, right.map(roleMention).join('\n'), true)
                            ])
                            .setContent(null!)
                    );
                }
            }
        }
    }

    private async fetchServerData(guild: Guild): Promise<[number, GuildMember, number]> {
        const messages = await acquireSettings(guild, GuildSettings.MessageCount);
        const me = guild.me!;
        const owner = await guild.members.fetch(guild.ownerId);

        return [messages, owner, me.displayColor];
    }

    private getServerRoles(guild: Guild, t: TFunction): string {
        const roles = [...guild.roles.cache.values()].sort(SORT);
        roles.pop();

        const size = roles.length;
        if (size <= roleLimit)
            return t(LanguageKeys.Globals.And, {
                value: roles.map(roleMention)
            });

        const mentions = roles
            .slice(0, roleLimit - 1)
            .map(roleMention)
            .concat(
                t(LanguageKeys.Commands.General.InfoServerRolesAndMore, {
                    count: size - roleLimit
                })
            );

        return t(LanguageKeys.Globals.And, { value: mentions });
    }

    private getServerEmojiData(guild: Guild): {
        staticEmojis: number;
        animated: number;
        hasEmojis: boolean;
    } {
        return {
            staticEmojis: guild.emojis.cache.filter(emoji => !emoji.animated).size,
            animated: guild.emojis.cache.filter(emoji => Boolean(emoji.animated)).size,
            hasEmojis: guild.emojis.cache.size > 0
        };
    }

    private async buildUserDisplay(interaction: GuildInteraction, t: TFunction, user: User): Promise<any> {
        const settings = await this.fetchUserSettings(interaction.guild.id, user.id);
        const titles = t(LanguageKeys.Commands.General.InfoUserTitles);

        let authorString = `${user.tag} [${user.id}]`;
        const member = await resolveToNull(interaction.guild.members.fetch(user.id));

        const pnKey = pronouns(settings.member.pronouns);
        if (pnKey) authorString += ` (${pnKey})`;

        const template = new MessageEmbed()
            .setColor(settings.user.profile.color || interaction.guild.me?.displayColor || BrandingColors.Primary)
            .setThumbnail(member?.displayAvatarURL({ dynamic: true }) || user.displayAvatarURL({ dynamic: true }))
            .setAuthor({
                name: authorString,
                iconURL: user.displayAvatarURL({ dynamic: true })
            });

        const UserPageLabels = t(LanguageKeys.Commands.General.InfoUserSelectMenu);

        const display = new PaginatedMessage({ template }) //
            .setSelectMenuOptions(pageIndex => ({ label: UserPageLabels[pageIndex - 1] }))
            .addAsyncPageEmbed(async embed => {
                const about = [
                    t(LanguageKeys.Commands.General.InfoUserDiscordJoin, {
                        created: user.createdAt
                    })
                ];
                if (member) this.addMemberData(member, about, t, settings.member.messageCount);
                embed.addField(titles.about, about.join('\n'));

                if (member) this.addRoles(embed, member, t);
                await this.addWarnings(embed, user.id, interaction.guild.id, t);
                await this.addNotes(embed, user.id, interaction.guild.id, t);

                return embed;
            });

        if (user.banner)
            display.addPageEmbed(embed =>
                embed //
                    .setThumbnail(null!)
                    .setImage(user.bannerURL({ dynamic: true, size: 4096 })!)
            );

        return display;
    }

    private addMemberData(member: GuildMember, about: string[], t: TFunction, messages: number): void {
        about.push(
            t(LanguageKeys.Commands.General[`InfoUser${isGuildOwner(member) ? 'GuildCreate' : 'GuildJoin'}`], {
                joined: member.joinedAt,
                name: member.guild.name
            }),
            t(LanguageKeys.Commands.General.InfoUserMessages, { messages })
        );
    }

    private addRoles(embed: MessageEmbed, member: GuildMember, t: TFunction) {
        const arr = [...member.roles.cache.values()];
        arr.sort((a, b) => b.position - a.position);

        let isSpacer = false;
        const roleString = arr
            .filter(role => role.id !== member.guild.id)
            .reduce((acc, role, idx) => {
                if (acc.length + role.name.length < 1010) {
                    if (role.name.startsWith('⎯⎯⎯')) {
                        isSpacer = true;
                        return `${acc}\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n`;
                    }
                    const comma = idx !== 0 && !isSpacer ? ', ' : '';
                    isSpacer = false;
                    return acc + comma + role.name;
                }
                return acc;
            }, '');

        if (arr.length)
            embed.addField(
                t(LanguageKeys.Commands.General.InfoUserTitlesRoles, {
                    count: arr.length - 1
                }),
                roleString.length ? roleString : t(LanguageKeys.Globals.None)
            );
    }

    private async addWarnings(embed: MessageEmbed, userId: string, guildId: string, t: TFunction) {
        const warnings = await this.container.db.warnings.find({
            id: userId,
            guildId
        });
        if (!warnings.length) return;

        for (const { author } of warnings) await floatPromise(this.client.users.fetch(author));
        embed.addField(
            t(LanguageKeys.Commands.General.InfoUserTitlesWarnings, {
                count: warnings.length
            }),
            warnings.map((w, i) => w.display(i, t)).join('\n')
        );
    }

    private async addNotes(embed: MessageEmbed, userId: string, guildId: string, t: TFunction) {
        const notes = await this.container.db.notes.find({
            id: userId,
            guildId
        });
        if (!notes.length) return;

        for (const { author } of notes) await floatPromise(this.client.users.fetch(author));
        embed.addField(
            t(LanguageKeys.Commands.General.InfoUserTitlesNotes, {
                count: notes.length
            }),
            notes.map((n, i) => n.display(i, t)).join('\n')
        );
    }

    private async fetchUserSettings(guildId: string, userId: string) {
        return {
            user: await this.container.db.users.ensureProfile(userId),
            member: await this.container.db.members.ensure(userId, guildId)
        };
    }
}
