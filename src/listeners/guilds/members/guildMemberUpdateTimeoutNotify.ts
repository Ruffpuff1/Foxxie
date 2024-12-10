import { readSettings } from '#lib/database';
import { ModerationActions } from '#lib/moderation';
import { getLogger, getModeration } from '#utils/functions';
import { TypeMetadata, TypeVariation } from '#utils/moderationConstants';
import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener } from '@sapphire/framework';
import { isNumber } from '@sapphire/utilities';
import { GuildMember } from 'discord.js';

@ApplyOptions<Listener.Options>({ event: Events.GuildMemberUpdate })
export class UserListener extends Listener {
	public async run(previous: GuildMember, next: GuildMember) {
		const prevTimeout = this.#getTimeout(previous);
		const nextTimeout = this.#getTimeout(next);

		if (prevTimeout === nextTimeout) return;

		const { user, guild } = next;
		const logger = getLogger(guild);

		// If the action was done by Foxxie, skip:
		const actionByFoxxie = logger.timeout.isSet(user.id);
		if (actionByFoxxie) return;

		const controller = new AbortController();
		const contextPromise = logger.timeout.wait(user.id, controller.signal);

		const settings = await readSettings(guild);
		const manualLoggingEnabled = settings.eventsMuteAdd;

		if (!manualLoggingEnabled) {
			controller.abort();
			return;
		}

		const context = await contextPromise;
		const moderation = getModeration(guild);

		const duration = this.#getDuration(nextTimeout);

		const entry = moderation.create({
			user,
			moderator: context?.userId,
			type: TypeVariation.Timeout,
			metadata: duration ? TypeMetadata.Temporary : TypeMetadata.Undo,
			duration,
			reason: context?.reason
		});

		if (!nextTimeout) await ModerationActions.timeout.completeLastModerationEntryFromUser({ guild, userId: user.id });
		await moderation.insert(entry);
	}

	#getTimeout(member: GuildMember) {
		const timeout = member.communicationDisabledUntilTimestamp;
		return isNumber(timeout) && timeout >= Date.now() ? timeout : null;
	}

	#getDuration(timeout: number | null) {
		if (timeout === null) return null;

		const now = Date.now();
		return timeout > now ? timeout - now : null;
	}
}
