const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn a user by sending them a custom DM.')
        .addUserOption(option => option.setName('user').setDescription('The user you would like to warn').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Please type the reason you wish to warn this user.').setRequired(true)),

    async execute(Interaction, client) {

        const member = Interaction.options.getUser('user');
        const memberUser = await Interaction.guild.members.cache.get(member.id);
        const bb = Interaction.guild.roles.cache.find(r => r.id === '952570074441584700'); //\ Fix to match your server's role id.
        const wr = Interaction.guild.roles.cache.find(r => r.id === '952633869612486666'); //\ Fix to match your server's role id.
        const warnChannel = await Interaction.guild.channels.cache.find(channel => channel.id === '1060376579672395836') //\ Fix to match your server's channel id. 

        let reason = Interaction.options.getString('reason') || 'No reason given.'

        if (!Interaction.member.permissions.has("KICK_MEMBERS")) return Interaction.reply({ content: "You are unauthorized to execute that command. **Missing permissions | \`KICK_MEMBERS\`.**" });
        if (!Interaction.guild.me.permissions.has("KICK_MEMBERS")) return Interaction.reply({ content: "I do not have permission to use this command. You must give me the **\`KICK_MEMBERS\`.** permission." });
        if (Interaction.member.id === member.id) return Interaction.reply({ content: "You can not give yourself a warning. Nice try." });
        if (memberUser.roles.cache.has(bb.id)) return Interaction.reply({ content: 'You can not warn a bot. How would that even make sense?' });
        if (memberUser.roles.cache.has(wr.id)) return Interaction.reply({ content: 'This user already has the \`WARNED\` role. I will not send them another message.' });
        if (memberUser.id === client.user.id) return Interaction.reply({ content: `You can not give me a warning. You don't want to know what happens if you do that.` });
        if (!memberUser.kickable) Interaction.reply({ content: `I can not warn that user. They may have higher perms than you or I.` });
        if (!memberUser) return Interaction.reply({ content: 'The user you mentioned is no longer in the server.' }); //Don't need with slash commands bc it won't show the user as an option if they aren't in the server.
        // if(!member.kickable) return Interaction.reply({ content: "I can not warn this user, I am permission restricted.", ephemeral: true });

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

        // If the user has higher perms or is the bot, don't give the role.

        if (!memberUser.kickable || memberUser.id === client.user.id) {

            return;

        }

        if (!memberUser.roles.cache.has(wr.id)) {

            //if the user does not have a new role, add the 'Warned' role.

            await memberUser.roles.add(wr);

            warnChannel.send({ embeds: [embed] })

        } else {

            return;

        };

        Interaction.reply({ embeds: [embed] })
        member.send({ embeds: [dmEmbed] }).catch(err => { console.log("This user has blocked the ability to receive DMs from this server. I am unable to send the message you specified.") })
    },
};
