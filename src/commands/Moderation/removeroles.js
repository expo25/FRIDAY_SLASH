const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role-remove')
        .setDescription('Remove a role from a member.')
        .addUserOption(option => option.setName('member').setDescription('Member you would like to remove the role from').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('Role you would like to remove.').setRequired(true)),

    async execute(Interaction, client) {

        const roleUser = Interaction.options.getUser('member');
        const role = Interaction.options.getRole('role');
        const member = Interaction.guild.members.cache.get(roleUser.id);

        if (!Interaction.member.permissions.has("MANAGE_ROLES")) return Interaction.reply({ content: "You are unauthorized to execute this command." })
        //if (!user) return Interaction.reply({ content: 'The user you mentioned is no longer in the server.', ephemeral: true })
        if (!member.kickable) return Interaction.reply({ content: 'I am unable to remove roles from this user. This is probably because they have a server role ranked higher than yours.', ephemeral: true })
        if (!member.roles.cache.get(role.id)) return Interaction.reply({ content: 'This user does not have this this role.', ephemeral: true })
        if (!Interaction.guild.me.permissions.has("MANAGE_ROLES")) return Interaction.reply({ content: "I do not have permission to add roles to users.", ephemeral: true });

        await member.roles.remove(role);

        const embed = new MessageEmbed()
            .setColor('#c20927')
            .setDescription(`<a:X_:1009946137068851211> Removed! OK boss, ${roleUser} no longer has the ${role} role.`)
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        await Interaction.reply({ embeds: [embed] }).catch(err => { Interaction.channel.send('There was an error giving this user a role.') })
    }
}