const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription(`F.R.I.D.A.Y Help Menu`),

    async execute(Interaction, client) {

        /***********************************************************************************************************************************************************\ 
        | The following code can be used to use fs's readdirSync function to search for the command data (Name & Descriptions) in the source folder of your project |  
        | This might work better than manually listing out all the comamands your bot has, unless you want custom descriptions like I have.                         |
        \***********************************************************************************************************************************************************/

        // let str
        // const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
        // for (const file of commandFiles) {
        //     const command = require(`../commands/${folder}/${file}`);
        //     str += `Name: ${command.data.name}, Description: ${command.data.description} \n`;
        // }

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
            new MessageButton().setCustomId("rt").setStyle("SECONDARY").setLabel("RT Custom Server Commands").setEmoji('<a:Fire:984837033086312478>'),
            new MessageButton().setCustomId("links").setStyle("PRIMARY").setLabel("Useful Links").setEmoji('<a:arrow:1000482373386899557>')
        ]);
        let d_iraw = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("d_home").setStyle("SUCCESS").setLabel("Home").setEmoji('<a:GreenTick:984501363436294164>').setDisabled(true),
            new MessageButton().setCustomId("d_admin").setStyle("DANGER").setLabel("Admin | Mod Commands").setEmoji('🔐').setDisabled(true),
            new MessageButton().setCustomId("d_command").setStyle("PRIMARY").setLabel("Full Command List").setEmoji('<a:vr_a_arrowright4:984836830312677377>').setDisabled(true),
            new MessageButton().setCustomId("rt").setStyle("SECONDARY").setLabel("RT Custom Server Commands").setEmoji('<a:Fire:984837033086312478>').setDisabled(true),
            new MessageButton().setCustomId("d_links").setStyle("PRIMARY").setLabel("Useful Links").setEmoji('<a:arrow:1000482373386899557>').setDisabled(true)
        ]);

        let adminembed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Admin || Mod Command List')
            .setDescription('This list provides all commands Server Admins || Mods have permission to use.')
            .addFields(
                //{name: '\u200b', value: '\u200b'},
                { name: '**COMMANDS**', value: '⇘' },
                { name: '</reload:1070512957412364379>', value: 'Owner-only command.' },
                { name: '</role-add:1009941339145785484>', value: 'Add a role to a server member.' },
                { name: '</role-remove:1009943055320760392>', value: 'Removes a role from a server member.' },
                { name: '</roles-setup:1009161816414359603>', value: `**NOTE:** This command is under maintanence and will not work correctly if you use it. Setup the server's reaction role system using a drop-down menu where users can select their roles (**Allows up to 23 roles)**.` },
                { name: '</clear:1008196735115477013>', value: `Clear a specified amount of messages from a channel. (Can't be over 14 days old).` },
                { name: '</delete-channel:1012204627644653588>', value: `Deletes a channel from the guild. (MUST delete at least 1; can delete 2)` },
                { name: '</create-channel:1014374267141496912>', value: `Creates a channel in the guild. **NOTE:** You will see the new channel at the very top of the server. Currently working on a way to select which category it can go in. (MUST create at least 1; can create 2)` },
                { name: '</kick:1008526492214493314>', value: 'Kicks a user from the server.' },
                { name: '</ban:1008179159585013911>', value: 'Bans a user from the server.' },
                { name: '</invite-log setup:1085681758793637948>', value: 'Enable the server invite tracker. This will track who was invited to the server, what invite code was used, and who the user was invited by.' },
                { name: '</invite-log disable:1085681758793637948>', value: 'Disable the server invite tracker.' },
                { name: '</lock:1008535350467113030>', value: 'Locks a channel preventing @everyone from sending messages.' },
                { name: '</mute:1008545900492238888>', value: `Gives a server member the 'Muted' role (If it exists). Also sends custom DM to the user letting them know they were muted.` },
                { name: '</say:1010276796878565447>', value: 'Send a secret message to a specified channel. Hee-hee...' },
                { name: '</slow-mode:1009960044919541830>', value: 'Enables slowmode in a specified channel. **NOTE:** Select the first option \`OFF\` to turn *OFF* slowmode in a specified channel.' },
                { name: '</nickname:1008499044609446072>', value: `Changes the nickname of a server member (Must have \`MANAGE_NICKNAMES\` permission).` },
                { name: '</warn add:1010287654732042255>', value: 'Warns a server member by sending them a custom DM.' }, // Decide on moving to the custom embed \\
                { name: '</warn check:1010287654732042255>', value: 'Check how many times a user has been warned.' }, // Decide on moving to the custom embed \\
                { name: '</warn clear:1010287654732042255>', value: 'Clear the warnings of a specified user.' }, // Decide on moving to the custom embed \\
                { name: '</warn remove:1010287654732042255>', value: 'Remove a warning from a server member.' }, // Decide on moving to the custom embed \\
            )
            .setFooter({ text: `Requested by ${Interaction.user.username}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        let commandembed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle('Full Command List')
            .setDescription('This list provides all commands @everyone has permission to use.')
            .addFields(
                { name: '**COMMANDS**', value: '⇘' },
                { name: '</audit-logs:1011060610483634276>', value: `Provides detailed information about F.R.I.D.A.Y's audit logging feature.` },
                { name: '</bot-stats:1012192270088421386>', value: `Provides some technical background on F.R.I.D.A.Y (Uptime, Development Tools, System)` },
                { name: '</calculator:1009874007711031446>', value: `Provides F.R.I.D.A.Y's standard built-in calculator.` },
                { name: '</chat:1081738400601739264>', value: 'Generates a detailed response from an asked question (Communicates with the OpenAI API)' },
                { name: '</help:1010322933052342394>', value: `Provides F.R.I.D.A.Y's interactive 'Help' menu.` },
                { name: '</get all-roles:1074114609360937032>', value: 'Returns all server roles & their ids.' },
                { name: '</get channel:1074114609360937032>', value: 'Returns info on a channel within the server.' },
                { name: '</get role:1074114609360937032>', value: 'Returns info on a role within the server.' },
                { name: '</get user:1074114609360937032>', value: 'Returns info on a user within the server' },
                { name: '</inspire:1008522913227477072>', value: 'Provides a randomly generated inspirational quote to the channel.' },
                { name: '</invite:1019636614194004060>', value: 'Generate a link to invite the bot to your server (Admins).' },
                { name: '</logo:1008538849632325702>', value: `Provides the guild's (server) iconURL.` },
                { name: '</membercount:1008542097978175549>', value: 'Provides a quick server member count (All members + bots).' },
                { name: '</meme:1009143979708788807>', value: `Provides a randomly generated meme from a set array (BE WARNED: Not for the easily-offended).` },
                { name: '</remind:1016539268849614938>', value: `Have the bot DM you a custom reminder (Time formats must be in: 30s, 2h, 2d).` },
                { name: '</profile:1066015278879740044>', value: 'Provides detailed information on a user within the server.' },
                { name: '</server-stats:1016488031890460672>', value: 'Provides detailed server information.' },
                { name: '</suggest:1010270842321633290>', value: 'Provides a suggestion in the form of an embed to the server suggestion channel (Channel must have the word \`Suggest\` in it in order to be sent)' },
                { name: '</role-check:1009949032048758834>', value: `Check if a server member has a certain role (Useful in large guilds).` })
            //{ name: '**/navigation**', value: 'Provides a paginated embed containing server information, channels, categories, roles & links for different guilds.\nUsage: /navigation <server name>' },
            .setFooter({ text: `Requested by ${Interaction.user.username}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        let customEmbed = new MessageEmbed()
            .setColor('GREYPLE')
            .setTitle('Royal Tiger Custom Server Commands')
            .setDescription('This list provides all commands native to the \`Royal Tiger\` Discord Server.')
            .addFields(
                { name: '</ba:1008183326571499630>', value: 'Provides Black Artillery™ clan tag & link' },
                { name: '</rt:1064685287030145054>', value: 'Prvides Royal Tiger™ clan tag & link' },
                { name: '</recruit-msg:1053772428121227264>', value: 'Sends a user a custom message to the channel, welcoming them, giving them a member role, and changing their nickname. **NOTE:** Must have the <@&980916746363998209> role to use.' },
                { name: '</rb1:1040451184386920478>', value: 'Sends a custom embed to a specified channel (See <#1040461074715127869>) **NOTE:** Must be a server admin to use if this integration is not disabled within the guild.' },
                { name: '</rb2:1040451184386920479>', value: 'Sends a custom embed to a specified channel (See <#1040461074715127869>) **NOTE:** Must be a server admin to use if this integration is not disabled within the guild.' },
                { name: '</rb3:1040454611733061782>', value: 'Sends a custom embed to a specified channel (See <#1040461074715127869>) **NOTE:** Must be a server admin to use if this integration is not disabled within the guild.' })

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
            } else if (i.customId === "rt") {
                await i.deferUpdate().catch(e => { })
                i.editReply({ embeds: [customEmbed] })
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

