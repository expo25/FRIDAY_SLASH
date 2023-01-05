const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('membercount')
        .setDescription(`Provide the guild's (Server's) total memberCount.`),

    async execute(Interaction, client) {

        const embed = new MessageEmbed()
            .setColor('#ff634a')
            .addFields({ name: `Member Count (Including Bots)`, value: `${Interaction.guild.memberCount}`, inline: true })
            .setTimestamp()

        await Interaction.reply({ embeds: [embed] })
    }
}