const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription(`Get detailed information on a user.`)
        .addUserOption(option => option.setName('user').setDescription('The user you want to get info for.').setRequired(true)),


    async execute(Interaction, client) {

        const user = Interaction.options.getUser('user') || Interaction.author;
        const member = Interaction.guild.members.cache.get(user.id);

        const Response = new MessageEmbed()
            .setAuthor({ name: `${user.username}`, iconURL: `${user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setThumbnail(`${user.avatarURL({ dynamic: true, size: 512 })}`)
            .setColor('#ff634a')
            .addFields({ name: "User ID", value: `${user.id}`, inline: false },
                { name: "Roles", value: `${member.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}` },
                { name: "Server Member Since", value: `${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\n**==>** ${moment(member.joinedAt).startOf('day').fromNow()}` },
                { name: "Discord User Since", value: `${moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\n**==>** ${moment(user.createdAt).startOf('day').fromNow()}` })

        Interaction.reply({ embeds: [Response] });
    }
}
