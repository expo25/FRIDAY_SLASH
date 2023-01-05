const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'emojiUpdate',
    on: true,
    async execute(oldEmoji, newEmoji, client) {

        const auditLogs = await newEmoji.guild.channels.cache.find(channel => channel.name.includes("logs"));

        await newEmoji.guild.fetchAuditLogs({ type: 61, limit: 1 }).then(audit => {
            const user = audit.entries.first().executor;
            if (!auditLogs) return; {
                const embed = new MessageEmbed()
                .setColor('#1c7db7')
                .setTitle('😔 Someone Has Changed An Emoji In the Server! 😔')
                .setDescription(`**Previous Emoji Name:**\n\`${oldEmoji.name}\``)
                .addFields({ name: 'New Emoji Name:', value: `**\`${newEmoji.name}\`**` },
                    { name: 'Emoji ID:', value: `**\`${newEmoji.id}\`**` },
                    { name: 'Emoji Edited By:', value: `${user}` })
                .setFooter({ text: `In ${newEmoji.guild.name}`, iconURL: newEmoji.guild.iconURL({ dynamic: true }) })
                .setTimestamp()

                return auditLogs.send({
                    embeds: [embed]
                });
            }
        })
    }
}