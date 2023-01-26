const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');
const warningSchema = require('../../schemas.js/warnSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warnings')
        .setDescription('Find how many times a user has been warned in the server.')
        .addUserOption(option => option.setName('user').setDescription('The user you would like to check the warnings of.').setRequired(true)),

    async execute(Interaction, client) {

        const member = Interaction.options.getUser('user');
        const memberUser = await Interaction.guild.members.cache.get(member.id);
        const userTag = member.username;

        const embed = new MessageEmbed()
        const noWarns = new MessageEmbed()

        warningSchema.findOne({ GuildID: Interaction.guild.id, UserID: member.id, UserTag: member.tag }, async (err, data) => {

            if (err) throw err;

            if (data) {
                embed.setColor('DARK_RED')
                    .setAuthor(({ name: `${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true, size: 512 })}` }))
                    .setDescription(`<a:X_:1009946137068851211> Uh oh! Someone's been misbehaving! ${member}'s total warnings are at:\n${data.Content.map(
                        (w, i) =>
                            `
                            **Warning**: ${i + 1}
                            **Warned By**: ${w.ExecutorTag}
                            **Warning Reason**: ${w.Reason}
                        `
                    ).join(`-`)}`)
                    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                    .setTimestamp()

                Interaction.reply({ embeds: embed })
            } else {
                noWarns.setColor('GOLD')
                    .setAuthor(({ name: `${member.tag}`, iconURL: `${member.displayAvatarURL({ dynamic: true, size: 512 })}` }))
                    .setDescription(`<:blobstop:999418390705881200> Looks like ${member} is staying out of trouble! This user currently has **\`0\`** warnings.`)
                    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                    .setTimestamp()

                Interaction.reply({ embeds: [noWarns] })
            }
        });
    }
}
