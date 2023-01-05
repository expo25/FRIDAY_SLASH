const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, PermissionOverwriteManager } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('This command bans a user from the guild.')
        .addUserOption(option => option.setName('target').setDescription('The user you would like to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Please type the reason you wish to ban this user.'))
        .setDefaultMemberPermissions(PermissionOverwriteManager.KickMembers | PermissionOverwriteManager.BanMembers),

    async execute(Interaction, client) {
        const banUser = Interaction.options.getUser('target');
        const banMember = await Interaction.guild.members.fetch(banUser.id);

        if (!Interaction.member.permissions.has("BAN_MEMBERS")) return Interaction.reply({ content: "You are unauthorized to execute this command."})
        if (!Interaction.member.guild.me.permissions.has("KICK_MEMBERS")) return Interaction.reply({ content: "I do not have permission to do that. You need to give me the \`BAN_MEMBERS\` permission.", ephemeral: true });
        if (banMember.id === client.user.id) return Interaction.reply({ content: "I can ban myself. And wow; it hurts me that you would even want me to do that.", ephemeral: true })
        if (Interaction.user.id === banMember.id) return Interaction.reply({ content: 'You can not ban yourself.', ephemeral: true})
        if (!banMember) return await Interaction.reply({ content: 'The user you mentioned is no longer in the server.', ephemeral: true })
        if (!banMember.kickable) return Interaction.reply({ content: 'I am unable to ban this user. They have more server permissions than you and I.', ephemeral: true })

        let reason = Interaction.options.getString('reason');
        if (!reason) reason = 'No reason was given.'

        const DMembed = new MessageEmbed()
            .setDescription(`:x: You were just banned from **${Interaction.guild.name}** | ${reason}`)
            .setColor('#ff634a')
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        const embed = new MessageEmbed()
            .setDescription(`:white_check_mark: ${banUser.user} was just **banned** from the guild. | ${reason}`)
            .setColor('#ff634a')
            .setTimestamp()

        await banMember.send({ embeds: [DMembed] }).catch(err => (Interaction.reply({ content: 'I am unable to send this user a Direct Message.' })))

        await banMember.ban({ days: 7, reason: reason }).catch(err => (Interaction.reply({ content: 'There was an error while attempting to ban this user.', ephemeral: true })))

        await Interaction.reply({ embeds: [embed] })


    }

}