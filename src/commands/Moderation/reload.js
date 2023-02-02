const { SlashCommandBuilder, } = require('@discordjs/builders')
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads module 44.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(Interaction, client) {

        // if (!Interaction.member.id === '909535714767671346') return;

        await Interaction.reply({ content: '<a:GreenTick:984501363436294164> *Module Successfully Reloaded.*' })
    },
}