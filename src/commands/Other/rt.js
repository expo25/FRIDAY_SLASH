const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rt')
        .setDescription('Royal Tiger clan info + link.'),

    async execute(Interaction, client) {

        const embed = new MessageEmbed()
            .setColor('DARK_ORANGE')
            .setTitle('ROYAL TIGER™')
            .setDescription('**[CLICK HERE FOR LINK](https://link.clashofclans.com/en?action=OpenClanProfile&tag=20P8JRYJP)**')
            .addFields({ name: 'Clan Name', value: 'Royal Tiger' },
                { name: 'Clan Level', value: '15' },
                { name: 'Tag', value: '#20P8JRYJP' },
                { name: 'Clan War League', value: '<:vrCWLChampionIII:1074808097408815104> Champion League Ⅲ' },
                { name: 'Capital Hall Level', value: '10' },
                { name: 'Location', value: 'International' })
            .setImage('https://cdn.discordapp.com/attachments/930679082784538704/1074809273734926426/RT.png')
            // .setThumbnail('https://cdn.discordapp.com/attachments/930679082784538704/1064678434644701244/tigerLogo.png')
            .setFooter({ text: Interaction.guild.name, iconURL: Interaction.guild.iconURL() })

        await Interaction.reply({ embeds: [embed] });
    },
};