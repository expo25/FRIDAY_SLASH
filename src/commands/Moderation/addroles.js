const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role-add')
        .setDescription('Give member a role.')
        .addUserOption(option => option.setName('member').setDescription('Member you would like to give the role to.').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('Role you would like to give.').setRequired(true)),

    async execute(Interaction, client) {

        const roleUser = Interaction.options.getUser('member');
        const role = Interaction.options.getRole('role');
        const member = Interaction.guild.members.cache.get(roleUser.id);

        if (!Interaction.member.permissions.has("MANAGE_ROLES")) return Interaction.reply({ content: "You are unauthorized to execute this command." })
        if (!roleUser) return Interaction.reply({ content: 'The user you mentioned is no longer in the server.', ephemeral: true })
        if (member.id === client.user.id) return Interaction.reply({ content: 'I can not add roles to myself. You or someone with higher permissions needs to do that manually.', ephemeral: true})
        if (!member.kickable) return Interaction.reply({ content: 'I am unable to add roles to this user. This is probably because they have a server role ranked higher than your or I.', ephemeral: true })
        //if (roleUser.roles.highest.position > Interaction.guild.members.resolve(bot.user).roles.highest.position) return Interaction.reply({ context: 'The role you want me to add to this user is higher than my current role. I can not do that.'})
        if (member.roles.cache.has(role.id)) return Interaction.reply({ content: 'This user already has this role.', ephemeral: true })
        if (!Interaction.member.guild.me.permissions.has("MANAGE_ROLES")) return Interaction.reply({ content: "I do not have permission to do that. You need to give me the \`MANAGE_ROLESS\` permission.", ephemeral: true });

        await member.roles.add(role);

        const embed = new MessageEmbed()
            .setColor('DARK_AQUA')
            .setDescription(`<a:GreenTick:984501363436294164> Success! OK boss, I just gave ${roleUser} the ${role} role.`)
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        await Interaction.reply({ embeds: [embed] }).catch(err => { Interaction.channel.send('There was an error giving this user a role.') })
    }
}