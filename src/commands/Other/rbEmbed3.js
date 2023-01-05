const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, PermissionOverwriteManager } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rb3')
        .setDescription('Test')
        .addChannelOption(option => option.setName('channel').setDescription('The channel to the send the message to.').setRequired(true))
        .setDefaultMemberPermissions(PermissionOverwriteManager.Administrator),

    async execute(Interaction, client) {

        if (!Interaction.member.id === '909535714767671346') return;

        const channel = Interaction.options.getChannel('channel');

        const embed = new MessageEmbed()
            .setColor('#ff634a')
            .setTitle('<a:GreenTick:984501363436294164> OUR CLAN & SERVER LINKS')
            .addFields({ name: `\u200b`, value: `>>> **<a:vr_a_purplestar:984838501440815175> Our Discord Server**\n**╰✩ [Click Here](https://discord.gg/swuhJt7MwH)**` },
                { name: `\u200b`, value: `>>> **<a:arrow:1000482373386899557> The Rocking Boy**\n**╰✧ [Click Here](https://link.clashofclans.com/en?action=OpenClanProfile&tag=PGJPVLQ0)**` },
                { name: `\u200b`, value: `>>> **<a:arrow:1000482373386899557> Royal Tiger**\n**╰✧ [Click Here](https://link.clashofclans.com/en?action=OpenClanProfile&tag=20P8JRYJP)**` },
                { name: `\u200b`, value: `>>> **<a:arrow:1000482373386899557> Spill Knights**\n**╰✧ [Click Here](https://link.clashofclans.com/en?action=OpenClanProfile&tag=P82Q9RY0)**` },
                { name: `\u200b`, value: `>>> **<a:arrow:1000482373386899557> 半生尘缘 - Chinese Clan**\n**╰✧ [Click Here](https://link.clashofclans.com/en?action=OpenClanProfile&tag=CGUGL8VQ)**` })
            // .setFooter({ text: Interaction.guild.name, iconURL: Interaction.guild.iconURL({ dynamic: true }) })

            channel.send({ embeds: [embed] });

    await Interaction.reply({ content: 'I sent your message successfully.', ephemeral: true }).catch((err) => {
        throw err;
    });
},
};
