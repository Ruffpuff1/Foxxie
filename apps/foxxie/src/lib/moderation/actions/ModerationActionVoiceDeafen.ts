import { api } from '#lib/discord/Api';
import { ModerationAction } from '#lib/moderation/actions/base/ModerationAction';
import { resolveOnErrorCodes } from '#utils/common';
import { TypeVariation } from '#utils/moderationConstants';
import { type Guild, RESTJSONErrorCodes, type Snowflake } from 'discord.js';

export class ModerationActionVoiceDeafen extends ModerationAction<never, TypeVariation.VoiceDeafen> {
	public constructor() {
		super({
			isUndoActionAvailable: true,
			logPrefix: 'Moderation => VoiceDeafen',
			type: TypeVariation.VoiceDeafen
		});
	}

	public override async isActive(guild: Guild, userId: Snowflake) {
		const member = await resolveOnErrorCodes(guild.members.fetch(userId), RESTJSONErrorCodes.UnknownMember);
		return member?.voice.selfDeaf ?? false;
	}

	protected override async handleApplyPre(guild: Guild, entry: ModerationAction.Entry) {
		const reason = await this.getReason(guild, entry.reason);
		await api().guilds.editMember(guild.id, entry.userId, { deaf: true }, { reason });

		await this.completeLastModerationEntryFromUser({ guild, userId: entry.userId });
	}

	protected override async handleUndoPre(guild: Guild, entry: ModerationAction.Entry) {
		const reason = await this.getReason(guild, entry.reason, true);
		await api().guilds.editMember(guild.id, entry.userId, { deaf: false }, { reason });

		await this.completeLastModerationEntryFromUser({ guild, userId: entry.userId });
	}
}
