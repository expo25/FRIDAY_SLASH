const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role-check')
        .setDescription('Check if a user has a role.')
        .addUserOption(option => option.setName('member').setDescription('Member you would like to check.').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('Role you would like to check for.').setRequired(true)),

    async execute(Interaction, client) {

        const roleUser = Interaction.options.getUser('member');
        const role = Interaction.options.getRole('role');
        const member = Interaction.guild.members.cache.get(roleUser.id);

        const doesNotHaveEmbed = new MessageEmbed()
            .setColor('#ff634a')
            .setDescription(`The user ${roleUser} \`DOES NOT\` have the ${role} role.`)
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()


        const HaveEmbed = new MessageEmbed()
            .setColor('#ff634a')
            .setDescription(`The user ${roleUser} \`DOES\` have the ${role} role.`)
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        if (!member.roles.cache.get(role.id)) {
            return Interaction.reply({ embeds: [doesNotHaveEmbed] })
        } else {
            return Interaction.reply({ embeds: [HaveEmbed] })
        }//.catch(err => { Interaction.channel.send('There was an error giving this user a role.') })
    },
};