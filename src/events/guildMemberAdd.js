const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    on: true,
    async execute(member, client) {

        const auditLogs = await member.guild.channels.cache.find(channel => channel.name.includes("server-log"));

        if (!auditLogs) return; {
            const embed = new MessageEmbed()
            .setAuthor({ name: `${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setColor('#19e79e')
            .setTitle('❗ We have a new server member ❗')
            .setDescription(`${member} has just joined the server.`)
            .setThumbnail(`${member.user.avatarURL({ dynamic: true, size: 512 })}`)
            .addFields(
                { name: 'That now puts us at:', value: `|**${member.guild.memberCount}**| total server members.`, inline: true },
                //{name: `Total Users: ${humans}`, value: `Total Bots: ${bot}`, inline: true}
            )
            .setFooter({ text: `In ${member.guild.name}`, iconURL: member.guild.iconURL({ dynamic: true }) })
            .setTimestamp()

            return auditLogs.send({
                embeds: [embed]
            });
        }
    }
}
