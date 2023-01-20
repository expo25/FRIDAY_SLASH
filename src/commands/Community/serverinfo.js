const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-stats')
        .setDescription('Provides detailed server information.'),

    async execute(Interaction, client) {

        const categorySize = Interaction.guild.channels.cache.filter((channel) => channel.type == "GUILD_CATEGORY").size;
        const voiceChannelSize = Interaction.guild.channels.cache.filter((channel) => channel.type == "GUILD_VOICE").size;
        const textChannelSize = Interaction.guild.channels.cache.filter((channel) => channel.type == "GUILD_TEXT").size;
        const newsChannelSize = Interaction.guild.channels.cache.filter((channel) => channel.type == "GUILD_NEWS").size;
        const stageVoiceSize = Interaction.guild.channels.cache.filter((channel) => channel.type == "GUILD_STAGE_VOICE").size;
        //const count = Interaction.guild.members.cache.filter(m => m.roles.cache.contains('963193440756199464')).size;
        const users = Interaction.guild.members.cache.filter(member => !member.user.bot).size;
        const bots = Interaction.guild.members.cache.filter(member => member.user.bot).size;

        const embed = new MessageEmbed()
            .setColor('#ff634a')
            .setAuthor({ name: `${Interaction.guild.name} Stats`, iconURL: `${Interaction.guild.iconURL({ dynamic: true, size: 512 })}` })
            .addFields({ name: `Server Name`, value: Interaction.guild.name, inline: true },
                { name: `Server Owner`, value: `<@${Interaction.guild.ownerId}>`, inline: true },
                { name: `Server ID`, value: Interaction.guild.id, inline: true },
                { name: `Server Members`, value: `${users}`, inline: true },
                { name: 'Server Bots', value: `${bots}`, inline: true },
                { name: `Text Channels`, value: textChannelSize.toString(), inline: true },
                { name: `Voice Channels`, value: voiceChannelSize.toString(), inline: true },
                { name: `Categories`, value: categorySize.toString(), inline: true },
                { name: `Stage Voice`, value: stageVoiceSize.toString(), inline: true },
                { name: `Roles`, value: Interaction.guild.roles.cache.size.toString(), inline: true },
                { name: `Emojis`, value: Interaction.guild.emojis.cache.size.toString(), inline: true })
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
            .setThumbnail(Interaction.guild.iconURL({ dynamic: true }))
            .setTimestamp()

        if (newsChannelSize >= 1) {
            embed.addFields({ name: `News Channels`, value: newsChannelSize, inline: true });
        }

        embed.addFields({ name: `Server icon URL`, value: `[Click Here](${Interaction.guild.iconURL({ dynamic: true })})` });

        Interaction.reply({ embeds: [embed] });

    }
}
