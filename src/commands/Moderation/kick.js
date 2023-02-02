const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('This command kicks a user from the guild.')
        .addUserOption(option => option.setName('target').setDescription('The user you would like to kick').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Please type the reason you wish to kick this user.')),

    async execute(Interaction, client) {

        const kickUser = Interaction.options.getUser('target');
        const kickMember = Interaction.guild.members.cache.get(kickUser.id);
        let reason = Interaction.options.getString('reason');

        if (!reason) reason = 'No reason was given.'
        if (!Interaction.member.permissions.has("KICK_MEMBERS")) return Interaction.reply({ content: "You are unauthorized to execute this command." })
        if (kickMember.id === client.user.id) return Interaction.reply({ content: "I can not kick myself. I wish, but I love myself too much to do that.", ephemeral: true })
        if (Interaction.user.id === kickMember.id) return Interaction.reply({ content: 'You can not kick yourself.', ephemeral: true })
        if (!kickMember) return Interaction.reply({ content: 'The user you mentioned is no longer in the server.', ephemeral: true })
        if (!kickMember.kickable) return Interaction.reply({ content: 'I am unable to kick this user. They have more server permissions than you and I.', ephemeral: true })
        if (!Interaction.member.guild.me.permissions.has("KICK_MEMBERS")) return Interaction.reply({ content: "I do not have permission to do that. You need to give me the \`KICK_MEMBERS\` permission.", ephemeral: true });

        const DMembed = new MessageEmbed()
            .setDescription(`:sneezing_face: :sneeze: You were just kicked from **${Interaction.guild.name}** | ${reason}`)
            .setColor('#ff634a')
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        const embed = new MessageEmbed()
            .setDescription(`Tell me, what's the shape of Italy? ${kickUser} was just **kicked** from the server. | ${reason}`)
            .setColor('#ff634a')
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        await Interaction.reply({ embeds: [embed] }).then(kickMember.send({ embeds: [DMembed] }).catch(err => (Interaction.reply({ content: 'I am unable to send this user a Direct Message.', ephemeral: true })))).then(
            kickMember.kick({ reason: reason }).catch(err => (Interaction.reply({ content: 'There was an error while attempting to kick this user.', ephemeral: true })))
        )
    }
}