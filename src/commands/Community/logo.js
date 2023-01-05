const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('logo')
        .setDescription(`Provide the guild's (Server's) iconURL.`),

    async execute(Interaction, client) {

        var serverIcon = Interaction.guild.iconURL();

        const embed = new MessageEmbed()
            .setTitle(`${Interaction.guild.name}`)
            .setColor('#ff634a')
            .setImage(serverIcon)
            .addFields({ name: 'Server Owner:', value: `<@${Interaction.guild.ownerId}>`, inline: true },
                { name: 'Member Count', value: `${Interaction.guild.memberCount}`, inline: true })
            .setFooter({ text: `Requested by ${Interaction.user.username}`, iconURL: `${Interaction.user.avatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()


        await Interaction.reply({ embeds: [embed] })

    }
}