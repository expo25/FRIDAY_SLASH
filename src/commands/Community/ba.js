const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ba')
        .setDescription('BLACK ARTILLERY™ Clan Link.'),

        async execute(Interaction, client) {
            const newEmbed = new MessageEmbed()
            .setTitle('BLACK ARTILLERY™ #2YUO28CUU')
            .setURL('https://link.clashofclans.com/en?action=OpenClanProfile&tag=2YU028CUU')
            //.setDescription('Click the link above to navigate to the clan in-game.')
            .setColor('#ff634a')
            //.setThumbnail('https://cdn.discordapp.com/attachments/960951293436919828/1004863547240628325/BLACK-ARTILIRY-LOGO-ICON.png')
            //.setTimestamp()
            .setFooter({ text: 'Click the link to navigate to the clan in-game.', iconURL: Interaction.guild.iconURL() });

       await Interaction.reply({ embeds: [newEmbed]})
}
}