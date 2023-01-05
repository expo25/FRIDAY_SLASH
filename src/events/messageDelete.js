const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageDelete',
    on: true,
    async execute(Message, client) {

        const auditLogs = await Message.guild.channels.cache.find(channel => channel.name.includes("logs"));
        const messageHadAttachment = Message.attachments.first();

        const fetchedLogs = await Message.guild.fetchAuditLogs({ type: 72, limit: 1 }).then(audit => {
            const deletionLog = audit.entries.first();
            if (!auditLogs) return;
            if (!deletionLog) {
                const embed1 = new MessageEmbed()
                    .setAuthor({ name: `${Message.author.tag}`, iconURL: `${Message.author.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setTitle('🗑️ A Message Was Just Deleted! 🗑️')
                    .setColor('#ff634a')
                    .setDescription(`A message from ${Message.author} was deleted, but no relevant audit logs were found.`)
                    .addFields(
                        { name: 'Channel Message Was Deleted In:', value: `${Message.channel}` },
                        { name: 'Deleted Message Content:', value: `${Message.content}` || '\`Null\`' }
                    )
                    .setFooter({ text: `In ${Message.guild.name}`, iconURL: Message.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()

                if (messageHadAttachment) embed1.setImage(messageHadAttachment.proxyURL)

                return auditLogs.send({ embeds: [embed1] })
            };

            const { executor, target } = deletionLog;

            if (target.id === Message.author.id) {

                const embed2 = new MessageEmbed()
                    .setAuthor({ name: `${Message.author.tag}`, iconURL: `${Message.author.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setTitle('🗑️ Someone Just Deleted a Message! 🗑️')
                    .setColor('#ff634a')
                    .setDescription(`A message from ${Message.author} was deleted by ${executor}.`)
                    .addFields(
                        { name: 'Channel Message Was Deleted In:', value: `${Message.channel}` },
                        { name: 'Deleted Message Content:', value: `${Message.content}` || '\`Null\`' }
                    )
                    .setFooter({ text: `In ${Message.guild.name}`, iconURL: Message.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()


                if (messageHadAttachment) embed2.setImage(messageHadAttachment.proxyURL)
                return auditLogs.send({ embeds: [embed2] });

            } else {

                const embed3 = new MessageEmbed()
                    .setAuthor({ name: `${Message.author.tag}`, iconURL: `${Message.author.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setTitle('🗑️ A Message Was Just Deleted! 🗑️')
                    .setColor('#ff634a')
                    .setDescription(`A message from ${Message.author} was deleted, but we don't know by who.`)
                    .addFields(
                        { name: 'Channel Message Was Deleted In:', value: `${Message.channel}` },
                        { name: 'Deleted Message Content:', value: `${Message.content}` || '\`Null\`' }
                    )
                    .setFooter({ text: `In ${Message.guild.name}`, iconURL: Message.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()

                if (messageHadAttachment) embed3.setImage(messageHadAttachment.proxyURL)

                return auditLogs.send({ embeds: [embed3] });
            };

        });
    },
};