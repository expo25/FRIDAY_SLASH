const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slow-mode')
        .setDescription(`Sets the slowmode to a specific channel.`)
        .addChannelOption(option => option.setName('channel').setDescription('The channel you would like to set slowmode to.').setRequired(true))
        .addStringOption(option => option.setName('duration').setDescription('The time interval.')
            .addChoices({ name: 'OFF', value: '0s' },
                { name: '5 Seconds', value: '5s' },
                { name: '10 Seconds', value: '10s' },
                { name: '15 Seconds', value: '15s' },
                { name: '30 Seconds', value: '30s' },
                { name: '1 Minute', value: '1m' },
                { name: '2 Minutes', value: '2m' },
                { name: '5 Minutes', value: '5m' },
                { name: '10 Minutes', value: '10m' },
                { name: '15 Minutes', value: '15m' },
                { name: '30 Minutes', value: '30m' },
                { name: '1 Hour', value: '1h' },
                { name: '2 Hours', value: '2h' },
                { name: '6 Hours', value: '6h' })
            .setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Please type the reason you wish to set this channel to slowmode.')),


    async execute(Interaction, client) {

        const channel = Interaction.options.getChannel('channel');
        const targetSlow = Interaction.options.getString('duration')
        const targetReason = Interaction.options.getString('reason') || 'Not Specified'
        const targetChannel = Interaction.guild.channels.cache.get(channel.id);

        if (!Interaction.member.permissions.has('MANAGE_CHANNELS') && ('MANAGE_MESSAGES')) return Interaction.reply({ content: 'You are unauthorized to execute this command. Missing permissions | \`\(MANAGE_CHANNELS & MANAGE_MESSAGES\)\`' })

        const SucessEmbed = new MessageEmbed()
            .setTitle('Success!')
            .setDescription(`OK Boss, I have successfully set the slowmode in ${targetChannel} to \`${targetSlow}\`!`)
            .setColor('#ff634a')
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        const OffEmbed = new MessageEmbed()
            .setTitle('Slowmode Disabled')
            .setDescription(`OK Boss, I just disabled slowmode in ${targetChannel}, per your request.`)
            .setColor('#ff634a')
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        if (targetSlow != '0s') {
            await channel.setRateLimitPerUser((ms(targetSlow)) / 1000, `${targetReason}`).catch((error) => Interaction.reply('There has been an error!'))
            await Interaction.reply({ embeds: [SucessEmbed] })

        } else {
            await channel.setRateLimitPerUser((ms(targetSlow)) / 1000, `${targetReason}`).catch((error) => Interaction.reply('There has been an error!'))
            await Interaction.reply({ embeds: [OffEmbed] })
        }
    }
}