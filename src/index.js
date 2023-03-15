const { Client, Intents, Collection } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const fs = require('fs');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS]
});

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const mongoose = require('mongoose') // npm i mongoose
const commandFolders = fs.readdirSync("./src/commands");
const inviteSchema = require('./schemas.js/inviteSchema');
const { MessageEmbed } = require('discord.js');

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();

const invites = new Collection();
const wait = require("timers/promises").setTimeout;

client.on('ready', async () => {

    await wait(2000);

    client.guilds.cache.forEach(async (guild) => {

        const clientMember = guild.members.cache.get(client.user.id);

        if (!clientMember.permissions.has(PermissionFlagsBits.ManageGuild)) return;

        const firstInvites = await guild.invites.fetch().catch(err => (console.log(err)));

        invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
    })
})

client.on('guildMemberAdd', async member => {

    const Data = await inviteSchema.findOne({ Guild: member.guild.id });
    if (!Data) return;

    const channelID = Data.Channel;

    const channel = await member.guild.channels.cache.get(channelID);

    const newInvites = await member.guild.invites.fetch();

    const oldInvities = invites.get(member.guild.id);

    const invite = newInvites.find(i => i.uses > oldInvities.get(i.code));

    const inviter = await client.users.fetch(invite.inviter.id);

    const inviteEmbed = new MessageEmbed()
        .setColor('DARK_AQUA')
        .setDescription(`${member.user.tag} just joined the server using the invite ${invite.code} and was invited by ${inviter.tag}. That invite code has now been used ${invite.uses} times since it was originally created.`)
        .setFooter({ text: `${member.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true, size: 512 }) })
        .setTimestamp()

    const sorryEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`${member.user.tag} just joined the server but I was unable to find the invite link that they used to join. Sorry guys.`)
        .setFooter({ text: `${member.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true, size: 512 }) })
        .setTimestamp()

    inviter
        ? channel.send({ embeds: [inviteEmbed] })
        : channel.send({
            embeds: [sorryEmbed]
        })
})

