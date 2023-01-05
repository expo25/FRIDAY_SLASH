const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Channel } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete-channel')
        .setDescription(`Deletes a channel.`)
        .addChannelOption(option => option.setName('channel-1').setDescription('The channel you would like to delete.').setRequired(true))
        .addChannelOption(option => option.setName('channel-2').setDescription('The 2nd channel you would like to delete.')),
        //.addChannelOption(option => option.setName('channel-3').setDescription('The 3rd channel you would like to delete.'))

    async execute(Interaction, client, channel) {

        if (!Interaction.member.permissions.has('MANAGE_CHANNELS')) return Interaction.reply({ content: 'You are unauthorized to execute this command. Missing permissions | \`MANAGE_CHANNELS\`' });

        let targetChannel = Interaction.options.getChannel('channel-1')
        let targetChannel2 = Interaction.options.getChannel('channel-2')
        let targetChannel3 = Interaction.options.getChannel('channel-3')

        if (!targetChannel2 && !targetChannel3) {

            const embed = new MessageEmbed()
                .setAuthor({ name: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                .setColor('#ff634a')
                .setTitle('Done!')
                .setDescription(`OK Boss, I have deleted channel \`${targetChannel.name}\` from the guild, per your request.`)
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                .setTimestamp()

            targetChannel.delete().then(ch => {
                Interaction.reply({
                    embeds: [embed]
                })
            });
        } else if (targetChannel2) {

            const embed2 = new MessageEmbed()
                .setAuthor({ name: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                .setColor('#ff634a')
                .setTitle('Done!')
                .addFields({ name: `OK Boss, I have deleted the following channels from the guild:`, value: `\`${targetChannel.name}\`\n\`${targetChannel2.name}\`` })
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                .setTimestamp()

            targetChannel.delete().then(
                targetChannel2.delete().then(ch => {
                    Interaction.reply({
                        embeds: [embed2]
                    })
                }));
        };
    },
};