const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');
const warningSchema = require('../../schemas.js/warnSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription(`Activate the guild's warning system.`)
        .addSubcommand((subcommand =>
            subcommand
                .setName('warn-add')
                .setDescription('Warn a user.')
                .addUserOption(option => option.setName('user').setDescription('The user you would like to warn.').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('Please provide the reason you wish to warn this user.').setRequired(true),)))
        .addSubcommand((subcommand =>
            subcommand
                .setName('warn-check')
                .setDescription('Check how many warnings a user has.')
                .addUserOption(option => option.setName('user').setDescription('The user you would like to check the amount of warnings of.').setRequired(true),)))
        .addSubcommand((subcommand =>
            subcommand
                .setName('warn-remove')
                .setDescription('Remove a warning from a specific user.')
                .addUserOption(option => option.setName('user').setDescription('The user you would like to remove a warning for.').setRequired(true),)))
        .addSubcommand((subcommand =>
            subcommand
                .setName('warn-clear')
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
            if (memberUser.id === client.user.id) return Interaction.reply({ content: `You can not give me a warning. You don't want to know what happens if you do that.` });
            if (!memberUser.kickable) Interaction.reply({ content: `I can not warn that user. They may have higher perms than you or I.` });

            const dmEmbed = new MessageEmbed()
                .setDescription(`:x: You have been **warned** in ${Interaction.guild.name} | ${reason}`)
                .setColor('#ff634a')
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                .setTimestamp()

            const embed = new MessageEmbed()
                .setAuthor(({ name: `${memberUser.user.tag}`, iconURL: `${memberUser.user.displayAvatarURL({ dynamic: true, size: 512 })}` }))
                .setDescription(`:white_check_mark: ${member} has been **WARNED** and also given the **\'Warned\'** role. | ${reason}`)
                .setColor('#ff634a')
                // .setFooter({ text: `In ${memberUser.guild.name}`, iconURL: memberUser.guild.iconURL({ dynamic: true }) })
                .setTimestamp()

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

                await memberUser.roles.add(wr).then(member.send({ embeds: [dmEmbed] })).then(warnChannel.send({ embeds: [embed] }))

                Interaction.reply({ embeds: [embed], ephemeral: true });

            });

        } else if (sub === 'check') {
            warningSchema.findOne({ GuildID: Interaction.guild.id, UserID: member.id, UserTag: member.tag }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    Interaction.reply({
                        embeds: [new MessageEmbed()
                            .setTitle('Warnings Checked')
                            .setColor('GREEN')
                            .setDescription(`${data.Content.map(
                                (w, i) => `**ID**: ${i + 1}\n**By**: ${w.ExecutorTag}\n**Date**: ${w.Date}\n**Reason**: ${reason}\n}`
                            ).join(" ")}`)
                            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                            .setTimestamp()]
                    });
                } else {
                    Interaction.reply({
                        embeds: [new MessageEmbed()
                            .setTitle('<a:tlwHeartPoof:1068591805597225020> User Has No Warnings')
                            .setColor('BLURPLE')
                            .setDescription(`${member} | \`${memberUser}\` has been behaving themselves! They currently have no warnings.`)]
                    });
                }
            })
        } else if (sub === 'remove') {
            warningSchema.findOne({ GuildID: Interaction.guild.id, UserID: member.id, UserTag: member.tag }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    data.Content.slice(warnID, 1)
                    Interaction.reply({
                        embeds: [new MessageEmbed()
                            .setTitle('Warnings Removed')
                            .setColor('DARK_RED')
                            .setDescription(`${member}'s warning id: ${warnID + 1} has now been removed from the database.`)]
                    });
                    data.save()
                } else {
                    Interaction.reply({
                        embeds: [new MessageEmbed()
                            .setTitle('<a:tlwHeartPoof:1068591805597225020> This User Has No Warnings')
                            .setColor('GOLD')
                            .setDescription(`${member} | \`${memberUser}\` has been behaving themselves! They currently have no warnings.`)]
                    });
                }
            })
        } else if (sub === 'clear') {
            warningSchema.findOne({ GuildID: Interaction.guild.id, UserID: member.id, UserTag: member.tag }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    await warningSchema.findOne({ GuildID: Interaction.guild.id, UserID: member.id, UserTag: member.tag })
                    Interaction.reply({
                        embeds: [new MessageEmbed()
                            .setTitle('<a:GreenTick:984501363436294164> Warnings Have Been Successfully Cleared')
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
                            .setDescription(`${member} | \`${memberUser}\` has been behaving themselves! They currently have no warnings.`)]
                    })
                }
            })
        }
    },
};
