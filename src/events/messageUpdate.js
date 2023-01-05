const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageUpdate',
    on: true,
    async execute(oldMessage, newMessage, Interaction, client) {

        const auditLogs = await oldMessage.guild.channels.cache.find(channel => channel.name.includes("logs"));
        const messageHadAttachment = newMessage.attachments.first();
        if (oldMessage === newMessage) return;
        if (oldMessage.author.bot || newMessage.author.bot ) return;
        //if (oldMessage.author.id && newMessage.author.id === '963589943593164880') return;
        //if (oldMessage.author.id && newMessage.author.id === '824653933347209227') return;
        //if (oldMessage.author.id && newMessage.author.id === '274613585609490442') return;

        await oldMessage.guild.fetchAuditLogs({ type: 72, limit: 1 }).then(audit => {
            const user = audit.entries.first().executor;
            if (!auditLogs) return; {
                const embed = new MessageEmbed()
                    .setAuthor({ name: `${oldMessage.author.tag}`, iconURL: `${oldMessage.author.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setColor('#ff634a')
                    .setTitle('📝 Someone Just Edited a Message! 📝')
                    .setDescription(`A message by ${newMessage.author} was edited.`)// by ${user}.`)
                    .addFields(
                        { name: 'Channel Message Was Edited In:', value: `${oldMessage.channel}` },
                        { name: 'Old Message Content:', value: `${oldMessage}` || '\`Null\`' },
                        { name: 'New Message Content:', value: `${newMessage}` || '\`Null\`' }
                    )
                    .setFooter({ text: `In ${oldMessage.guild.name}`, iconURL: oldMessage.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()


                if (messageHadAttachment) embed.setImage(messageHadAttachment.proxyURL)

                return auditLogs.send({
                    embeds: [embed]
                });
            }
        })
    }
}