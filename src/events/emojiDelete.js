const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'emojiDelete',
    on: true,
    async execute(emoji, client) {

        const auditLogs = await emoji.guild.channels.cache.find(channel => channel.name.includes("logs"));

        await emoji.guild.fetchAuditLogs({ type: 62, limit: 1 }).then(audit => {
            const user = audit.entries.first().executor;
            if (!auditLogs) return; {
                const embed = new MessageEmbed()
                .setColor('#1c7db7')
                .setTitle('😔 Someone Has Deleted An Emoji From the Server! 😔')
                .setDescription(`**Emoji Name:**\n**\`${emoji.name}\`**`)
                .addFields({ name: 'Emoji ID:', value: `**\`${emoji.id}\`**` },
                    { name: 'Deleted By:', value: `${user}` })
                .setFooter({ text: `In ${emoji.guild.name}`, iconURL: emoji.guild.iconURL({ dynamic: true }) })
                .setTimestamp()

                return auditLogs.send({
                    embeds: [embed]
                });
            }
        })
    }
}