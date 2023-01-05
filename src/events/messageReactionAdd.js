const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageReactionAdd',
    on: true,
    async execute(messageReaction, user, client) {

        const auditLogs = await messageReaction.message.guild.channels.cache.find(channel => channel.name.includes("logs"));
        if (!auditLogs) return; {
            const embed = new MessageEmbed()
                .setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                .setColor('#fffcfc')
                .setTitle('📎 Someone Just Reacted to a Message! 📎')
                .setDescription(`${user} just reacted to ${messageReaction.message.author}'s message: \`${messageReaction.message}\` with \`${messageReaction.emoji.name}\``)
                .addFields({ name: `This event happened in:`, value: `${messageReaction.message.channel}\n***|${messageReaction.count}|* member(s) have given the same reaction.**` })
                .setFooter({ text: `In ${messageReaction.message.guild.name}`, iconURL: messageReaction.message.guild.iconURL({ dynamic: true }) })
                .setTimestamp()

            return auditLogs.send({
                embeds: [embed]
            });
        }
    }
}
