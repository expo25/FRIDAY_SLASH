const { Interaction } = require('discord.js')

const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Do Slash Commands Work?'),
    async execute(Interaction, client) {
        await Interaction.reply({ content: 'Yes, they do.', ephemeral: true})
    },
}