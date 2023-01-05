const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Channel } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-channel')
        .setDescription(`Creates a channel.`)
        .addStringOption(option => option.setName('channel-name').setDescription('The name of the channel you would like to create.').setRequired(true))
        .addStringOption(option => option.setName('channel-2-name').setDescription('The name of the 2nd channel you would like to create.')),

    async execute(Interaction, client, channel) {

        if (!Interaction.member.permissions.has('MANAGE_CHANNELS')) return Interaction.reply({ content: 'You are unauthorized to execute this command. Missing permissions | \`MANAGE_CHANNELS\`' });

        let targetChannel = Interaction.options.getString('channel-name')
        let targetChannel2 = Interaction.options.getString('channel-2-name')

        if (!targetChannel2) {

            const embed = new MessageEmbed()
                .setAuthor({ name: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                .setColor('#ff634a')
                .setTitle('Success!')
                .setDescription(`OK Boss, \`${targetChannel}\` has just been created for you!`)
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                .setTimestamp()

            Interaction.guild.channels.create(targetChannel).then(ch => {
                Interaction.reply({
                    embeds: [embed]
                })
            });
        } else if (targetChannel2) {

            const embed2 = new MessageEmbed()
                .setAuthor({ name: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                .setColor('#ff634a')
                .setTitle('Success!')
                .setDescription(`OK Boss, the channels \`${targetChannel}\` & \`${targetChannel2}\` have just been created for you!`)
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                .setTimestamp()

            Interaction.guild.channels.create(targetChannel).then(
                Interaction.guild.channels.create(targetChannel2).then(ch => {
                    Interaction.reply({
                        embeds: [embed2]
                    })
                }));
        };
    },
};