const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription(`F.R.I.D.A.Y Help Menu`),

    async execute(Interaction, client) {

        let homeembed = new MessageEmbed()
            .setColor('#ff634a')
            .setTitle('F.R.I.D.A.Y Help Menu')
            .setDescription('**Hi there! What would you like to see?**')
            .addFields({ name: 'Please click on any one of the following buttons for more information.', value: '\u200b' })
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ text: `${client.user.username} Now Supports Slash Commands`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })

        let iraw = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("home").setStyle("SUCCESS").setLabel("Home").setEmoji('<a:GreenTick:984501363436294164>'),
            new MessageButton().setCustomId("admin").setStyle("DANGER").setLabel("Admin | Mod Commands").setEmoji('🔐'),
            new MessageButton().setCustomId("command").setStyle("PRIMARY").setLabel("Full Command List").setEmoji('<a:vr_a_arrowright4:984836830312677377>'),
            new MessageButton().setCustomId("links").setStyle("PRIMARY").setLabel("Useful Links").setEmoji('<a:arrow:1000482373386899557>')
        ]);
        let d_iraw = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("d_home").setStyle("SUCCESS").setLabel("Home").setEmoji('<a:GreenTick:984501363436294164>').setDisabled(true),
            new MessageButton().setCustomId("d_admin").setStyle("DANGER").setLabel("Admin | Mod Commands").setEmoji('🔐').setDisabled(true),
            new MessageButton().setCustomId("d_command").setStyle("PRIMARY").setLabel("Full Command List").setEmoji('<a:vr_a_arrowright4:984836830312677377>').setDisabled(true),
            new MessageButton().setCustomId("d_links").setStyle("PRIMARY").setLabel("Useful Links").setEmoji('<a:arrow:1000482373386899557>').setDisabled(true)
        ]);

        let adminembed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Admin || Mod Command List')
            .setDescription('This list provides all commands Server Admins || Mods have permission to use.')
            .addFields(
                //{name: '\u200b', value: '\u200b'},
                { name: '**COMMANDS**', value: '⇘' },
                { name: '**/audit-logs**', value: `Provides detailed information about F.R.I.D.A.Y's audit logging feature.\nUsage: /audit-logs` },
                { name: '**/clear**', value: `Clear a specified amount of messages from a channel. (Can't be over 14 days old).\nUsage: /clear <Amt of messages> <user>` },
                { name: '**/role-add**', value: 'Add a role to a server member.\nUsage: /role-add <member> <role>' },
                { name: '**/role-remove**', value: 'Removes a role from a server member.\nUsage: /role-remove <member> <role>' },
                { name: '**/roles-setup**', value: `**NOTE:** This command is under maintanence and will not work correctly if you use it. Setup the server's reaction role system using a drop-down menu where users can select their roles (**Allows up to 23 roles)**.\nUsage: /roles-setup <@role1> <@role2> <@role3> <\`finish\`>` },
                { name: '**/warn**', value: 'Warns a server member by sending them a custom DM.\nUsage: /warn <member> <Type reason you warned them>' },
                { name: '**/ban**', value: 'Bans a user from the server.\nUsage: /ban <member> <Type reason you banned them>' },
                { name: '**/kick**', value: 'Kicks a user from the server.\nUsage: /kick <member>' },
                { name: '**/lock**', value: 'Locks a channel preventing @everyone from sending messages.\nUsage: /lock <Type reason you locked the channel>' },
                { name: '**/slow-mode**', value: 'Enables slowmode in a specified channel.\nUsage: /slowmode <channel name> <slowmode duration time> NOTE: Select the first option \`OFF\` to turn off slowmode in a specified channel.' },
                { name: '**/mute**', value: `Gives a server member the 'Muted' role (If it exists). Also sends custom DM to the user letting them know they were muted.\nUsage: /mute <member> <Type reason you muted them>` },
                { name: '**/nickname**', value: `Changes the nickname of a server member (Must have MANAGE_NICKNAMES permission)\nUsage: /nickname <user> <Type the nickname you want to change to>` },
                { name: '**/delete-channel**', value: `Deletes a channel from the guild.\nUsage: /delete-channel <channel1> <channel2> (MUST delete at least 1; can delete 2)` },
                { name: '**/create-channel**', value: `Creates a channel in the guild. NOTE: You will see the new channel at the very top of the server. Currently working on a way to select which category it can go in.\nUsage: /create-channel <channel name> (MUST create at least 1; can create 2)` }
            )
            .setFooter({ text: `Requested by ${Interaction.user.username}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        let commandembed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle('Full Command List')
            .setDescription('This list provides all commands @everyone has permission to use.')
            .addFields(
                { name: '**COMMANDS**', value: '⇘' },
                { name: '**/help**', value: `Provides F.R.I.D.A.Y's Help menu.\nUsage: /help` },
                { name: '**/invite**', value: 'Generate a link to invite the bot to your server (Admins).\nUsage: /invite' },
                { name: '**/bot-stats**', value: `Provides some technical background on F.R.I.D.A.Y (Uptime, Development Tools, System).\nUsage: /bot-stats` },
                { name: '**/remind**', value: `Have the bot DM you a custom reminder.\nUsage: /remind <time to be reminded in (i.e 30s, 2h, 2d)> <reminder>` },
                //{ name: '**/ba**', value: 'Provides the in-game link Black Artillery.\nUsage: /ba' },
                { name: '**/calculator**', value: `Provides F.R.I.D.A.Y's standard built-in calculator.\nUsage: /calculator` },
                { name: '**/role-check**', value: `Check if a server member has a certain role (Useful in large guilds).\nUsage: /role-check <member> <role>` },
                { name: '**/inspire**', value: 'Provides a randomly generated inspirational quote to the channel.\nUsage: /inspire' },
                { name: '**/member-count**', value: 'Provides a quick server member count (All members + bots).\nUsage: /member-count' },
                //{ name: '**/navigation**', value: 'Provides a paginated embed containing server information, channels, categories, roles & links for different guilds.\nUsage: /navigation <server name>' },
                { name: '**/logo**', value: `Provides the guild's (server) iconURL.\nUsage: /logo` },
                { name: '**/server-stats**', value: 'Provides detailed server information.\nUsage: /server-info' },
                { name: '**/profile**', value: 'Provides detailed information on a user within the server.\nUsage: /profile <member>' },
                { name: '**/suggest**', value: 'Provides a suggestion in the form of an embed to the server suggestion channel (Channel must have the word \`Suggest\` in it in order to be sent).\nUsage: /suggest <Type your suggestion>' },
                { name: '**/meme**', value: `Provides a randomly generated meme from a set array (BE WARNED: Not for the easily-offended).\nUsage: /meme` }
            )
            .setFooter({ text: `Requested by ${Interaction.user.username}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        let otherembed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle('Useful Links')
            .setDescription(`Here are some useful links you may want (Or, at least I think so. But then again, I'm a bot.)`)
            .addFields(
                { name: 'Invite the Bot to Your Server (Admins):', value: '[Click Here](https://discord.com/api/oauth2/authorize?client_id=963589943593164880&permissions=0&scope=applications.commands%20bot)' },
                //{ name: 'Bot not working? Join & Open a Ticket:', value: '[Click Here](https://discord.gg/WFkbBdznXF)' },
                { name: 'Suggest an Improvement:', value: '[DM the Developer](https://discordapp.com/users/909535714767671346/)' })
            //{ name: '**ESL Clan Link**', value: '𝙺𝙸𝙻𝙻 𝚂𝚆𝙸𝚃𝙲𝙷™\nhttps://link.clashofclans.com/en?action=OpenClanProfile&tag=2Q8VPJRQC' },
            //{ name: 'Black Artillery Discord Server Link', value: '𝙱𝙻𝙰𝙲𝙺 𝙰𝚁𝚃𝙸𝙻𝙻𝙴𝚁𝚈™\nhttps://discord.gg/r8pvu2jMUW' },
            //{ name: 'Rocking Boy Discord Server Link', value: '𝚃𝙷𝙴 𝚁𝙾𝙲𝙺𝙸𝙽𝙶 𝙱𝙾𝚈™\nhttps://discord.gg/eppfaFvE5R' }
            //)
            .setFooter({ text: `Requested by ${Interaction.user.username}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        await Interaction.reply({ embeds: [homeembed], components: [iraw] })

        const filter = i => i.user.id === Interaction.user.id;

        const collector = await Interaction.channel.createMessageComponentCollector({ filter: filter, time: 1000 * 200 });

        collector.on('collect', async (i) => {

            if (i.customId === "admin") {
                await i.deferUpdate().catch(e => { })
                i.editReply({ embeds: [adminembed] })
            } else if (i.customId === "command") {
                await i.deferUpdate().catch(e => { })
                i.editReply({ embeds: [commandembed] })
            } else if (i.customId === "links") {
                await i.deferUpdate().catch(e => { })
                i.editReply({ embeds: [otherembed] })
            } else if (i.customId === "home") {
                await i.deferUpdate().catch(e => { })
                i.editReply({ embeds: [homeembed] })
            }

        });

        collector.on('end', () => {
            Interaction.editReply({ embeds: [homeembed], components: [d_iraw], ephemeral: true })
        })
    }
}

