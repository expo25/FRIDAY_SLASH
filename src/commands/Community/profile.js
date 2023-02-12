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
                    .setEmoji('<a:GreenTick:984501363436294164>'),

                new MessageButton()
                    .setCustomId('role')
                    .setStyle('DANGER')
                    .setLabel('Role Info')
                    .setEmoji('<:role_CoOwnerIcon:1065823046956482681>')
            ]);

        let d_roleButton = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setCustomId('profile')
                    .setStyle('SUCCESS')
                    .setLabel('Profile Info')
                    .setEmoji('<a:GreenTick:984501363436294164>')
                    .setDisabled(true),

                new MessageButton()
                    .setCustomId('role')
                    .setStyle('DANGER')
                    .setLabel('Role Info')
                    .setEmoji('<:role_CoOwnerIcon:1065823046956482681>')
                    .setDisabled(true),
            ]);

        const profileEmbed = new MessageEmbed()
            // .setAuthor({ name: `${user.username}`, iconURL: `${user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setThumbnail(`${user.avatarURL({ dynamic: true, size: 512 })}`)
            .setColor('ff634a')
            .setTitle(`<a:arrow:1000482373386899557> **${user.username}'s PROFILE:**`)
            // .setDescription(`[User Avatar Link](${user.displayAvatarURL({ dynamic: true, size: 512 })})`)
            .addFields(
                { name: "Total Roles", value: `${member.roles.cache.size.toString() - 1}` },
                { name: "Server Member Since", value: `> \`${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\`\n> <a:vr_a_arrowright4:984836830312677377> ${moment(member.joinedAt).startOf('day').fromNow()}` },
                { name: "Discord User Since", value: `> \`${moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\`\n> <a:vr_a_arrowright4:984836830312677377> ${moment(user.createdAt).startOf('day').fromNow()}` },
                { name: 'Link to Avatar', value: `[Click Here](${user.displayAvatarURL({ dynamic: true, size: 512 })})`, inline: true },)
            .setFooter({ text: `User ID: ${user.id}`, iconURL: `${user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        // badge flags array NOTE -- This is not all the possilbe badges, just most common. 

        const badges = []
        if (user.flags.has("HOUSE_BALANCE")) badges.push("<:hypesquad_balance:814491283769786368>")
        if (user.flags.has("HOUSE_BRILLIANCE")) badges.push("<:hypesquad_brilliance:1065838434251452577>")
        if (user.flags.has("HOUSE_BRAVERY")) badges.push("<:hypesquad_bravery:814491294696341524>");
        if (user.flags.has("VERIFIED_BOT")) badges.push("<:verified_bot:1065838706763763806>");
        if (user.flags.has("EARLY_VERIFIED_BOT_DEVELOPER")) badges.push("<:bot_badge:1065845939627106307>");
        if (user.flags.has("HYPESQUAD_EVENTS")) badges.push("<:hypesquad_events:1065838480741105715>");
        if (user.flags.has("DISCORD_CERTIFIED_MODERATOR")) badges.push("<:icon_CertifiedModerator:1065847288892751872>");
        if ((user.flags & 524288) == 524288) badges.push('<:bot:1066075032880685167>');
        if ((user.flags & 4194304) == 4194304) badges.push('<:activedev:1065838570377584740>'); // Active Devleoper enumeration member number (Couldn't figure out how to get it in the array )

        profileEmbed.addFields({ name: 'Profile Badges', value: badges.join(' | ') || "None", inline: true })

        // if the user does not have any badges, display 'None' in the field.

        if (data.banner) {
            let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
            url = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${url}`;
            profileEmbed.addFields({ name: 'Link to Banner', value: `[Click Here](${url})` })
            profileEmbed.setImage(`${url}`)
        };

        if (!member.user.bot) {
            profileEmbed.addFields({ name: 'Is this user a BOT?', value: '<a:Toggleoff:1064741372390813737>', inline: true })
        } else {
            profileEmbed.addFields({ name: 'Is this user a BOT?', value: '<a:Toggleon:1064741457539387462>', inline: true })
        };

        if (Interaction.guild.members.fetch(user.id)) {
            profileEmbed.addFields({ name: 'Is this user in our server?', value: '<a:Toggleon:1064741457539387462>', inline: true })
        } else {
            profileEmbed.addFields({ name: 'Is this user in our server?', value: '<a:Toggleoff:1064741372390813737>', inline: true })
        };

        if (member.nickname) {
            profileEmbed.addFields({ name: 'Does this user have a nickname?', value: '<a:Toggleon:1064741457539387462>', inline: true })
        } else {
            profileEmbed.addFields({ name: 'Does this user have a nickname?', value: '<a:Toggleoff:1064741372390813737>', inline: true })
        }

        const roleEmbed = new MessageEmbed()
            .setAuthor({ name: `${user.username}`, iconURL: `${user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setColor('DARK_RED')
            .setDescription(`**${user} - Server Roles:**`)
            .addFields({
                name: '\u200b', value: `${member.roles.cache.sorted((x, y) => {
                    return y.option - x.option;
                }).map((role) => {
                    return `${role} - ${role.id}`
                }).join(`\n`).replace((Interaction.guild.roles.everyone.id, " ")).replace("@everyone - ", " ")}`
            })
            .setFooter({ text: `Total Roles: ${member.roles.cache.size.toString() - 1}`, iconURL: `${user.displayAvatarURL({ dynamic: true, size: 512 })}` })
        // .setTimestamp()

        await Interaction.reply({ embeds: [profileEmbed], components: [roleButton] });

        const filter = i => i.user.id === Interaction.user.id;

        const collector = await Interaction.channel.createMessageComponentCollector({ filter: filter, time: 1000 * 200 });

        collector.on('collect', async (i) => {

            if (i.customId === "role") {
                await i.deferUpdate().catch(e => { })
                i.editReply({ embeds: [roleEmbed] })
            } else if (i.customId === "profile") {
                await i.deferUpdate().catch(e => { })
                i.editReply({ embeds: [profileEmbed] })
            };
        });

        collector.on('end', () => {
            Interaction.editReply({ embeds: [profileEmbed], components: [d_roleButton] })
        })
    },
};
