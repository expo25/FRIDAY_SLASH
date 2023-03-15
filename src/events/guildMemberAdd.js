const { MessageEmbed } = require('discord.js');
const inviteSchema = require('../schemas.js/inviteSchema');

module.exports = {
    name: 'guildMemberAdd',
    on: true,
    async execute(member, client) {

        const Data = await inviteSchema.findOne({ Guild: member.guild.id });
        if (!Data) return;

        const channelID = Data.Channel;

        const channel = await member.guild.channels.cache.get(channelID);

        const newInvites = await member.guild.invites.fetch();

        const oldInvities = invites.get(member.guild.id);

        const invite = newInvites.find(i => i.uses > oldInvities.get(i.code));

        const inviter = await client.users.fetch(invite.inviter.id);

        const inviteEmbed = new MessageEmbed()
            .setColor('DARK_AQUA')
            .setDescription(`${member.user.tag} just joined the server using the invite ${invite.code} and was invited by ${inviter.tag}. That invite code has now been used ${invite.uses} times since it was originally created.`)
            .setFooter({ text: `${member.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true, size: 512 }) })
            .setTimestamp()

        const sorryEmbed = new MessageEmbed()
            .setColor('RED')
            .setDescription(`${member.user.tag} just joined the server but I was unable to find the invite link that they used to join. Sorry guys.`)
            .setFooter({ text: `${member.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true, size: 512 }) })
            .setTimestamp()

        inviter
            ? channel.send({ embeds: [inviteEmbed] })
            : channel.send({
                embeds: [sorryEmbed]
            })

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
