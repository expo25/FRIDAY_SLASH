const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'roleCreate',
    on: true,
    async execute(role, client) {

        const auditLogs = await role.guild.channels.cache.find(channel => channel.name.includes("logs"));

        await role.guild.fetchAuditLogs({ type: 30, limit: 1 }).then(audit => {
            const user = audit.entries.first().executor;

            if (!auditLogs) return; {
                const embed = new MessageEmbed()
                    .setColor('#1c7db7')
                    .setTitle('🐸 A New Server Role Has Been Created 🐸')
                    .setDescription(`New Role Name:\n\`${role.name}\``)
                    .addFields({ name: 'Role Created By:', value: `${user}` })
                    .setFooter({ text: `In ${role.guild.name}`, iconURL: role.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()

                return auditLogs.send({
                    embeds: [embed]
                });
            }
        })

    }
}
