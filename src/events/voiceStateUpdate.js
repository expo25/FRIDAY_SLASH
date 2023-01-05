const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'voiceStateUpdate',
    on: true,
    async execute(oldState, newState, client) {

        const auditLogs = await newState.guild.channels.cache.find(channel => channel.name.includes("logs"));

        if (!auditLogs) return; {

            if (newState.channel && !oldState.channel) {

                const VoiceJoin = new MessageEmbed()
                    .setAuthor({ name: `${newState.member.user.tag}`, value: `${newState.member.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setColor('#008080')
                    .setTitle('🎙️ Someone Just Entered a Voice Channel! 🎙️')
                    .setDescription(`${newState.member.user} has just entered ${newState.channel.name}.`)
                    .setThumbnail(`${newState.member.user.avatarURL({ dynamic: true, size: 512 })}`)
                    .setFooter({ text: `In ${newState.guild.name}`, iconURL: newState.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()

                return auditLogs.send({ embeds: [VoiceJoin] });

            } else if (!newState.channel && oldState.channel) {
                const VoiceLeave = new MessageEmbed()
                    .setAuthor({ name: `${newState.member.user.tag}`, value: `${newState.member.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setColor('#cc0000')
                    .setTitle('👋 Someone Just Left a Voice Channel! 👋')
                    .setDescription(`${oldState.member.user} has just left ${oldState.channel.name}.`)
                    .setThumbnail(`${oldState.member.user.avatarURL({ dynamic: true, size: 512 })}`)
                    .setFooter({ text: `In ${oldState.guild.name}`, iconURL: oldState.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()

                return auditLogs.send({ embeds: [VoiceLeave] });

            } else if (newState.channel && oldState.channel) {
                const VoiceLeaveAndJoin = new MessageEmbed()
                    .setAuthor({ name: `${newState.member.user.tag}`, value: `${newState.member.user.dsiplayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setColor('#008080')
                    .setTitle('🎤 Someone Just Left & Joined Another Voice Channel! 🎤')
                    .setDescription(`${newState.member.user} just left ${oldState.channel.name}.`)
                    .addFields({ name: 'They are now in:', value: `${newState.channel.name}` })
                    .setThumbnail(`${newState.member.user.avatarURL({ dynamic: true, size: 512 })}`)
                    .setFooter({ text: `In ${newState.guild.name}`, iconURL: newState.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()
                if (newState.channel.id !== oldState.channel.id)

                    return auditLogs.send({ embeds: [VoiceLeaveAndJoin] });
            }

        }
    }
}