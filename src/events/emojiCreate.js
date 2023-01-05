const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'emojiCreate',
    on: true,
    async execute(emoji, client) {

        const auditLogs = await emoji.guild.channels.cache.find(channel => channel.name.includes("logs"));

        await emoji.guild.fetchAuditLogs({ type: 60, limit: 1 }).then(audit => {
            const user = audit.entries.first().executor;
            if (!auditLogs) return; {
                const embed = new MessageEmbed()
                .setColor('#1c7db7')
                .setTitle('😊 Someone has Uploaded a New Emoji Into The Server! 😊')
                .setDescription(`**New Emoji:**\n**\`${emoji.name}\`**`)
                .addFields({ name: 'New Emoji ID:', value: `**\`${emoji.id}\`**` },
                { name: 'Uploaded By:', value: `${user}` })
                .setFooter({ text: `In ${emoji.guild.name}`, iconURL: emoji.guild.iconURL({ dynamic: true }) })
                .setTimestamp()

                return auditLogs.send({
                    embeds: [embed]
                });
            }
        })
    }
}