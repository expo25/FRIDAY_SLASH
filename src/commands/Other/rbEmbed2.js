const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, PermissionOverwriteManager } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rb2')
        .setDescription('Test')
        .addChannelOption(option => option.setName('channel').setDescription('The channel to the send the message to.').setRequired(true))
        .setDefaultMemberPermissions(PermissionOverwriteManager.Administrator),

    async execute(Interaction, client) {

        if (!Interaction.member.id === '909535714767671346') return;

        const channel = Interaction.options.getChannel('channel');

        const embed = new MessageEmbed()
            .setColor('#ff634a')
            .setTitle('⚔️ ATTACKING / BASE DEVELOPMENT GUIDES')
            .addFields({ name: `\u200b`, value: `>>> **🎥 Base Development F2P: Kenny Jo YT**\n**╰•>> [Click Here](https://www.youtube.com/c/KennyJoGaming)**` },
                { name: `\u200b`, value: `>>> **📽️ Base Development: Judo Sloth (Receding Hairline)**\n**╰•>> [Click Here](https://www.youtube.com/c/JudoSloth)**` },
                { name: `\u200b`, value: `>>> **📺 Base Development: Clash Bash YT**\n**╰•>> [Click Here](https://www.youtube.com/c/ClashBashing1)**` },
                { name: `\u200b`, value: `>>> **🤺 Attacking: Lexnos YT**\n**╰•>> [Click Here](https://www.youtube.com/c/LexnosGaming)**` },
                { name: `\u200b`, value: `>>> **⚔️ Attacking: ClashWithEric YT**\n**╰•>> [Click Here](https://www.youtube.com/c/ClashwithEricOnehive)**` },
                { name: `\u200b`, value: `>>> **⭐ Attacking: HookedToClash YT**\n**╰•>> [Click Here](https://www.youtube.com/c/HookedToClash)**` },
                { name: `\u200b`, value: `>>> **🌟 Attacking: Itzu YT**\n**╰•>> [Click Here](https://www.youtube.com/channel/UCLKKvlo0yK8OgWvjCiZQ3sA)**` },
                { name: `\u200b`, value: `>>> **🚀 Attacking: MY Life Gaming YT**\n**╰•>> [Click Here](https://www.youtube.com/channel/UCzuatWwymtnW1QEYwCgEXmA/playlists)**` },
                { name: `\u200b`, value: `>>> **💎 FREE Bases: P2AK Gaming YT**\n**╰•>> [Click Here](https://www.youtube.com/c/P2akGaming)**` },
                { name: `\u200b`, value: `>>> **🥭 FREE Bases: Dr. Mango YT**\n**╰•>> [Click Here](https://www.youtube.com/c/DoctorMango1)**` })
        // .setFooter({ text: Interaction.guild.name, iconURL: Interaction.guild.iconURL({ dynamic: true }) })

        channel.send({ embeds: [embed] });

        await Interaction.reply({ content: 'I sent your message successfully.', ephemeral: true }).catch((err) => {
            throw err;
        });
    },
};
