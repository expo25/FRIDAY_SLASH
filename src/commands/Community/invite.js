const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Invite the bot to your server.'),

    async execute(interaction, client) {

        const embed = new MessageEmbed()
            .setColor('ff634a')
            .setTitle('Add F.R.I.D.A.Y to your Server')
            .setDescription('[Click Here](https://discord.com/api/oauth2/authorize?client_id=963589943593164880&permissions=0&scope=applications.commands%20bot)')
            .addFields({ name: 'F.R.I.D.A.Y is a multi-purpose Discord bot mainly used for Moderation & Auto-Moderation purposes. Click the link above to invite her to your server.', value: '\u200b' })
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()

        await interaction.reply({ embeds: [embed] }) //ephemeral: true })
    },
};