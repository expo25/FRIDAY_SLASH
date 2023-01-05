const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageDeleteBulk',
    on: true,
    async execute(messages, client) {

        const auditLogs = await messages.first().guild.channels.cache.find(channel => channel.name.includes("logs"));
        const length = (messages.size) - 1;
        const channel = [messages.first().guild.id].channel;

        await messages.first().guild.fetchAuditLogs({ type: 73, limit: 1 }).then(audit => {
        const user = audit.entries.first().executor;


        if (!auditLogs) return;

        const embed = new MessageEmbed()
            .setAuthor(({ name: `${messages.first().guild.name}`, iconURL: `${messages.first().guild.iconURL({ dynamic: true })}` }))
            .setColor('#6f7fca')
            .setTitle('✂️ Someone Just Deleted a Bunch of Messages! ✂️')
            //.setTitle(`${length} messages were just cleared in #${channel}`)
            .setDescription(`There was a **BULK DELETE** in <#${messages.first().channel.id}>: **${length + 1}** messages were deleted.`)
            .addFields({ name: 'Messages Deleted By:', value: `${user}` })
            .setFooter({ text: `${length + 1} latest shown`, iconURL: messages.first().guild.iconURL({ dynamic: true }) })
            .setTimestamp()

        return auditLogs.send({
            embeds: [embed]
        });
    })
}
}