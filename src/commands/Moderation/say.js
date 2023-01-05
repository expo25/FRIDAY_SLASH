const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription(`Send a secret message to a specified channel as the bot.`)
        .addChannelOption(option => option.setName('channel').setDescription('The channel to the send the message to.').setRequired(true))
        .addStringOption(option => option.setName('message').setDescription('The message text.').setRequired(true)),

    async execute(Interaction, client) {

        if(!Interaction.member.permissions.has('MANAGE_MESSAGES')) //need send messages permission to prevent people use this cmd wrong
            return Interaction.reply({ content: '**You are unauthorized to use this command.**', ephemeral: true }) //like sending the msg to announcement channel...

        const channel = Interaction.options.getChannel('channel');

        let messageArgs = Interaction.options.getString('message')

        channel.send(messageArgs)

        Interaction.reply({ content: 'I sent your message successfully.', ephemeral: true }).catch((err) => {
            throw err;
        });
    }
}