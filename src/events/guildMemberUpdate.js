const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberUpdate',
    on: true,
    async execute(oldMember, newMember, client) {

        const auditLogs = await newMember.guild.channels.cache.find(channel => channel.name.includes("logs"));
        if (!auditLogs) return;
        
        if (oldMember.nickname !== newMember.nickname) {

            await newMember.guild.fetchAuditLogs({ type: 24, limit: 1 }).then(audit => {
                const user = audit.entries.first().executor;

                const nicknameembed = new MessageEmbed()

                    .setAuthor(({ name: `${newMember.user.tag}`, iconURL: `${newMember.user.displayAvatarURL({ dynamic: true, size: 512 })}` }))
                    .setColor('#a061d8')
                    .setTitle('📛 A Server Member Nickname Has Been Changed 📛')
                    .setDescription(`**Member Tag:** ${newMember}`)
                    .addFields({ name: `Previous NICKNAME: ${oldMember.displayName}`, value: `**New NICKNAME: ${newMember.displayName}**`, inline: true },
                        { name: 'NICKNAME Changed By:', value: `${user}` })
                    .setFooter({ text: `In ${newMember.guild.name}`, iconURL: newMember.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()
                return auditLogs.send({
                    embeds: [nicknameembed]
                })
            });

        } else if (oldMember.roles.cache.size > newMember.roles.cache.size) {

            await newMember.guild.fetchAuditLogs({ type: 25, limit: 1 }).then(audit => {
                const user = audit.entries.first().executor;

                const RemoveEmbed = new MessageEmbed()

                    .setAuthor(({ name: `${newMember.user.tag}`, iconURL: `${newMember.user.displayAvatarURL({ dynamic: true, size: 512 })}` }))
                    .setColor('#a061d8')
                    .setTitle('❌ A Server Member Has Removed A Role ❌')
                    .setDescription(`**Member Tag:** ${newMember}\n**Role Removed By:**${user}`)
                    .setFooter({ text: `In ${newMember.guild.name}`, iconURL: newMember.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()

                // Looping through the role and checking which role was removed.
                oldMember.roles.cache.forEach(role => {

                    if (!newMember.roles.cache.has(role.id)) {
                        RemoveEmbed.addFields({ name: 'Role Removed:', value: `${role}` });
                    }
                });

                return auditLogs.send({
                    embeds: [RemoveEmbed]
                }) 
            });

        } else if (oldMember.roles.cache.size < newMember.roles.cache.size) {

            await newMember.guild.fetchAuditLogs({ type: 25, limit: 1 }).then(audit => {
                const user = audit.entries.first().executor;
                
                const AddEmbed = new MessageEmbed()

                    .setAuthor(({ name: `${newMember.user.tag}`, iconURL: `${newMember.user.displayAvatarURL({ dynamic: true, size: 512 })}` }))
                    .setColor("#a061d8")
                    .setTitle('<a:GreenTick:984501363436294164> A Member Has Added A Role <a:GreenTick:984501363436294164>')
                    .setDescription(`**Member Tag:** ${newMember}\n**Role Added By:** ${user}`)
                    .setFooter({ text: `In ${newMember.guild.name}`, iconURL: newMember.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()

                // Looping through the role and checking which role was added.
                newMember.roles.cache.forEach(role => {
                    if (!oldMember.roles.cache.has(role.id)) {
                        AddEmbed.addFields({ name: 'Role Added:', value: `${role}` });
                    }
                });

                return auditLogs.send({
                    embeds: [AddEmbed]
                })
            });
        }
    },

};

