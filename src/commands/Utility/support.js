const Discord = require('discord.js')
module.exports = {
    name: 'support',
    usage: 'fox support',
    execute(lang, message, args, client) {
        const inviteEmbed = new Discord.MessageEmbed()
            .setAuthor(lang.COMMAND_SUPPORT_HERE, client.user.displayAvatarURL())
            .setColor(message.guild.me.displayColor)
            .setDescription(lang.COMMAND_SUPPORT_BODY)

            if (message.content.includes(`-c`)) {
                return message.channel.send(inviteEmbed)
            }
        message.author.send(inviteEmbed).catch(error => {message.channel.send(inviteEmbed);
        });
    
        message.react('✅')
    }
}