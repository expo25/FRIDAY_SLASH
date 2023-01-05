const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'channelUpdate',
    on: true,
    async execute(oldChannel, newChannel, client) {

        const auditLogs = await newChannel.guild.channels.cache.find(channel => channel.name.includes("logs"));

        if (!auditLogs) return;

        if (oldChannel.name === newChannel.name) return;

        await newChannel.guild.fetchAuditLogs({ type: 11, limit: 1 }).then(audit => {
            const user = audit.entries.first().executor;
            if (user.id === '824653933347209227' || user.id === '491769129318088714') return; {
                const embed = new MessageEmbed()
                    .setColor('#083462')
                    .setTitle('📝 A Channel Name Has Been Updated 📝')
                    .setDescription(`**Previous Channel Name: \`${oldChannel.name}\`**\n **New Channel Name: ${newChannel}**`)
                    .addFields({ name: 'Channel Name Updated By:', value: `${user}` })
                    .setFooter({ text: `In ${newChannel.guild.name}`, iconURL: newChannel.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()

                return auditLogs.send({
                    embeds: [embed]
                });
            }
        })
    }
}