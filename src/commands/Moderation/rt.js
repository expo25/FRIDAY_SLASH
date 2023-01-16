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
                { name: 'Clan Level', value: '14' },
                { name: 'Tag', value: '20P8JRYJP' },
                { name: 'Clan War League', value: 'Master 1' },
                { name: 'Capital Hall Level', value: '10' },
                { name: 'Location', value: 'International' })
            .setImage('https://cdn.discordapp.com/attachments/930679082784538704/1064678544468365443/RT.png')
            .setThumbnail('https://cdn.discordapp.com/attachments/930679082784538704/1064678434644701244/tigerLogo.png')
            .setFooter({ text: `𝙍𝙊𝙔𝘼𝙇 𝙏𝙄𝙂𝙀𝙍™`, iconURL: `https://cdn.discordapp.com/attachments/930679082784538704/1064678434644701244/tigerLogo.png` })

        await Interaction.reply({ embeds: [embed] });
    },
};