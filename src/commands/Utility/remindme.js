const fs = require('fs')
const ms = require('ms')

module.exports = {
    name: 'remindme',
    aliases: ['rm'],
    usage: `remindme [1s|1m|1h|1d|1w] [reason] (-c|-channel)`,
    category: 'utility',
    execute(props) {

        let { lang, message, args, language } = props;
        message.client.reminders = require('../../store/reminders.json')
        let remindTime = args[0]
        let remindMsg = args.slice(1).join(' ');

        if (!remindTime) return language.send('COMMAND_REMINDME_NOTIME', lang);
        if (!/^\d*[s|m|h|d|w|y]$/gmi.test(remindTime)) return language.send('COMMAND_REMINDME_INVALIDTIME', lang);
        
        let timeFromNow = ms(ms(remindTime), { long: true } )
        if (!remindMsg) return language.send('COMMAND_REMINDME_NOREASON', lang);

        let sendIn = /\-channel\s*|-c\s*/gi
        remindMsg = remindMsg.replace(sendIn, '')

        message.client.reminders [message.id] = {
            guild: message.guild.id,
            authID: message.author.id,
            time: Date.now() + ms(remindTime),
            rmdMessage: remindMsg,
            timeago: timeFromNow,
            guildId: message.guild.id,
            lang: lang,
            sendIn: sendIn.test(message.content),
            color: message.guild.me.displayColor,
            channelId: message.channel.id,
            language: language
        }
        fs.writeFile('./src/store/reminders.json', JSON.stringify(message.client.reminders, null, 4), err => {
            if (err) throw err
            language.send('COMMAND_REMINDME_SUCCESS', lang, timeFromNow);
        })
    }
}