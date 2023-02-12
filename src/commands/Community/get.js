const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow, Permissions } = require('discord.js');
const moment = require('moment');
const axios = require("axios");
// const { ChannelTypes } = require('discord.js/typings/enums');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get')
        .setDescription('For Devs - Get quilck info on server role, channel, emote, or user ids.')
        .addSubcommand((subcommand =>
            subcommand
                .setName('role')
                .setDescription('Displays detailed info on a role within the server.')
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('The role you would like to fetch.')
                        .setRequired(true),)))
        .addSubcommand((subcommand =>
            subcommand
                .setName('channel')
                .setDescription('Displays detailed info on a channel within the server.')
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('The channel you would like to fetch.')
                        // .addChannelTypes(ChannelTypes.GUILD_TEXT) // Ensure the user can only select a TextChannel for output
                        .setRequired(true),)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('all-roles')
                .setDescription('Display a list of all server roles along with their ids.'))
        .addSubcommand((subcommand =>
            subcommand
                .setName('user')
                .setDescription('User info')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('The user you would like to fetch.')
                        .setRequired(true),))),

    async execute(Interaction, client) {

        //role identifiers

        const role = Interaction.options.getRole('role');
        // const roleID = role.id;

        const user = Interaction.options.getUser('user');
        const userID = Interaction.user.id;

        //other identifiers

        const date = new Date(Interaction.createdTimestamp).toLocaleDateString();
        const sub = Interaction.options.getSubcommand(["role", "channel", "all-roles", "user"]);

        if (sub === "role") {

            const perms = new Permissions(role.permissions.bitfield).toArray();
            const roleConcat = '<' + '@' + '&' + role.id + '>' + ' ';

            //embeds for /get-role.

            const roleEmbed = new MessageEmbed()
                .setColor(role.color)
                .setTitle('Role Info')
                // .setDescription(`> ${role} Info`)
                .addFields(
                    { name: 'Name', value: `${role.name}`, inline: true },
                    { name: 'Hex Color', value: `${role.hexColor}`, inline: true },
                    { name: 'Created On', value: `\`${moment(role.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\``, inline: true },
                    { name: 'Position in Server', value: `${role.position}`, inline: true },
                    { name: 'Mentionable?', value: role.mentionable ? '<:Square_GreenButton:1070897822586646538>' : '<:Square_RedButton:1070897947748880404>', inline: true },
                    { name: 'Displayed Seperately?', value: role.hoist ? '<:Square_GreenButton:1070897822586646538>' : '<:Square_RedButton:1070897947748880404>', inline: true },)
                // .setThumbnail(':role_OfficialPRbot:')
                .setFooter({ text: `Role ID: ${role.id}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })

            const userEmbed = new MessageEmbed()
                .setColor(role.color)
                // .setAuthor({ name: role.name, iconURL: Interaction.guild.iconURL({ dynamic: true }) })
                .setTitle(`Role Users`)
                .setDescription(`${role.members.map(m => m).join(' | ')}`)
                .setFooter({ text: `Total Users: ${role.members.size.toString()}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })

            const permEmbed = new MessageEmbed()
                .setColor(role.color)
                .setTitle('Role Permissions')
                .setDescription(`${perms.join(', ')}`)
                .setFooter({ text: `Total Permissions: ${perms.length}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })

            const roleEmbedEnd = new MessageEmbed()
                .setColor(role.color)
                .setTitle('Module ended.')
                .setFooter({ text: 'Please use the command again.', iconURL: client.user.displayAvatarURL() })

            //\\ buttons for /get-role.

            const roleButton = new MessageActionRow()
                .addComponents([
                    new MessageButton()
                        .setCustomId("home")
                        .setStyle("SUCCESS")
                        .setLabel("Role Info")
                        .setEmoji('<a:GreenTick:984501363436294164>'),

                    new MessageButton()
                        .setCustomId('users')
                        .setStyle('PRIMARY')
                        .setLabel('Users')
                        .setEmoji('<a:arrow:1000482373386899557>'),

                    new MessageButton()
                        .setCustomId('perms')
                        .setStyle('SECONDARY')
                        .setLabel('Permissions')
                        .setEmoji('<a:stars:862359989926625302>'),
                ]);

            const d_roleButton = new MessageActionRow()
                .addComponents([
                    new MessageButton()
                        .setCustomId("home")
                        .setStyle("SUCCESS")
                        .setLabel("Role Info")
                        .setEmoji('<a:GreenTick:984501363436294164>')
                        .setDisabled(true),

                    new MessageButton()
                        .setCustomId('role')
                        .setStyle('PRIMARY')
                        .setLabel('Users')
                        .setEmoji('<a:arrow:1000482373386899557>')
                        .setDisabled(true),

                    new MessageButton()
                        .setCustomId('perms')
                        .setStyle('SECONDARY')
                        .setLabel('Permissions')
                        .setEmoji('<a:stars:862359989926625302>')
                        .setDisabled(true),
                ]);

            await Interaction.reply({ embeds: [roleEmbed], components: [roleButton] });

            const filter = i => i.user.id === Interaction.user.id;

            const collector = await Interaction.channel.createMessageComponentCollector({ filter: filter, time: 1000 * 200 });

            collector.on('collect', async (i) => {

                if (i.customId === 'users') {
                    await i.deferUpdate().catch(e => { })
                    i.editReply({ embeds: [userEmbed] })
                } else if (i.customId === 'perms') {
                    await i.deferUpdate().catch(e => { })
                    i.editReply({ embeds: [permEmbed] })
                } else if (i.customId === 'home') {
                    await i.deferUpdate().catch(e => { })
                    i.editReply({ embeds: [roleEmbed] })
                }
            });

            collector.on('end', () => {
                Interaction.editReply({ embeds: [roleEmbedEnd], components: [d_roleButton] })
            });

        } else if (sub === "channel") {

            //\\ channel identifier

            const channel = Interaction.options.getChannel('channel')

            //\\ embed for /get-channel

            const channelEmbed = new MessageEmbed()
                .setColor('ff634a')
                .setTitle('<:sendmessagetochannel:1014731635771584543> Channel Info')
                .addFields(
                    { name: 'Name', value: `${channel.toString()}`, inline: true },
                    { name: 'Created At', value: `\`${moment(channel.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\``, inline: true },
                    { name: 'Directory Channel?', value: channel.isDirectory() ? '<:Square_GreenButton:1070897822586646538>' : '<:Square_RedButton:1070897947748880404>', inline: true },
                    { name: 'Text Channel?', value: channel.isText() ? '<:Square_GreenButton:1070897822586646538>' : '<:Square_RedButton:1070897947748880404>', inline: true },
                    { name: 'Voice Channel?', value: channel.isVoice() ? '<:Square_GreenButton:1070897822586646538>' : '<:Square_RedButton:1070897947748880404>', inline: true },
                    { name: 'Thread?', value: channel.isThread() ? '<:Square_GreenButton:1070897822586646538>' : '<:Square_RedButton:1070897947748880404>', inline: true }
                )
                .setFooter({ text: `Channel ID: ${channel.id}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })

            await Interaction.reply({ embeds: [channelEmbed] });

        } else if (sub === "all-roles") {

            // Embed for /get-all-roles \\

            const allroleEmbed = new MessageEmbed()
                .setColor('AQUA')
                .setTitle('Server Roles')
                .setDescription(`${Interaction.guild.roles.cache.sorted((x, y) => {
                    return y.position - x.position;
                }).map((role) => {
                    return `${role} - ${role.id}`
                }).join(`\n`)}`)
                .setFooter({ text: `Total Roles: ${Interaction.guild.roles.cache.size.toString() - 1}`, iconURL: Interaction.guild.iconURL() })
            // -1 signifies subtracting the @everyone role when calculating the total number of roles in the server \\

            await Interaction.reply({ embeds: [allroleEmbed] });

        }
    },
};