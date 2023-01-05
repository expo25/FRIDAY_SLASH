const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'roleDelete',
    on: true,
    async execute(role, client) {

        const auditLogs = await role.guild.channels.cache.find(channel => channel.name.includes("logs"));

        await role.guild.fetchAuditLogs({ type: 32, limit: 1 }).then(audit => {
            const user = audit.entries.first().executor;

            if (!auditLogs) return; {
                const embed = new MessageEmbed()
                    .setColor('#1c7db7')
                    .setTitle('❌ A Server Role Has Been Deleted ❌')
                    .setDescription(`\`${role.name}\` has been deleted from the guild.`)
                    .addFields({ name: 'Role Deleted By:', value: `${user}` })
                    .setFooter({ text: `In ${role.guild.name}`, iconURL: role.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()

                return auditLogs.send({
                    embeds: [embed]
                });
            }
        })

    }
}
