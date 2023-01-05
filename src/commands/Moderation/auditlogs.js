const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('audit-logs')
        .setDescription(`Provides detailed info on F.R.I.D.A.Y's audit logging feature.`),

    async execute(Interaction, client) {

        //if (!Interaction.member.permissions.has("MANAGE_MESSAGES")) return Interaction.reply({ content: "You are unauthorized to execute this command." });

        const select_menu_raw = new MessageActionRow()
            .addComponents(new MessageSelectMenu()
                .setCustomId("audit")
                .setPlaceholder('Select an option from the drop-down menu.')
                .addOptions(
                    {
                        label: 'Setup',
                        value: 'setup',
                        description: `How to set up F.R.I.D.A.Y's audit logging feature`,
                        emoji: {
                            name: 'a:GreenTick', id: '984501363436294164'
                        }
                    },
                    {
                        label: 'Anti-Spam Audo Mod Feature',
                        value: 'spam',
                        description: `F.R.I.D.A.Y's Anti-Spam System`,
                        emoji: {
                            name: 'a:vr_a_purplestar', id: '984838501440815175'
                        }
                    },
                    {
                        label: 'Channel Audits',
                        value: 'channelaudits',
                        description: 'Actions logged from updates made to guild channels.',
                        emoji: {
                            name: 'a:BlueArrow', id: '1000481336479453364'
                        }
                    },
                    {
                        label: 'Emoji Audits',
                        value: 'emojiaudit',
                        description: 'Actions logged from updates made to guild emotes.',
                        emoji: {
                            name: 'a:White_Arrow_Right', id: '1000480053504782406',
                        }
                    },
                    {
                        label: 'Guild Member Audits',
                        value: 'guildaudit',
                        description: 'Actions logged from updates made to guild members.',
                        emoji: {
                            name: 'a:Arrow_1_Gif', id: '1000473507257389086'
                        }
                    },
                    {
                        label: 'Message Audits',
                        value: 'msgaudit',
                        description: 'Actions logged from updates made to guild messages.',
                        emoji: {
                            name: 'a:vr_a_arrowright4', id: '984836830312677377'
                        }
                    },
                    {
                        label: 'Role Audits',
                        value: 'roleaudit',
                        description: 'Actions logged from updates made to guild roles.',
                        emoji: {
                            name: 'a:arrow', id: '1000482373386899557'
                        }
                    },
                    {
                        label: 'User & Voice State Updates',
                        value: 'uservoice',
                        description: 'Actions logged from user setting updates & guild voice channels',
                        emoji: {
                            name: 'a:AnimateArrow', id: '1000428671988928513'
                        }
                    }
                )
            );

        const select_menu_dis = new MessageActionRow()
            .addComponents(new MessageSelectMenu()
                .setCustomId("audit")
                .setPlaceholder('Select an option from the drop-down menu.')
                .addOptions(
                    {
                        label: 'Setup',
                        value: 'setup',
                        description: `How to set up F.R.I.D.A.Y's audit logging feature.`,
                        emoji: {
                            name: 'a:GreenTick', id: '984501363436294164'
                        }
                    },
                    {
                        label: 'Spam',
                        value: 'spam',
                        description: `F.R.I.D.A.Y's Anti-Spam Auto Moderator`,
                        emoji: {
                            name: 'a:vr_a_purplestar', id: '984838501440815175'
                        }
                    },
                    {
                        label: 'Channel Audits',
                        value: 'channelaudits',
                        description: 'Actions logged from updates made to guild channels.',
                        emoji: {
                            name: 'a:BlueArrow', id: '1000481336479453364'
                        }
                    },
                    {
                        label: 'Emoji Audits',
                        value: 'emojiaudit',
                        description: 'Actions logged from updates made to guild emotes.',
                        emoji: {
                            name: 'a:White_Arrow_Right', id: '1000480053504782406',
                        }
                    },
                    {
                        label: 'Guild Member Audits',
                        value: 'guildaudit',
                        description: 'Actions logged from updates made to guild members.',
                        emoji: {
                            name: 'a:Arrow_1_Gif', id: '1000473507257389086'
                        }
                    },
                    {
                        label: 'Message Audits',
                        value: 'msgaudit',
                        description: 'Actions logged from updates made to guild messages.',
                        emoji: {
                            name: 'a:vr_a_arrowright4', id: '984836830312677377'
                        }
                    },
                    {
                        label: 'Role Audits',
                        value: 'roleaudit',
                        description: 'Actions logged from updates made to guild roles.',
                        emoji: {
                            name: 'a:arrow', id: '1000482373386899557'
                        }
                    },
                    {
                        label: 'User & Voice State Updates',
                        value: 'uservoice',
                        description: 'Actions logged from user setting updates & guild voice channels',
                        emoji: {
                            name: 'a:AnimateArrow', id: '1000428671988928513'
                        }
                    }
                ).setDisabled(true)
            );

        const homeEmbed = new MessageEmbed()
            .setColor('#ff634a')
            .setTitle('F.R.I.D.A.Y Action Logging Features')
            .setDescription(`**Overview**\n\u200b\nF.R.I.D.A.Y's Action Logging Module will help you, your moderators & admins automatically keep track of all the events happening within the server so that you can do what you do best: \`Manage the server.\`\nThis is currently one of the most advanced logging systems on Discord; with more automatic features available then even \`Dyno.\``)
            .setFooter({ text: `Requested By: ${Interaction.user.username}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()

        const spamEmbed = new MessageEmbed()
        .setColor('DARK_RED')
        .setTitle('Anti-Spam Auto Mod Feature')
        .setDescription('F.R.I.D.A.Y has a built in feature that will help prevent spam in your channels. Any time a user sends 7 or more messages in quick succession, the bot will:\n**==>** Delete all the messages from the channel.\n**==>** Send a message to the channel *tagging* the user who was spamming so you & your mods can take action accordingly.')
        .setFooter({ text: `Requested By: ${Interaction.user.username}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
        .setThumbnail('https://cdn.discordapp.com/emojis/999418390705881200.webp?size=96&quality=lossless')
        .setTimestamp()

        const setupEmbed = new MessageEmbed()

            .setColor('GREEN')
            .setTitle('F.R.I.D.A.Y Action Log Module Setup')
            .setDescription(`To get started, make sure you have a channel in your server that has the word \`logs\` in its name. Make sure there is only one, to avoid confusion having the bot send messages to multiple channels. That's it! It's really that simple. F.R.I.D.A.Y will look for this channel to send messages to where you can keep track of different events happening within your server. `)
            .addFields({ name: 'NOTE - F.R.I.D.A.Y MUST have the following enabled for this to work in your server:', value: '**==>** Administrator privleges.\n**==>** Ability to view the server audit log.\n**==>** Ability to send messages in your \`logs\` channel' })
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ text: `Requested By: ${Interaction.user.username}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        const channelEmbed = new MessageEmbed()
            .setColor('DARK_BLUE')
            .setTitle('Channel Audits')
            .setDescription('The following information is logged every time an update is made to a server \`channel.\`\n**⇘**')
            .addFields({ name: 'Channel Create', value: 'Event logged every time a channel is created in your server. Gives you the name of the channel as well as *who* created it. ' },
                { name: 'Channel Delete', value: 'Event logged every time a channel is deleted in your server. Gives you the name of the channel as well as *who* deleted it.' },
                { name: 'Channel Update', value: 'Event logged every time a channel is updated in your server. Gives you the old and new name of the channel (If the name was updated), as well as the old & new topic (If it was changed). ' })
            .setThumbnail('https://cdn.discordapp.com/emojis/1009945477254479933.gif?size=96&quality=lossless')
            .setFooter({ text: `Requested By: ${Interaction.user.username}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        const emojiEmbed = new MessageEmbed()
            .setColor('WHITE')
            .setTitle('Emoji Audits')
            .setDescription('The following information is logged every time an update is made to a server \`emoji.\`\n**⇘**')
            .addFields({ name: 'Emoji Create', value: 'Event logged every time someone uploads a new emoji into the server. Gives you the emoji name, id, and name of the user who uploaded it (Could be Carl from ?steal, or could be a manual upload from server settings).' },
                { name: 'Emoji Delete', value: 'Event logged every time someone deletes an emoji from the server. Gives you emoji name, id, and name of the user who deleted it.' },
                { name: 'Emoji Update', value: 'Event logged every time someone changed the name of an emoji in the server. Gives you the old & new name along with the user who edited it.' })
            .setThumbnail('https://cdn.discordapp.com/emojis/1010402818621968466.webp?size=96&quality=lossless')
            .setFooter({ text: `Requested By: ${Interaction.user.username}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        const memberEmbed = new MessageEmbed()
            .setColor('DARK_GOLD')
            .setTitle('Guild Member Audits')
            .setDescription('The following information is logged every time an update is made to a server \`member.\`\n**⇘**')
            .addFields({ name: 'Server Member Join', value: 'Event logged every time a new user joins the server. Gives you the name of the member & the new total server member count after they joined.' },
                { name: 'Server Member Left', value: 'Event logged every time a user leaves the server (Whether from their own willing or by kick). Gives you the name of the member & the new total server member count after they left.' },
                { name: 'Server Member Update', value: 'Event logged every time their is an update to a server member.\n**==>** Member Nickname changes. Gives you old & new name & who it was changed by.\n**==>** Member Role Removal. Gives you the role that was removed and who it was removed by.\n**==>** Member Role Add. Gives you the role that was added and who it was added by.' })
            .setThumbnail('https://cdn.discordapp.com/attachments/960951293436919828/1016523345308688384/teamwork.jpg')
            .setFooter({ text: `Requested By: ${Interaction.user.username}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        const msgEmbed = new MessageEmbed()
            .setColor('DARK_VIVID_PINK')
            .setTitle('Message Audits')
            .setDescription('The following information is logged every time a message in the server is \`deleted\`, \`edited\` or \`reacted to.\`\n**⇘**')
            .addFields({ name: 'Message Delete', value: 'Event logged every time a user deletes a message. Gives you the message content, user who deleted it, and the channel it was deleted in.' },
                { name: 'Message Edits', value: 'Event logged every time a user edits a message. Gives you the old & new message content, the user who edited it, and the channel it was edited in. NOTE: This event ignores any edits to messages made by bots.' },
                { name: 'Message Delete Bulk', value: `Event logged every time someone bulk deletes messages from a channel (Using a command such as \`/clear\`). Gives you the amount of messages that were deleted along with who deleted them, and in what channel.` },
                { name: 'Message Reaction Add', value: `Gives you the user who reacted to the message, emoji they reacted with, who's message they reacted to, how many of the same reactions were added, and the channel the event happened in.` },
                { name: 'Message Reaction Remove', value: `Similar to the reaction add, this gives you the user who removed the reaction, the emoji they removed, who's message they removed the reaction from, how many of the same reactions are now there, and the channel the event happened in.` })
            .setThumbnail('https://cdn.discordapp.com/emojis/1014731635771584543.webp?size=80&quality=lossless')
            .setFooter({ text: `Requested By: ${Interaction.user.username}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        const roleEmbed = new MessageEmbed()
            .setColor('FUCHSIA')
            .setTitle('Role Audits')
            .setDescription('The following information is logged every time a server \`role\` is updated.\n**⇘**')
            .addFields({ name: 'Role Create', value: 'Event logged every time a new role is created. Gives you the name of the role and shows the user who created it.' },
                { name: 'Role Delete', value: 'Event logged every time a server role is deleted. Gives you the name of the role that was deleted and shows the user who deleted it.' },
                { name: 'Role Update', value: 'Event logged every time a server role is update. This includes someone changing either the name of the role OR the permissions. Gives you the the old & new role name, and if any permissions were updated, it will tell you exactly which ones were either given or taken away, and by who.' })
            .setThumbnail('https://cdn.discordapp.com/attachments/960951293436919828/1016523285162373160/discord_colors-3.png')
            .setFooter({ text: `Requested By: ${Interaction.user.username}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        const voiceEmbed = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('User & Voice Chat Audits')
            .setDescription('The following information is logged every time a user updates their \`profile\` or has activity in a \`voice channel.\`\n**⇘**')
            .addFields({ name: 'User Update', value: 'Event logged every time a user updates their Discord *Not server* name. Gives you the old & new username.' },
                { name: 'Voice Channel Updates', value: 'Event logged every time there is activity in a voice channel. This includes:\n**==>** Members Joining Voice Channels.\n**==>** Members Leaving Voice Channels.\n**==>** Members Leaving & Then Joining a New Voice Chanel.' })
            .setThumbnail('https://cdn.discordapp.com/emojis/1014992441822154772.webp?size=80&quality=lossless')
            .setFooter({ text: `Requested By: ${Interaction.user.username}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        await Interaction.reply({
            components: [select_menu_raw],
            embeds: [homeEmbed],
            ephemeral: true
        });

        const filter = i => i.user.id === Interaction.user.id

        const collector = Interaction.channel.createMessageComponentCollector({ filter: filter, time: 1000 * 200 });

        collector.on('collect', async (i) => {

            const value = i.values[0];

            if (value === 'setup') {
                await i.deferUpdate().catch(e => { })
                i.editReply({ embeds: [setupEmbed] })
            } else if (value === 'spam') {
                await i.deferUpdate().catch(e => { })
                i.editReply({ embeds: [spamEmbed] })
            } else if (value === 'channelaudits') {
                await i.deferUpdate().catch(e => { })
                i.editReply({ embeds: [channelEmbed] })
            } else if (value === 'emojiaudit') {
                await i.deferUpdate().catch(e => { })
                i.editReply({ embeds: [emojiEmbed] })
            } else if (value === 'guildaudit') {
                await i.deferUpdate().catch(e => { })
                i.editReply({ embeds: [memberEmbed] })
            } else if (value === 'msgaudit') {
                await i.deferUpdate().catch(e => { })
                i.editReply({ embeds: [msgEmbed] })
            } else if (value === 'roleaudit') {
                await i.deferUpdate().catch(e => { })
                i.editReply({ embeds: [roleEmbed] })
            } else if (value === 'uservoice') {
                await i.deferUpdate().catch(e => { })
                i.editReply({ embeds: [voiceEmbed] })
            }
        })

        collector.on('end', () => {
            Interaction.editReply({
                components: [select_menu_dis],
                embeds: [homeEmbed]
            })
        });
    },
};
