const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, PermissionOverwriteManager } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rb1')
        .setDescription('Test')
        .addChannelOption(option => option.setName('channel').setDescription('The channel to the send the message to.').setRequired(true))
        .setDefaultMemberPermissions(PermissionOverwriteManager.Administrator),

    async execute(Interaction, client) {

        if (!Interaction.member.id === '909535714767671346') return;

        const channel = Interaction.options.getChannel('channel');

        const embed = new MessageEmbed()
            .setColor('#ff634a')
            .setTitle('🔗 USEFUL LINKS')
            .addFields({ name: `\u200b`, value: `>>> **╭✧ War Weight Calculator**\n**╰✧ [Click Here](https://www.allclash.com/upgrade-priority-for-clan-wars/)**` },
                { name: `\u200b`, value: `>>> **╭✧ The War Weight X.5 Strategy**\n**╰✧ [Click Here](https://clashofclans.fandom.com/wiki/Infinity323%27s_Strategy_Guides/War_Weight_and_X.5)**` },
                { name: `\u200b`, value: `>>> **╭✧ Clash of Stats: For APPLE**\n**╰✧ [Click Here](https://apps.apple.com/us/app/clash-of-stats/id1546458325)**` },
                { name: `\u200b`, value: `>>> **╭✧ Clash of Stats: For ANDROID**\n**╰✧ [Click Here](https://play.google.com/store/apps/details?id=com.clashofstats)**`},
                { name: `\u200b`, value: `>>> **╭✧ Video Compress App (Compress below 8MB)**\n**╰✧ [Click Here](https://apps.apple.com/gb/app/video-compress-shrink-video/id1163846234)**`},
                { name: `\u200b`, value: `>>> **╭✧ CWL Medal Info By League**\n**╰✧ [Click Here](https://clashofclans.fandom.com/wiki/Clan_War_Leagues)**`})
            // .setFooter({ text: Interaction.guild.name, iconURL: Interaction.guild.iconURL({ dynamic: true }) })

        channel.send({ embeds: [embed] });

        await Interaction.reply({ content: 'I sent your message successfully.', ephemeral: true }).catch((err) => {
            throw err;
        });
    },
};

// 'https://zapquaker.netlify.app/'

// '╭✧'

// '╰✧'