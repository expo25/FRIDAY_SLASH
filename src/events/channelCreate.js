const { MessageEmbed, Channel } = require('discord.js');

module.exports = {
    name: 'channelCreate',
    on: true,
    async execute(channel, client) {

        const auditLogs = await channel.guild.channels.cache.find(channel => channel.name.includes("logs"));

        await channel.guild.fetchAuditLogs({ type: 10, limit: 1 }).then(audit => {
            const user = audit.entries.first().executor;
            if (!auditLogs || user.id === '491769129318088714') return; {
                const embed = new MessageEmbed()
                    .setColor('#083462')
                    .setTitle('✍️ A Channel Has Been Created ✍️')
                    .setDescription(`**Channel Name: ${channel}**`)
                    .addFields({ name: 'Channel Created By:', value: `${user}` })
                    .setFooter({ text: `In ${channel.guild.name}`, iconURL: channel.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()

                return auditLogs.send({
                    embeds: [embed]
                });
            }
        })
    }
}
