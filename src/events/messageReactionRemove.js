const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageReactionRemove',
    on: true,
    async execute(messageReaction, user, client) {

        const auditLogs = await messageReaction.message.guild.channels.cache.find(channel => channel.name.includes("logs"));
        if (!auditLogs) return; {
            const embed = new MessageEmbed()
            .setAuthor({ name: `${user.tag}`, iconURL: `${user.avatarURL({ dynamic: true, size: 512 })}` })
            .setColor('#c71818')
            .setTitle('❌ Someone Just Removed a Reaction to a Message! ❌')
            .setDescription(`${user} has just removed their \`${messageReaction.emoji.name}\` reaction from ${messageReaction.message.author}'s message: \`${messageReaction.message}\``)
            .addFields({ name: `This event happened in:`, value: `${messageReaction.message.channel}\n**There are now *|${messageReaction.count}|* member(s) who have reacted to this message.**` })
            .setFooter({ text: `In ${messageReaction.message.guild.name}`, iconURL: messageReaction.message.guild.iconURL({ dynamic: true }) })
            .setTimestamp()

            return auditLogs.send({
                embeds: [embed]
            });
        }
    }
}