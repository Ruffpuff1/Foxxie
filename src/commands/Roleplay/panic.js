const { roleplayCommand } = require('../../../lib/structures/roleplayCommands')
module.exports = {
    name: 'panic',
    aliases: ['panicattack'],
    usage: `fox panic [user] (reason)`,
    category: 'roleplay',
    execute(lang, message, args) {
        
        let mentionMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(u => u.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase())
    
        let text = args.slice(1).join(' ');

        let command = 'panic';
        let actionText = 'panicked at';

        roleplayCommand(message, command, mentionMember, text, actionText)
    }
}