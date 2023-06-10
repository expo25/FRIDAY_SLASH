// const { SlashCommandBuilder } = require('@discordjs/builders');
// const { MessageEmbed } = require('discord.js');
// const fs = require('fs');
// // const commands = require('../../commands');

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('test')
//         .setDescription('Do Slash Commands Work?'),
//     async execute(Interaction, client) {

//         let str
//         const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
//         for (const file of commandFiles) {
//             const command = require(`../commands/${folder}/${file}`);
//             str += `Name: ${command.data.name}, Description: ${command.data.description} \n`;
//         }

//         await Interaction.reply({ content: str, ephemeral: true })
//     },
// }

const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Do Slash Commands Work?'),
    async execute(Interaction, client) {
        await Interaction.reply({ content: 'Yes, they do.', ephemeral: true })
    },
}