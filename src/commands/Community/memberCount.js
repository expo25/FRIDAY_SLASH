const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('member-count')
        .setDescription(`Provide the guild's (Server's) total memberCount.`),

    async execute(Interaction, client) {

        const users = Interaction.guild.members.cache.filter(member => !member.user.bot).size; // Total members in server (Humans)
        const bots = Interaction.guild.members.cache.filter(member => member.user.bot).size; // Total bots in server

        const embed = new MessageEmbed()
            .setColor('#ff634a')
            .setTitle('Total Server Members')
            .setDescription(`${Interaction.guild.memberCount}`)
            .setFooter({ text: `${Interaction.guild.name}'s Totals`, iconURL: `${Interaction.guild.iconURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        const humanEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Total Humans')
            .setDescription(`**${users}**`)
            .setFooter({ text: `Brought to you by ${client.user.username}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true, size: 512 })}` })

        const botEmbed = new MessageEmbed()
            .setColor('DARK_RED')
            .setTitle('Total Bots')
            .setDescription(`**${bots}**\n\nThis does ***not*** include <@938890446099325008> OR <@694348401529061406> `)
            .setFooter({ text: `Brought to you by ${client.user.username}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true, size: 512 })}` })

        const endEmbed = new MessageEmbed()
            .setColor('#ff634a')
            .setDescription('If you are looking at this screen, that means it is time to use the command again, dumbass. Pay attention.')
            .setFooter({ text: `Brought to you by ${client.user.username}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true, size: 512 })}` })

        const button = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setStyle('SECONDARY')
                    .setCustomId('home')
                    .setLabel('Total')
                    .setEmoji('<a:GreenTick:984501363436294164>'),
                new MessageButton()
                    .setStyle('SUCCESS')
                    .setCustomId('human')
                    .setLabel('Humans')
                    .setEmoji('<a:exit:1009945477254479933>'),
                new MessageButton()
                    .setStyle('DANGER')
                    .setCustomId('bot')
                    .setLabel('Bots')
                    .setEmoji('<a:bot_dev:1095181683277443073>')
            ]);

        const d_button = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setStyle('SECONDARY')
                    .setCustomId('home')
                    .setLabel('Total')
                    .setEmoji('<a:GreenTick:984501363436294164>')
                    .setDisabled(true),
                new MessageButton()
                    .setStyle('SUCCESS')
                    .setCustomId('human')
                    .setLabel('Humans')
                    .setEmoji('<a:exit:1009945477254479933>')
                    .setDisabled(true),
                new MessageButton()
                    .setStyle('PRIMARY')
                    .setCustomId('bot')
                    .setLabel('Bots')
                    .setEmoji('<a:bot_dev:1095181683277443073>')
                    .setDisabled(true),
            ]);

        await Interaction.reply({ embeds: [embed], components: [button] })

        const filter = i => i.user.id === Interaction.user.id;

        const collector = await Interaction.channel.createMessageComponentCollector({ filter: filter, time: 1000 * 200 });

        collector.on('collect', async (i) => {

            if (i.customId === 'home') {
                await i.deferUpdate().catch(e => { })
                i.editReply({ embeds: [embed] })
            } else if (i.customId === 'bot') {
                await i.deferUpdate().catch(e => { })
                i.editReply({ embeds: [botEmbed] })
            } else if (i.customId == 'human') {
                await i.deferUpdate().catch(e => { })
                i.editReply({ embeds: [humanEmbed] })
            }
        });

        collector.on('end', () => {
            Interaction.editReply({ embeds: [endEmbed], components: [d_button] })
        })
    }
}