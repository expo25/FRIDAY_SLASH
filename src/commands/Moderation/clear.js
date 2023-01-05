const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Bulk deletes a specified amount of messages from a channel.')
        .addIntegerOption(option => option.setName('amount').setDescription('The amount of messages you would like to clear.').setRequired(true))
        .addUserOption(option => option.setName('user').setDescription('The user to clear messages from.')),

    async execute(Interaction, client) {

        if (!Interaction.member.permissions.has("MANAGE_MESSAGES")) return Interaction.reply({ content: "You are not authorized to use this command." })

        const amount = Interaction.options.getInteger('amount');
        const target = Interaction.options.getUser('user');

        const messages = await Interaction.channel.messages.fetch();

        const Response = new MessageEmbed()
            .setColor('LUMINOUS_VIVID_PINK')

        if (amount > 100 || amount <= 0) {
            Response.setDescription('<a:vr_a_Infinity1:1010408741813878906> Sorry Boss, the amount can not exceed **100** and can not be under **1**.');
            return Interaction.reply({ embeds: [Response], ephemeral: true });
        }

        if (target) {
            let i = 0;
            const filtered = [];
            (await messages).filter((m) => {
                if (m.author.id === target.id && amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            //const filtered = messages.filter((msg) => Date.now() - msg.createdTimestamp < ms('14 days'));

            await Interaction.channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`<a:GreenTick:984501363436294164> OK Boss, I just deleted \`${messages.size}\` messages from **${target}.**`);
                Interaction.reply({ embeds: [Response], ephemeral: true });
            })
        } else {
            await Interaction.channel.bulkDelete(amount, true).then(messages => {
                Response.setDescription(`<a:GreenTick:984501363436294164> OK Boss, I just deleted \`${messages.size}\` messages from this channel.`);
                Interaction.reply({ embeds: [Response], ephemeral: true });
            })
        };
    },

};