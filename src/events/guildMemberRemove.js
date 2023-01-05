const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    on: true,
    async execute(member, client) {

        const auditLogs = await member.guild.channels.cache.find(channel => channel.name.includes("server"));

        if (!auditLogs) return; {
            const embed = new MessageEmbed()
                .setAuthor({ name: `${member.user.tag}`, iconURL: `${member.user.avatarURL({ dynamic: true, size: 512 })}` })
                .setColor('#7e181e')
                .setTitle('❌ We have just lost a server member ❌')
                .setDescription(`${member} has just left the server.`)
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