const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');
const { i } = require('mathjs');
const warningSchema = require('../../schemas.js/warnSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription(`Activate the guild's warning system.`)
        .addSubcommand((subcommand =>
            subcommand
                .setName('add')
                .setDescription('Warn a user.')
                .addUserOption(option => option.setName('user').setDescription('The user you would like to warn.').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('Please provide the reason you wish to warn this user.').setRequired(true),)))
        .addSubcommand((subcommand =>
            subcommand
                .setName('check')
                .setDescription('Check how many warnings a user has.')
                .addUserOption(option => option.setName('user').setDescription('The user you would like to check the amount of warnings of.').setRequired(true),)))
        .addSubcommand((subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove a warning from a specific user.')
                .addUserOption(option => option.setName('user').setDescription('The user you would like to remove a warning for.').setRequired(true))
                .addNumberOption(option => option.setName('warnid').setDescription('Provide the warning ID.').setRequired(true),)))
        .addSubcommand((subcommand =>
            subcommand
                .setName('clear')
                .setDescription(`Clear all of a specific user's warnings.`)
                .addUserOption(option => option.setName('user').setDescription('The user you would like to clear warnings for.').setRequired(true),))),

    async execute(Interaction, client) {

        const sub = Interaction.options.getSubcommand(["add", "check", "remove", "clear"]);

        const member = Interaction.options.getUser('user');
        const memberUser = await Interaction.guild.members.cache.get(member.id);
        const bb = Interaction.guild.roles.cache.find(r => r.id === '952570074441584700'); //\ Fix to match your server's role id.
        const wr = Interaction.guild.roles.cache.find(r => r.id === '952633869612486666'); //\ Fix to match your server's role id.
        const warnChannel = await Interaction.guild.channels.cache.find(channel => channel.id === '1060376579672395836') //\ Fix to match your server's channel id.
        const warnID = Interaction.options.getNumber("warnid") - 1;
        const reason = Interaction.options.getString('reason') || 'No reason given.'
        const warnDate = new Date(Interaction.createdTimestamp).toLocaleDateString();

        if (sub === 'add') {

            if (!Interaction.member.permissions.has("KICK_MEMBERS")) return Interaction.reply({ content: "You are unauthorized to execute that command. **Missing permissions | \`KICK_MEMBERS\`.** Don't be a fool." });
            if (!Interaction.guild.me.permissions.has("KICK_MEMBERS")) return Interaction.reply({ content: "I do not have permission to use this command. You must give me the **\`KICK_MEMBERS\`.** permission." });
            if (Interaction.member.id === member.id) return Interaction.reply({ content: "You can not give yourself a warning. Are you out of your mind?" });
            if (memberUser.roles.cache.has(bb.id)) return Interaction.reply({ content: 'You can not warn a bot. How would that even make sense?' });
            if (memberUser.id == client.user.id) return Interaction.reply({ content: `You can not give me a warning. You don't want to know what happens if you do that.` });
            if (!memberUser.kickable) Interaction.reply({ content: `I can not warn that user. They may have higher perms than you or I.` });

            const dmEmbed1 = new MessageEmbed()
                .setDescription(`<a:X_:1009946137068851211> You have been **warned** for the **\`1st Time\`** in ${Interaction.guild.name} | ${reason}`)
                .setColor('#ff634a')
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                .setTimestamp()

            // Embed to send the user if this is the user's 1st warning.

            const embed1 = new MessageEmbed()
                .setAuthor(({ name: `${memberUser.user.tag}`, iconURL: `${memberUser.user.displayAvatarURL({ dynamic: true, size: 512 })}` }))
                .setDescription(`<a:GreenTick:984501363436294164> ${member} has been warned for the **\`1st Time\`** and also given the **\'Warned\'** role. | ${reason}`)
                .setColor('#ff634a')
                .setFooter({ text: `${Interaction.guild.name}`, iconURL: Interaction.guild.iconURL({ dynamic: true, size: 512 }) })
                .setTimestamp()

            // Embed that replies to the interaction if this is the user's 1st warning.

            const dmEmbed2 = new MessageEmbed()
                .setDescription(`<a:X_:1009946137068851211> You have been **warned** for the **\`2nd Time\`**. 1 more warning and you will be kicked from ${Interaction.guild.name} | ${reason}`)
                .setColor('#ff634a')
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                .setTimestamp()

            // Embed to send the user if this is the user's 2nd warning

            const embed2 = new MessageEmbed()
                .setAuthor(({ name: `${memberUser.user.tag}`, iconURL: `${memberUser.user.displayAvatarURL({ dynamic: true, size: 512 })}` }))
                .setDescription(`<a:GreenTick:984501363436294164> ${member} has been warned for the **\`2nd Time\`** If they are warned 1 more time, I will show them the door. | ${reason}`)
                .setColor('#ff634a')
                .setFooter({ text: `${Interaction.guild.name}`, iconURL: Interaction.guild.iconURL({ dynamic: true, size: 512 }) })
                .setTimestamp()

            // Embed that replies to the interaction if this is the user's 2nd warning.

            const dmEmbed3 = new MessageEmbed()
                .setDescription(`<a:X_:1009946137068851211> You have been **warned** for the **\`3rd & Final Time\`** and have now been kicked from ${Interaction.guild.name}! SEE YA! | ${reason}`)
                .setColor('#ff634a')
                .setThumbnail('https://discord.com/assets/4d1ed1d5abee26793b4c287b9896cd56.svg')
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                .setTimestamp()

            // Embed to send the user if this is the user's 3rd & final warning. This is a placeholder for now; sometimes members can't receive DMs upon kicks.

            const embed3 = new MessageEmbed()
                .setAuthor(({ name: `${memberUser.user.tag}`, iconURL: `${memberUser.user.displayAvatarURL({ dynamic: true, size: 512 })}` }))
                .setDescription(`<a:GreenTick:984501363436294164> ${member} has been warned for the **\`3rd & Final Time\`**. I have now sent them packing. Bye-bye! | ${reason}`)
                .setColor('#ff634a')
                .setThumbnail('https://discord.com/assets/4d1ed1d5abee26793b4c287b9896cd56.svg')
                .setFooter({ text: `${Interaction.guild.name}`, iconURL: Interaction.guild.iconURL({ dynamic: true, size: 512 }) })
                .setTimestamp()

            // Embed that replies to the interaction if this is the user's 3rd warning.

            warningSchema.findOne({ GuildID: Interaction.guild.id, UserID: member.id, UserTag: member.tag }, async (err, data) => {
                if (err) throw err;
                if (!data) {
                    data = new warningSchema({
                        GuildID: Interaction.guild.id,
                        UserID: member.id,
                        UserTag: member.tag,
                        Content: [
                            {
                                ExecutorID: Interaction.user.id,
                                ExecutorTag: Interaction.user.tag,
                                Reason: reason,
                                Date: warnDate
                            }
                        ],
                    })
                } else {
                    const obj = {
                        ExecutorID: Interaction.user.id,
                        ExecutorTag: Interaction.user.tag,
                        Reason: reason,
                        Date: warnDate
                    }
                    data.Content.push(obj)
                }
                data.save()

                if (data.Content.length == '1') {
                    await Interaction.reply({ embeds: [embed1], ephemeral: true }).then(
                        memberUser.roles.add(wr)).then(
                            member.send({ embeds: [dmEmbed1] })).then(
                                warnChannel.send({ embeds: [embed1] }));

                } else if (data.Content.length == '2') {
                    await Interaction.reply({ embeds: [embed2], ephemeral: true }).then(
                        member.send({ embeds: [dmEmbed2] })).then(
                            warnChannel.send({ embeds: [embed2] }));

                } else if (data.Content.length == '3') {
                    await Interaction.reply({ embeds: [embed3], ephemeral: true }).then(
                        memberUser.kick()).then(warnChannel.send({ embeds: [embed3] }));
                }
            });

        } else if (sub === 'check') {
            warningSchema.findOne({ GuildID: Interaction.guild.id, UserID: member.id, UserTag: member.tag }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    Interaction.reply({
                        embeds: [new MessageEmbed()
                            .setTitle(`Total Warnings`)
                            .setColor('GREEN')
                            .setDescription(`${data.Content.map(
                                (w, i) => `**Warning Number**: ${i + 1}\n**Warned By**: ${w.ExecutorTag}\n**Date**: ${w.Date}\n**Reason**: ${reason}\n`
                            ).join(" ")}`)
                            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                            .setTimestamp()]
                    });
                } else {
                    Interaction.reply({
                        embeds: [new MessageEmbed()
                            .setTitle('<a:tlwHeartPoof:1068591805597225020> User Has No Warnings')
                            .setColor('BLURPLE')
                            .setDescription(`${member} has been behaving themselves! They currently have no warnings.`).setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                            .setTimestamp()]
                    });
                }
            })
        } else if (sub === 'remove') {

            if (!Interaction.member.permissions.has("KICK_MEMBERS")) return Interaction.reply({ content: "You are unauthorized to execute that command. **Missing permissions | \`KICK_MEMBERS\`.** Don't be a fool." });
            if (!Interaction.guild.me.permissions.has("KICK_MEMBERS")) return Interaction.reply({ content: "I do not have permission to use this command. You must give me the **\`KICK_MEMBERS\`.** permission." });
            if (Interaction.member.id === member.id) return Interaction.reply({ content: "You can not give yourself a warning. Are you out of your mind?" });
            if (memberUser.roles.cache.has(bb.id)) return Interaction.reply({ content: 'You can not warn a bot. How would that even make sense?' });
            if (memberUser.id == client.user.id) return Interaction.reply({ content: `You can not give me a warning. You don't want to know what happens if you do that.` });
            if (!memberUser.kickable) Interaction.reply({ content: `I can not warn that user. They may have higher perms than you or I.` });

            warningSchema.findOne({ GuildID: Interaction.guild.id, UserID: member.id, UserTag: member.tag }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    data.Content.splice(warnID, 1)
                    Interaction.reply({
                        embeds: [new MessageEmbed()
                            .setTitle('Warnings Removed')
                            .setColor('DARK_RED')
                            .setDescription(`${member}'s warning id: ${warnID + 1} has now been removed from the database.`)
                            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                            .setTimestamp()]
                    });
                    data.save()
                } else {
                    Interaction.reply({
                        embeds: [new MessageEmbed()
                            .setTitle('<a:tlwHeartPoof:1068591805597225020> This User Has No Warnings')
                            .setColor('GOLD')
                            .setDescription(`${member} has been behaving themselves! They currently have no warnings.`)
                            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                            .setTimestamp()]
                    });
                }
            })
        } else if (sub === 'clear') {

            if (!Interaction.member.permissions.has("KICK_MEMBERS")) return Interaction.reply({ content: "You are unauthorized to execute that command. **Missing permissions | \`KICK_MEMBERS\`.** Don't be a fool." });
            if (!Interaction.guild.me.permissions.has("KICK_MEMBERS")) return Interaction.reply({ content: "I do not have permission to use this command. You must give me the **\`KICK_MEMBERS\`.** permission." });
            if (Interaction.member.id === member.id) return Interaction.reply({ content: "You can not give yourself a warning. Are you out of your mind?" });
            if (memberUser.roles.cache.has(bb.id)) return Interaction.reply({ content: 'You can not warn a bot. How would that even make sense?' });
            if (memberUser.id == client.user.id) return Interaction.reply({ content: `You can not give me a warning. You don't want to know what happens if you do that.` });
            if (!memberUser.kickable) Interaction.reply({ content: `I can not warn that user. They may have higher perms than you or I.` });

            warningSchema.findOneAndDelete({ GuildID: Interaction.guild.id, UserID: member.id, UserTag: member.tag }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    await warningSchema.findOne({ GuildID: Interaction.guild.id, UserID: member.id, UserTag: member.tag })
                    Interaction.reply({
                        embeds: [new MessageEmbed()
                            .setTitle('<a:GreenTick:984501363436294164> Warnings Cleared')
                            .setColor('GREEN')
                            .setDescription(`${member}'s warnings have been successfully cleared from the database.`)
                            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                            .setTimestamp()]
                    })
                } else {
                    Interaction.reply({
                        embeds: [new MessageEmbed()
                            .setTitle('<a:tlwHeartPoof:1068591805597225020> This User Has No Warnings')
                            .setColor('GOLD')
                            .setDescription(`${member} has been behaving themselves! They currently have no warnings.`)]
                    })
                }
            })
        }
    },
};
