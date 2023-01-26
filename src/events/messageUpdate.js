const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageUpdate',
    on: true,
    async execute(oldMessage, newMessage, Interaction, client) {

        // Messages that contain links (Not currently initialized, more of a plcaeholder).

        let regx = /^((?:https?:)?\/\/)?((?:www|m)\.)? ((?:discord\.gg|discordapp\.com))/g
        let cdu = regx.test(oldMessage.content.toLowerCase().replace(/\s+/g, ''))

        const auditLogs = await oldMessage.guild.channels.cache.find(channel => channel.name.includes("logs"));
        const messageHadAttachment = newMessage.attachments.first();

        // If the edited message contains the exact same text as the orginal, don't log anything to the channel. 
        if (oldMessage === newMessage) return;
        // If any bots edit embeds, don't log anything to the channel.
        if (oldMessage.author.bot || newMessage.author.bot) return;
        // If there is no log channel, don't log anything to the channel.
        if (!auditLogs) return;

        if (oldMessage.content.includes('discord.gg/' || 'discordapp.com/invite/' || 'https://') && newMessage.content.includes('discord.gg/' || 'discordapp.com/invite/' || 'https://link')) {
            return;
        } else {

            await oldMessage.guild.fetchAuditLogs({ type: 72, limit: 1 }).then(audit => {
                const user = audit.entries.first().executor;
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
            },
            );
        };
    },
};