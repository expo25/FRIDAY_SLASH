const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nickname')
        .setDescription('Sets the server nickname of a user.')
        .addUserOption(option => option.setName('user').setDescription('The user you would like to change the nickname for.').setRequired(true))
        .addStringOption(option => option.setName('nickname').setDescription('Please type the nickname you would like to set for this user.').setRequired(true)),

    async execute(Interaction, client) {

        const { options } = Interaction;
        const args = options._hoistedOptions;

        const user = args.find(x => x.name == "user");
        const nickname = args.find(x => x.name == "nickname");

        const oldNick = user.member.nickname ? user.member.nickname : user.member.user.username;

        if (!Interaction.member.permissions.has("MANAGE_NICKNAMES")) return Interaction.reply("You are unauthorized to execute this command.")
        //if (!Interaction.user.kickable) return Interaction.reply({ content: "I am unable to change this user's nickname. Maybe because their server permissions are higher than you or I, mate.", ephemeral: true})
        if (oldNick === nickname.value) return Interaction.reply({ content: 'That user already has that nickname! Choose another one.', ephemeral: true})

        const embed = new MessageEmbed()
            .setColor('#ff634a')
            .setDescription(`<a:GreenTick:984501363436294164> Successfully changed **${user.user.tag}'s** server nickname from \`${oldNick}\` to \`${nickname.value}\``)
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        await user.member.setNickname(nickname.value)

        await Interaction.reply({ embeds: [embed] }).catch(err => (console.log('There was an error while attempting to execute this command. =>', err)))
    },
};
