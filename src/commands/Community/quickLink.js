const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quick-link')
        .setDescription('Obtain links to any one of our family clans.')
        .addStringOption(option =>
            option
                .setName('clan')
                .setDescription('Select the clan you wish to obtain the link for.')
                .addChoices({ name: 'Soul Decimtation', value: 'SD' },
                    { name: 'Royal Tiger', value: 'RT' },
                    { name: 'The Rocking Boy', value: 'RB' },
                    { name: 'Spil Knights', value: 'SK' },
                    { name: 'Chinese Clan', value: 'CC' },
                    { name: 'Black Artillery', value: 'BA' })
                .setRequired(true)),

    async execute(Interaction, client) {

        const clan = Interaction.options.getString('clan')

        if (clan == 'SD') {

            const embed = new MessageEmbed()
                .setColor('#ff634a')
                .setTitle('SOUL DECIMATION')
                .setThumbnail('https://cdn.discordapp.com/emojis/1094336575858548758.webp?size=80&quality=lossless')
                .setDescription('[#8LQUPLY8](https://link.clashofclans.com/en?action=OpenClanProfile&tag=8LQUPLY8)\nRequired Trophies: <:trophy:1094324629423788112> 0\nLocation: <a:globe:1094325754998829259> International\n\nLeader: Ξxpo™ Lvl. 2\nLevel: 10\nCWL: <:CII:1093751117843804250> Champion League II')
                .setFooter({ text: `Requested By: ${Interaction.user.username}`, iconURL: `${Interaction.user.avatarURL({ dynamic: true, size: 512 })}` })

            const button = new MessageActionRow()
                .addComponents([
                    new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Open In-Game')
                        .setURL('https://link.clashofclans.com/en?action=OpenClanProfile&tag=8LQUPLY8')
                        .setEmoji('<a:Fire:984837033086312478>'),
                    new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Clash of Stats')
                        .setURL('https://www.clashofstats.com/clans/soul-decimation-8LQUPLY8/summary')
                        .setEmoji('<a:vr_a_arrowright4:984836830312677377>'),
                ]);

            await Interaction.reply({ embeds: [embed], components: [button] })
        }

        if (clan == 'RT') {

            const embed = new MessageEmbed()
                .setColor('#ff634a')
                .setTitle('ROYAL TIGER')
                .setThumbnail('https://cdn.discordapp.com/attachments/1092215028448501851/1093748091871580210/ROYAL-TIGER-LOGO-DISCORD.png')
                .setDescription('[#20P8JRYJP](https://link.clashofclans.com/en?action=OpenClanProfile&tag=20P8JRYJP)\nRequired Trophies: <:trophy:1094324629423788112> 0\nLocation: <a:globe:1094325754998829259> International\n\nLeader: Ragnar lothbor.\nLevel: 15\nCWL: <:CII:1093751117843804250> Champion League II\nWin Streak: <a:arrow:1000482373386899557>37')
                .setFooter({ text: `Requested By: ${Interaction.user.username}`, iconURL: `${Interaction.user.avatarURL({ dynamic: true, size: 512 })}` })

            const button = new MessageActionRow()
                .addComponents([
                    new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Open In-Game')
                        .setURL('https://link.clashofclans.com/en?action=OpenClanProfile&tag=20P8JRYJP')
                        .setEmoji('<a:vr_a_purplestar:984838501440815175>'),
                    new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Clash of Stats')
                        .setURL('https://www.clashofstats.com/clans/royal-tiger-20P8JRYJP/summary')
                        .setEmoji('<a:vr_a_arrowright4:984836830312677377>'),
                ]);

            await Interaction.reply({ embeds: [embed], components: [button] })

        }

        if (clan == 'RB') {

            const embed = new MessageEmbed()
                .setColor('#ff634a')
                .setTitle('THE ROCKING BOT')
                .setThumbnail('https://cdn.discordapp.com/emojis/1094330903356002454.webp?size=80&quality=lossless')
                .setDescription('[#PGJPVLQ0](https://link.clashofclans.com/en?action=OpenClanProfile&tag=%23PGJPVLQ0)\nRequired Trophies: <:trophy:1094324629423788112> 0\nLocation: <a:globe:1094325754998829259> International\n\nLeader: TheRockingBoy\nLevel: 18\nCWL: <:M1:1093760520244441170> Master League I\nWin Streak: <a:arrow:1000482373386899557>73')
                .setFooter({ text: `Requested By: ${Interaction.user.username}`, iconURL: `${Interaction.user.avatarURL({ dynamic: true, size: 512 })}` })

            const button = new MessageActionRow()
                .addComponents([
                    new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Open In-Game')
                        .setURL('https://link.clashofclans.com/en?action=OpenClanProfile&tag=%23PGJPVLQ0')
                        .setEmoji('<a:Fire:984837033086312478>'),
                    new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Clash of Stats')
                        .setURL('https://www.clashofstats.com/clans/royal-tiger-PGJPVLQ0/summary')
                        .setEmoji('<a:vr_a_arrowright4:984836830312677377>'),
                ]);

            await Interaction.reply({ embeds: [embed], components: [button] })

        }

        if (clan == 'CC') {

            const embed = new MessageEmbed()
                .setColor('#ff634a')
                .setTitle('CHINESE CLAN')
                .setThumbnail('https://cdn.discordapp.com/emojis/1094333200282681524.webp?size=80&quality=lossless')
                .setDescription('[#CGUGL8VQ](https://link.clashofclans.com/en?action=OpenClanProfile&tag=%23CGUGL8VQ)\nRequired Trophies: <:trophy:1094324629423788112> 0\nLocation: 🇬🇧 United Kingdom\n\nLeader: bullet-twonine\nLevel: 14\nCWL: <:Cry1:1093760853041479801> Crystal League II')
                .setFooter({ text: `Requested By: ${Interaction.user.username}`, iconURL: `${Interaction.user.avatarURL({ dynamic: true, size: 512 })}` })

            const button = new MessageActionRow()
                .addComponents([
                    new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Open In-Game')
                        .setURL('https://link.clashofclans.com/en?action=OpenClanProfile&tag=%23CGUGL8VQ')
                        .setEmoji('<a:Fire:984837033086312478>'),
                    new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Clash of Stats')
                        .setURL('https://www.clashofstats.com/clans/royal-tiger-CGUGL8VQ/summary')
                        .setEmoji('<a:vr_a_arrowright4:984836830312677377>'),
                ]);

            await Interaction.reply({ embeds: [embed], components: [button] })

        }

        if (clan == 'SK') {

            const embed = new MessageEmbed()
                .setColor('#ff634a')
                .setTitle('SPIL KNIGHTS')
                .setThumbnail('https://cdn.discordapp.com/emojis/1094333200282681524.webp?size=80&quality=lossless')
                .setDescription('[#P82Q9RY0](https://link.clashofclans.com/en?action=OpenClanProfile&tag=%23P82Q9RY0)\nRequired Trophies: <:trophy:1094324629423788112> 0\n<a:globe:1094325754998829259> International\n\nLeader: ΒυㄴㄴΞㅜ™\nLevel: 14\nCWL: <:M1:1093760520244441170> Master League III')
                .setFooter({ text: `Requested By: ${Interaction.user.username}`, iconURL: `${Interaction.user.avatarURL({ dynamic: true, size: 512 })}` })

            const button = new MessageActionRow()
                .addComponents([
                    new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Open In-Game')
                        .setURL('https://link.clashofclans.com/en?action=OpenClanProfile&tag=%23P82Q9RY0')
                        .setEmoji('<a:Fire:984837033086312478>'),
                    new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Clash of Stats')
                        .setURL('https://www.clashofstats.com/clans/royal-tiger-P82Q9RY0/summary')
                        .setEmoji('<a:vr_a_arrowright4:984836830312677377>'),
                ]);

            await Interaction.reply({ embeds: [embed], components: [button] })

        }
    }
}