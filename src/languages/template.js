const { emojis: { infinity, perms: { notSpecified, granted, denied }, covid: { cases, tests, deaths, recoveries }, weather: { temperature, date, humidity, winds, feels, timezone, dayCurrent } } } = require('../../lib/util/constants');
const { topggURL, supportServer, inviteURL } = require('../../config/foxxie')
const { toUpperCaseFirst } = require('../../lib/util/util');

module.exports = {

    name: 'template',
        DEFAULT: key => ``,
        PREFIX_REMINDER: (prefix, prefixes) => ``,

        MESSAGE_LOADING: ``,

        // Responders
        RESPONDER_ERROR_CODE: ``,
        RESPONDER_ERROR_PERMS_AUTHOR: perm => ``,
        RESPONDER_ERROR_PERMS_CLIENT: perm => ``,
        RESPONDER_FOXXIE_CUBBY_WRONG_CHANNEL: msg => ``,

        // Automation Commands
        COMMAND_WELCOME_DESCRIPTION: ``,
        COMMAND_WELCOME_CHANNEL_NOCHANNEL: ``,
        COMMAND_WELCOME_CHANNEL_NOW: channel => ``,
        COMMAND_WELCOME_CHANNEL_REMOVED: ``,
        COMMAND_WELCOME_CHANNEL_SET: channel => ``,
        COMMAND_WELCOME_INVALIDUSE: ``,
        COMMAND_WELCOME_MESSAGE_NOMESSAGE: ``,
        COMMAND_WELCOME_MESSAGE_NOW: message => ``,
        COMMAND_WELCOME_MESSAGE_REMOVED: ``,
        COMMAND_WELCOME_MESSAGE_SET: message => ``,

        // Dev Commands
        COMMAND_CREATEKEY_DESCRIPTION: ``,
        COMMAND_CREATEKEY_NOID: ``,
        COMMAND_CREATEKEY_SUCCESS: (badges, id, out) => ``,
        COMMAND_EVAL_DESCRIPTION: ``,
        COMMAND_EVAL_OUTPUT: ``,
        COMMAND_EVAL_OVER: ``,
        COMMAND_EVAL_TOKEN: ``,
        COMMAND_EVAL_TYPE: ``,
        COMMAND_EVAL_UNDEFINED: ``,
        COMMAND_RELOAD_COMMAND_ERROR: (name, err) => ``,
        COMMAND_RELOAD_COMMAND_SUCCESS: (name, time) => ``,
        COMMAND_RELOAD_DESCRIPTION: ``,
        COMMAND_RELOAD_MONITOR_ERROR: (name, err) => ``,
        COMMAND_RELOAD_MONITOR_SUCCESS: (name, time) => ``,
        COMMAND_RELOAD_NOARGS: ``,
        COMMAND_RELOAD_NOEXIST: (name) => ``,

        // Fun Commands
        COMMAND_CAT_DESCRIPTION: ``,
        COMMAND_CAT_TITLE: ``,
        COMMAND_CAT_FOOTER: ``,
        COMMAND_DOG_DESCRIPTION: ``,
        COMMAND_DOG_TITLE: ``,
        COMMAND_DOG_FOOTER: ``,
        COMMAND_FOX_DESCRIPTION: ``,
        COMMAND_FOX_TITLE: ``,
        COMMAND_FOX_FOOTER: ``,
        COMMAND_FOXFACT_DESCRIPTION: ``,
        COMMAND_FOXFACT_NOFACT: ``,
        COMMAND_POKEMON_DESCRIPTION: ``,
        COMMAND_POKEMON_FIELD_ATTACK: ``,
        COMMAND_POKEMON_FIELD_BASEXP: ``,
        COMMAND_POKEMON_FIELD_DEFENSE: ``,
        COMMAND_POKEMON_FIELD_HEIGHT: ``,
        COMMAND_POKEMON_FIELD_SPECIALATTK: ``,
        COMMAND_POKEMON_FIELD_SPECIALDEF: ``,
        COMMAND_POKEMON_FIELD_SPEED: ``,
        COMMAND_POKEMON_FIELD_TYPE: ``,
        COMMAND_POKEMON_FIELD_WEIGHT: ``,
        COMMAND_POKEMON_INVALIDPOKEMON: ``,
        COMMAND_POKEMON_NOPOKEMON: ``,
        COMMAND_TOPIC_DESCRIPTION: ``,
        COMMAND_URBAN_DESCRIPTION: ``,
        COMMAND_URBAN_EXAMPLE: ``,
        COMMAND_URBAN_FOOTER: res => ``,
        COMMAND_URBAN_NODATA: ``,
        COMMAND_URBAN_NODEFINITION: ``,
        COMMAND_URBAN_NOEXAMPLE: ``,
        COMMAND_URBAN_NOWORD: ``,

        // Moderation Commands
        COMMAND_STAFFLOG_BAN: ban => ``,
        COMMAND_STAFFLOG_DESCRIPTION: ``,
        COMMAND_STAFFLOG_JAIL: jail => ``,
        COMMAND_STAFFLOG_KICK: kick => ``,
        COMMAND_STAFFLOG_LOCK: lock => ``,
        COMMAND_STAFFLOG_MUTE: mute => ``,
        COMMAND_STAFFLOG_NONE: ``,
        COMMAND_STAFFLOG_NUKE: nuke => ``,
        COMMAND_STAFFLOG_PURGE: (purge, total) => ``,
        COMMAND_STAFFLOG_SLOWMODE: slowmode => ``,
        COMMAND_STAFFLOG_TITLE: user => ``,
        COMMAND_STAFFLOG_UNLOCK: unlock => ``,
        COMMAND_STAFFLOG_WARN: warn => ``,
        COMMAND_VCKICK_DESCRIPTION: ``,
        COMMAND_VCKICK_NOMEMBER: ``,
        COMMAND_VCKICK_NOVOICE: ``,

        // Roleplay Commands
        COMMAND_BLUSH_DESCRIPTION: ``,
        COMMAND_BLUSH_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_BLUSH_MULTIPLE: (sender, reciever) => ``,
        COMMAND_BLUSH_SELF: ``,
        COMMAND_BLUSH_SINGLE: (sender, reciever) => ``,
        COMMAND_BONK_DESCRIPTION: ``,
        COMMAND_BONK_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_BONK_MULTIPLE: (sender, reciever) => ``,
        COMMAND_BONK_SINGLE: (sender, reciever) => ``,
        COMMAND_BOOP_DESCRIPTION: ``,
        COMMAND_BOOP_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_BOOP_MULTIPLE: (sender, reciever) => ``,
        COMMAND_BOOP_SINGLE: (sender, reciever) => ``,
        COMMAND_CRY_DESCRIPTION: ``,
        COMMAND_CRY_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_CRY_MULTIPLE: (sender, reciever) => ``,
        COMMAND_CRY_SELF: ``,
        COMMAND_CRY_SINGLE: (sender, reciever) => ``,
        COMMAND_CUDDLE_DESCRIPTION: ``,
        COMMAND_CUDDLE_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_CUDDLE_MULTIPLE: (sender, reciever) => ``,
        COMMAND_CUDDLE_SINGLE: (sender, reciever) => ``,
        COMMAND_DAB_DESCRIPTION: ``,
        COMMAND_DAB_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_DAB_MULTIPLE: (sender, reciever) => ``,
        COMMAND_DAB_SELF: ``,
        COMMAND_DAB_SINGLE: (sender, reciever) => ``,
        COMMAND_FACEPALM_DESCRIPTION: ``,
        COMMAND_FACEPALM_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_FACEPALM_MULTIPLE: (sender, reciever) => ``,
        COMMAND_FACEPALM_SELF: ``,
        COMMAND_FACEPALM_SINGLE: (sender, reciever) => ``,
        COMMAND_HUG_DESCRIPTION: ``,
        COMMAND_HUG_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_HUG_MULTIPLE: (sender, reciever) => ``,
        COMMAND_HUG_SINGLE: (sender, reciever) => ``,
        COMMAND_KILL_DESCRIPTION: ``,
        COMMAND_KILL_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_KILL_MULTIPLE: (sender, reciever) => ``,
        COMMAND_KILL_SINGLE: (sender, reciever) => ``,
        COMMAND_KISS_DESCRIPTION: ``,
        COMMAND_KISS_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_KISS_MULTIPLE: (sender, reciever) => ``,
        COMMAND_KISS_SINGLE: (sender, reciever) => ``,
        COMMAND_LURK_DESCRIPTION: ``,
        COMMAND_LURK_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_LURK_MULTIPLE: (sender, reciever) => ``,
        COMMAND_LURK_SELF: ``,
        COMMAND_LURK_SINGLE: (sender, reciever) => ``,
        COMMAND_NOM_DESCRIPTION: ``,
        COMMAND_NOM_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_NOM_MULTIPLE: (sender, reciever) => ``,
        COMMAND_NOM_SINGLE: (sender, reciever) => ``,
        COMMAND_PANIC_DESCRIPTION: ``,
        COMMAND_PANIC_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_PANIC_MULTIPLE: (sender, reciever) => ``,
        COMMAND_PANIC_SELF: ``,
        COMMAND_PANIC_SINGLE: (sender, reciever) => ``,
        COMMAND_PAT_DESCRIPTION: ``,
        COMMAND_PAT_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_PAT_MULTIPLE: (sender, reciever) => ``,
        COMMAND_PAT_SINGLE: (sender, reciever) => ``,
        COMMAND_PECK_DESCRIPTION: ``,
        COMMAND_PECK_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_PECK_MULTIPLE: (sender, reciever) => ``,
        COMMAND_PECK_SINGLE: (sender, reciever) => ``,
        COMMAND_ROLEPLAY_NO_MEMBER: act => ``,
        COMMAND_SHOOT_DESCRIPTION: ``,
        COMMAND_SHOOT_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_SHOOT_MULTIPLE: (sender, reciever) => ``,
        COMMAND_SHOOT_SINGLE: (sender, reciever) => ``,
        COMMAND_SHRUG_DESCRIPTION: ``,
        COMMAND_SHRUG_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_SHRUG_MULTIPLE: (sender, reciever) => ``,
        COMMAND_SHRUG_SELF: ``,
        COMMAND_SHRUG_SINGLE: (sender, reciever) => ``,
        COMMAND_SIP_DESCRIPTION: ``,
        COMMAND_SIP_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_SIP_MULTIPLE: (sender, reciever) => ``,
        COMMAND_SIP_SELF: ``,
        COMMAND_SIP_SINGLE: (sender, reciever) => ``,
        COMMAND_SLAP_DESCRIPTION: ``,
        COMMAND_SLAP_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_SLAP_MULTIPLE: (sender, reciever) => ``,
        COMMAND_SLAP_SINGLE: (sender, reciever) => ``,
        COMMAND_STAB_DESCRIPTION: ``,
        COMMAND_STAB_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_STAB_MULTIPLE: (sender, reciever) => ``,
        COMMAND_STAB_SINGLE: (sender, reciever) => ``,
        COMMAND_STARE_DESCRIPTION: ``,
        COMMAND_STARE_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_STARE_MULTIPLE: (sender, reciever) => ``,
        COMMAND_STARE_SELF: ``,
        COMMAND_STARE_SINGLE: (sender, reciever) => ``,
        COMMAND_TEASE_DESCRIPTION: ``,
        COMMAND_TEASE_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_TEASE_MULTIPLE: (sender, reciever) => ``,
        COMMAND_TEASE_SELF: ``,
        COMMAND_TEASE_SINGLE: (sender, reciever) => ``,
        COMMAND_WAVE_DESCRIPTION: ``,
        COMMAND_WAVE_FOOTER: (sender, reciever, authNum, recNum) => ``,
        COMMAND_WAVE_MULTIPLE: (sender, reciever) => ``,
        COMMAND_WAVE_SELF: ``,
        COMMAND_WAVE_SINGLE: (sender, reciever) => ``,

        // Secret Commands

        // Settings Commands
        COMMAND_ANTI_CLEAR: ``,
        COMMAND_ANTI_CURRENT: (setting, enabled) => ``,
        COMMAND_ANTI_DESCRIPTION: ``,
        COMMAND_ANTI_DISABLED: setting => ``,
        COMMAND_ANTI_ENABLED: setting => ``,
        COMMAND_ANTI_INVALIDUSE: ``,
        COMMAND_PERMISSION_DESCRIPTION: ``,
        COMMAND_PERMISSION_INVALIDUSE: ``,
        COMMAND_PERMISSION_NOMEMBER: ``,
        COMMAND_PREFIX_DESCRIPTION: ``,
        COMMAND_PREFIX_NONE: ``,
        COMMAND_PREFIX_NOW: (prefixs, list) => ``,
        COMMAND_PREFIX_REMOVED: ``,
        COMMAND_PREFIX_ADDED: prefix => ``,
        COMMAND_SETTINGS_AUTOMOD: ``,
        COMMAND_SETTINGS_AUTOMOD_GIFTS: ``,
        COMMAND_SETTINGS_AUTOMOD_IMAGES: ``,
        COMMAND_SETTINGS_AUTOMOD_INVITES: ``,
        COMMAND_SETTINGS_AUTOMODS: (length) => ``,
        COMMAND_SETTINGS_BLOCKED_USERS: (length, map) => ``,
        COMMAND_SETTINGS_DESCRIPTION: ``,
        COMMAND_SETTINGS_DISABLED: ``,
        COMMAND_SETTINGS_DISBOARD: ``,
        COMMAND_SETTINGS_DISBOARDS: (emoji, state, lang, language) => ``,
        COMMAND_SETTINGS_ENABLED: ``,
        COMMAND_SETTINGS_GOODBYE: ``,
        COMMAND_SETTINGS_GOODBYES: (emoji, state, lang, language) => ``,
        COMMAND_SETTINGS_LOGGER: ``,
        COMMAND_SETTINGS_LOGGER_COMMAND: channel => ``,
        COMMAND_SETTINGS_LOGGER_DELETE: channel => ``,
        COMMAND_SETTINGS_LOGGER_EDIT: channel => ``,
        COMMAND_SETTINGS_LOGGER_INVITE: channel => ``,
        COMMAND_SETTINGS_LOGGER_MODERATION: channel => ``,
        COMMAND_SETTINGS_LOGGERS: (emoji, state, lang, language) => ``,
        COMMAND_SETTINGS_NONE: ``,
        COMMAND_SETTINGS_NOTENABLED: ``,
        COMMAND_SETTINGS_PREFIX: (emoji, size, map) => ``,
        COMMAND_SETTINGS_SIDE_CHANNEL: (emoji, sideVal) => ``,
        COMMAND_SETTINGS_SIDE_MESSAGE: (emoji, sideVal) => ``,
        COMMAND_SETTINGS_SIDE_PING: (role) => ``,
        COMMAND_SETTINGS_STARBOARD: ``,
        COMMAND_SETTINGS_STARBOARDS: (emoji, state, lang, language) => ``,
        COMMAND_SETTINGS_STARBOARD_MINIMUM: minimum => ``,
        COMMAND_SETTINGS_STARBOARD_NOSTAR: (size, map) => ``,
        COMMAND_SETTINGS_STARBOARD_NOTIFICATIONS: ``,
        COMMAND_SETTINGS_STARBOARD_SELF: ``,
        COMMAND_SETTINGS_TITLE: (guild, setting, language, lang) => ``,
        COMMAND_SETTINGS_USER: ``,
        COMMAND_SETTINGS_WELCOME: ``,
        COMMAND_SETTINGS_WELCOMES: (emoji, state, lang, language) => ``,
        COMMAND_TAG_ADDED: (tag, text) => ``,
        COMMAND_TAG_DESCRIPTION: ``,
        COMMAND_TAG_EXISTS: tag => ``,
        COMMAND_TAGS_LIST: (guild, size) => ``,
        COMMAND_TAG_NOEXIST: tag => ``,
        COMMAND_TAGS_NONE: ``,
        COMMAND_TAG_NOTAG: ``,
        COMMAND_TAG_NOTEXT: ``,
        COMMAND_TAG_REMOVED: tag => ``,

        // Utility Commands
        COMMAND_AFK_DESCRIPTION: ``,
        COMMAND_AFK_EMBED_AUTHOR: user => ``,
        COMMAND_AFK_EMBED_DESCRIPTION: reason => ``,
        COMMAND_BADGES_BOOSTS: boosts => ``,
        COMMAND_BADGES_BALANCE: ``,
        COMMAND_BADGES_BOT: bots => ``,
        COMMAND_BADGES_BOTDEV: devs => ``,
        COMMAND_BADGES_BOTVERIFIED: verified => ``,
        COMMAND_BADGES_BRAVERY: ``,
        COMMAND_BADGES_BRILLIANCE: ``,
        COMMAND_BADGES_BUG1: ``,
        COMMAND_BADGES_BUG2: ``,
        COMMAND_BADGES_DESCRIPTION: ``,
        COMMAND_BADGES_DISCORD_EMPLOYEE: flag => ``,
        COMMAND_BADGES_EARLY: supporters => ``,
        COMMAND_BADGES_GUILDSIZE: size => ``,
        COMMAND_BADGES_HYPE_EVENT: ``,
        COMMAND_BADGES_NITRO: ``,
        COMMAND_BADGES_PARTNERED: flag => ``,
        COMMAND_CORONA_CASES_TITLE: ``,
        COMMAND_CORONA_CASES_VALUE: stats => ``,
        COMMAND_CORONA_DEATHS_TITLE: ``,
        COMMAND_CORONA_DEATHS_VALUE: stats => ``,
        COMMAND_CORONA_DESCRIPTION: ``,
        COMMAND_CORONA_EMBED_TITLE: search => ``,
        COMMAND_CORONA_EMBED_FOOTER: ``,
        COMMAND_CORONA_NO_DATA: search => ``,
        COMMAND_CORONA_RECOVERIES_TITLE: ``,
        COMMAND_CORONA_RECOVERIES_VALUE: stats => ``,
        COMMAND_CORONA_TESTS_TITLE: ``,
        COMMAND_CORONA_TESTS_VALUE: stats => ``,
        COMMAND_DEFINE_CANCELLED: ``,
        COMMAND_DEFINE_DESCRIPTION: ``,
        COMMAND_DEFINE_NOARGS: ``,
        COMMAND_DEFINE_NORESULTS: word => ``,
        COMMAND_HELP_COMMAND_NOTVALID: ``,
        COMMAND_HELP_DESCRIPTION: ``,
        COMMAND_HELP_EMBED_AUTOMATION: size => ``,
        COMMAND_HELP_EMBED_DESCRIPTION: language => ``,
        COMMAND_HELP_EMBED_FUN: size => ``,
        COMMAND_HELP_EMBED_MODERATION: size => ``,
        COMMAND_HELP_EMBED_ROLEPLAY: size => ``,
        COMMAND_HELP_EMBED_SETTINGS: size => ``,
        COMMAND_HELP_EMBED_TITLE: ``,
        COMMAND_HELP_EMBED_UTILITY: size => ``,
        COMMAND_HELP_LINKS_DESCRIPTION: ``,
        COMMAND_HELP_LINKS_TITLE: ``,
        COMMAND_HELP_PERMISSIONS: perm => ``,
        COMMAND_HELP_USAGE: ``,
        COMMAND_INFO_DESCRIPTION: ``,
        COMMAND_INFO_USER_BIRTHDAY: bday => ``,
        COMMAND_INFO_USER_DISCORDJOIN: (join, timeSince) => ``,
        COMMAND_INFO_USER_GUILDCREATE: props => ``,
        COMMAND_INFO_USER_GUILDJOIN: props => ``,
        COMMAND_USER_MESSAGES_SENT: msgs => ``,
        COMMAND_INFO_USER_NOROLES: ``,
        COMMAND_INFO_USER_NOTES: notes => ``,
        COMMAND_INFO_USER_ROLES: roles => ``,
        COMMAND_INFO_USER_STARS_EARNED: stars => ``,
        COMMAND_INFO_USER_STATISTICS: ``,
        COMMAND_INFO_USER_WARNINGS: warns => ``,
        COMMAND_PING: ``,
        COMMAND_PING_DESCRIPTION: ``,
        COMMAND_PING_DISCORD: ``,
        COMMAND_PING_FOOTER: ``,
        COMMAND_PING_NETWORK: ``,
        COMMAND_PING_PONG: ``,
        COMMAND_REDEEMKEY_DESCRIPTION: ``,
        COMMAND_REDEEMKEY_NOEXIST: ``,
        COMMAND_REDEEMKEY_NOKEY: ``,
        COMMAND_REDEEMKEY_SUCCESS: (icon, title) => ``,
        COMMAND_WEATHER_DATE: ``,
        COMMAND_WEATHER_DAY: ``,
        COMMAND_WEATHER_DEGREES_F: input => ``,
        COMMAND_WEATHER_DESCRIPTION: ``,
        COMMAND_WEATHER_ERROR: ``,
        COMMAND_WEATHER_FEELS: ``,
        COMMAND_WEATHER_HUMID: ``,
        COMMAND_WEATHER_TEMPERATURE: ``,
        COMMAND_WEATHER_TITLE: (local, sky) => ``,
        COMMAND_WEATHER_TIMEZONE: ``,
        COMMAND_WEATHER_WINDS: ``,

        // Events
        EVENT_STARBOARD_JUMP: ``,
        EVENT_STARBOARD_NOTIF_DESCRIPTION: (user, channel, link) => ``,
        EVENT_STARBOARD_NOTIF_TITLE: ``,

        // Inhibitors

        // Logs
        LOG_MODERATION_BANNED: tar => ``,
        LOG_MODERATION_CLEAREDWARNS: tar => ``,
        LOG_MODERATION_EMBED_DATE: ``,
        LOG_MODERATION_EMBED_LOCATION: ``,
        LOG_MODERATION_EMBED_MODERATOR: ``,
        LOG_MODERATION_EMBED_REASON: ``,
        LOG_MODERATION_EMBED_TITLE: act => ``,
        LOG_MODERATION_KICKED: tar => ``,
        LOG_MODERATION_LOCKED: ``,
        LOG_MODERATION_NOREASON: ``,
        LOG_MODERATION_NUKED: ``,
        LOG_MODERATION_PURGED: ``,
        LOG_MODERATION_SLOWMODED: ``,
        LOG_MODERATION_UNBANNED: tar => ``,
        LOG_MODERATION_UNLOCKED: ``,
        LOG_MODERATION_VCKICKED: tar => ``,
        LOG_MODERATION_WARNED: tar => ``,

        // Monitors
        // Resolvers

        // Tasks
        TASK_AFK_EMBED_AUTHOR: user => ``,
        TASK_AFK_EMBED_DESCRIPTION: reason => ``,
        TASK_AFK_WELCOMEBACK: ``,
        TASK_REMINDER: (time, reason) => ``,
        TASK_REMINDER_FOR: user => ``,

        // 8 Ball
}