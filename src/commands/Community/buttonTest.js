const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, PermissionOverwriteManager, MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button-test')
        .setDescription(`test`)
        .setDefaultMemberPermissions(PermissionOverwriteManager.ManageServer),

    async execute(Interaction, client) {

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('test')
                    .setLabel('Primary')
                    .setStyle('PRIMARY')
                    .setEmoji('a:vr_a_Infinity1:871615002027626497')
            );

        const embed = new MessageEmbed()
            .setColor('AQUA')
            .setTitle('Test')
            .setURL('https://google.com')
            .setDescription('Another test')

        await Interaction.reply({ content: "Test Succeeded.", ephemeral: true, components: [row], embeds: [embed] })

        const filter = i => i.user.id === Interaction.user.id;

        const collector = Interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            if (i.customId === 'test') {
                await i.deferUpdate();
                await wait(1000);
                await i.editReply({ content: 'The reply finally worked.' })
            }
        });

        collector.on('end', collected => console.log(`Collected ${collected.size} items.`));

    }
}