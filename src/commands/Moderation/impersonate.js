const { SlashCommandBuilder } = require('@discordjs/builders');
const { WebhookClient } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('impersonate')
        .setDescription('Pose as a user in the server using a webhook.')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user you would like to impersonate.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('The message you would like to send.')),

    async execute(Interaction, client) {

        const { options } = Interaction;

        const member = options.getUser('user');
        const message = options.getString('message');

        await Interaction.channel.createWebhook(member.username,{
            name: member.username,
            avatar: member.displayAvatarURL({ dynamic: true, size: 512 })
        }).then((webhook) => {
            webhook.send({ content: message });
            setTimeout(() => {
                webhook.delete();
            }, 3000)
        });

        await Interaction.reply({ content: `I have successfully impersonated ${member}. Hee-hee.`, ephemeral: true })
    }
}