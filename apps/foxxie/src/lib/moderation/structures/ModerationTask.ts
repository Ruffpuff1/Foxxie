import type { Guild, Snowflake } from 'discord.js';

import { isNullish } from '@sapphire/utilities';
import { readSettings } from '#lib/database/settings/functions';
import { ModerationAction } from '#lib/moderation/actions/base/ModerationAction';
import { PartialResponseValue, ResponseType } from '#root/Core/structures/schedule/index';
import { Task } from '#root/Core/structures/Task';
import { getModeration } from '#utils/functions';
import { SchemaKeys } from '#utils/moderationConstants';

export interface ModerationData<T = unknown> {
	[SchemaKeys.Case]: number;
	[SchemaKeys.Duration]: number;
	[SchemaKeys.ExtraData]: T;
	[SchemaKeys.Guild]: string;
	[SchemaKeys.User]: string;
	scheduleRetryCount?: number;
}

export abstract class ModerationTask<T = unknown> extends Task {
	public async run(data: ModerationData<T>): Promise<PartialResponseValue> {
		const guild = this.container.client.guilds.cache.get(data.guildId);
		// If the guild is not available, cancel the task.
		if (isNullish(guild)) return { type: ResponseType.Ignore };

		// If the guild is not available, re-schedule the task by creating
		// another with the same data but happening 20 seconds later.
		if (!guild.available) return { type: ResponseType.Delay, value: 20000 };

		// Run the abstract handle function.
		try {
			await this.handle(guild, data);
		} catch {
			/* noop */
		}

		// Mark the moderation entry as complete.
		await getModeration(guild).complete(data.caseId);

		return { type: ResponseType.Finished };
	}

	protected async getActionData<ContextType = never>(
		guild: Guild,
		_: Snowflake,
		context?: ContextType
	): Promise<ModerationAction.Data<ContextType>> {
		const settings = await readSettings(guild);
		return {
			context,
			moderator: null,
			sendDirectMessage: settings.messagesModerationDm
		};
	}

	protected getReasonContext(duration: number) {
		return {
			context: 'reason',
			duration
		} as const;
	}

	protected abstract handle(guild: Guild, data: ModerationData<T>): unknown;
}
