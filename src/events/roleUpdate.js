const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'roleUpdate',
    on: true,
    async execute(oldRole, newRole, client) {

        if (oldRole === newRole) return;

        const auditLogs = await newRole.guild.channels.cache.find(channel => channel.name.includes("logs"));

        await newRole.guild.fetchAuditLogs({ type: 31, limit: 1 }).then(audit => {
            const user = audit.entries.first().executor;

            if (!auditLogs) return; {

                if (oldRole.permissions !== newRole.permissions) {

                    const embed1 = new MessageEmbed()
                        .setTitle(`🤔 Role Permissions Have Changed! 🤔`)
                        .setColor('#1c7db7')
                        .setDescription(`Role Updated By: ${user}`)
                        .setFooter({ text: `Role ID: ${newRole.id}`, iconURL: newRole.guild.iconURL({ dynamic: true }) })
                        .setTimestamp()

                    const oldPerms = oldRole.permissions.serialize();
                    const newPerms = newRole.permissions.serialize();

                    const permUpdated = [];

                    for (const [key, element] of Object.entries(oldPerms)) {
                        if (newPerms[key] !== element) permUpdated.push(key);
                    }

                    if (oldRole.permissions > newRole.permissions) {
                        //Permission lost

                        embed1.setDescription(`${newRole.toString()} has lost the **${permUpdated.join(", ")}** permission(s).`)
                        auditLogs.send({ embeds: [embed1] }).catch()

                    } else if (oldRole.permissions < newRole.permissions) {
                        //Permission given

                        embed1.setDescription(`${newRole.toString()} has been given the **${permUpdated.join(", ")}** permission(s).`)
                        auditLogs.send({ embeds: [embed1] }).catch()

                    }
                };

                if (oldRole.name !== newRole.name) {

                    const embed = new MessageEmbed()

                        .setColor('#1c7db7')
                        .setTitle('✒️ A Server Role Has Been Updated ✒️')
                        .setDescription(`The \`${oldRole.name}\` role was changed to \`${newRole.name}\`!`)
                        .addFields({ name: 'Role Updated By:', value: `${user}` })
                        .setFooter({ text: `In ${newRole.guild.name}`, iconURL: newRole.guild.iconURL({ dynamic: true }) })
                        .setTimestamp()

                    return auditLogs.send({
                        embeds: [embed]
                    });
                }
            }
        });
    },
};
