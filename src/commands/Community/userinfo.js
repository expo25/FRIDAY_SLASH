const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const moment = require('moment');
const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription(`Get detailed information on a user.`)
        .addUserOption(option => option.setName('user').setDescription('The user you want to get info for.')),


    async execute(Interaction, client) {

        const user = Interaction.options.getUser('user') || Interaction.user;
        const member = Interaction.guild.members.cache.get(user.id);
        const data = await axios.get(`https://discord.com/api/users/${user.id}`, {
            headers: {
                Authorization: `Bot ${client.token}`
            }
        }).then(d => d.data);

        let roleButton = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setCustomId('profile')
                    .setStyle('SUCCESS')
                    .setLabel('Profile Info')
                    .setEmoji('<a:vr_a_purplestar:984838501440815175>'),

                new MessageButton()
                    .setCustomId('role')
                    .setStyle('SECONDARY')
                    .setLabel('Role Info')
                    .setEmoji('<a:loading:1029145887273922630>')
            ]);

        let d_roleButton = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setCustomId('profile')
                    .setStyle('SUCCESS')
                    .setLabel('Profile Info')
                    .setEmoji('<a:vr_a_purplestar:984838501440815175>')
                    .setDisabled(true),

                new MessageButton()
                    .setCustomId('role')
                    .setStyle('SECONDARY')
                    .setLabel('Role Info')
                    .setEmoji('<a:loading:1029145887273922630>')
                    .setDisabled(true),
            ]);

        const profileEmbed = new MessageEmbed()
            .setAuthor({ name: `${user.username}`, iconURL: `${user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setThumbnail(`${user.avatarURL({ dynamic: true, size: 512 })}`)
            .setColor('#ff634a')
            .setTitle(`<a:arrow:1000482373386899557> **${user.username}'s PROFILE:**`)
            .setDescription(`[User Avatar Link](${user.displayAvatarURL({ dynamic: true, size: 512 })})`)
            .addFields(
                { name: "Roles", value: `${member.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}` },
                { name: "> Server Member Since", value: `> ${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\n<a:vr_a_arrowright4:984836830312677377> ${moment(member.joinedAt).startOf('day').fromNow()}` },
                { name: "> Discord User Since", value: `> ${moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\n<a:vr_a_arrowright4:984836830312677377> ${moment(user.createdAt).startOf('day').fromNow()}` })
            .setFooter({ text: `User ID: ${user.id}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        if (data.banner) {
            let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
            url = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${url}`;
            profileEmbed.addFields({ name: 'User Banner Link', value: `[Link](${url})` })
            profileEmbed.setImage(`${url}`)
        };

        if (!member.user.bot) {
            profileEmbed.addFields({ name: 'Is this user a BOT?', value: '<a:Toggleoff:1064741372390813737>' })
        } else {
            profileEmbed.addFields({ name: 'Is this user a BOT?', value: '<a:Toggleon:1064741457539387462>' })
        };

        if (Interaction.guild.members.fetch(user.id)) {
            profileEmbed.addFields({ name: 'Is this user in our server?', value: '<a:Toggleon:1064741457539387462>' })
        } else {
            profileEmbed.addFields({ name: 'Is this user in our server?', value: '<a:Toggleoff:1064741372390813737>' })
        };



        Interaction.reply({ embeds: [profileEmbed] });
    },
};
