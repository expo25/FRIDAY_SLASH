const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { PermissionFlagsBits, ChannelType } = require('discord-api-types/v10');
const inviteSchema = require('../../schemas.js/inviteSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite-log')
        .setDescription(`Set up the guild's invite logging system.`)
        .addSubcommand(subcommand =>
            subcommand
                .setName('setup')
                .setDescription('Enable the invite logging system for this guild.')
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('The channel you would like to set the invite logging system in.')
                        .setRequired(true)
                        .addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('disable')
                .setDescription('Disable the invite logging system for this guild.')),

    async execute(Interaction, client) {

        if (!Interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return await Interaction.reply({ content: 'You are unauthorized to execute that command. **Missing permissions \`ADMINISTRATOR\`' });

        const { options } = Interaction;

        const sub = options.getSubcommand();

        const Data = await inviteSchema.findOne({ Guild: Interaction.guild.id});

        switch (sub) {
            case 'setup':

                const channel = options.getChannel('channel');

                if (Data) return await Interaction.reply({ content: 'The invite logging system has already been enabled.' })
                else {
                    await inviteSchema.create({
                        Guild: Interaction.guild.id,
                        Channel: channel.id
                    })

                    const embed = new MessageEmbed()
                        .setColor('GREEN')
                        .setDescription(`<a:GreenTick:984501363436294164> Invite Logging System enabled in ${channel}`)
                        .setImage(Interaction.guild.iconURL({ dynamic: true, size: 512 }))
                        .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                        .setTimestamp()

                    await Interaction.reply({ embeds: [embed] });
                }
        }

        switch (sub) {
            case 'disable':

                if (!Data) return await Interaction.reply({ content: 'The invite logging system has not been set up yet. There is nothing to disable. Try using your brain next time.' })
                else {
                    await inviteSchema.deleteMany({ Guild: Interaction.guild.id });

                    const deleteEmbed = new MessageEmbed()
                        .setColor('DARK_RED')
                        .setDescription('<a:X_:1009946137068851211> Invite Logging System disabled')
                        .setImage(Interaction.guild.iconURL({ dynamic: true, size: 512 }))
                        .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                        .setTimestamp()

                    await Interaction.reply({ embeds: [deleteEmbed] })
                }
        }
    }
}
