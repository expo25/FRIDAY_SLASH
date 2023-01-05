const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inspire')
        .setDescription('Feeling down? Send an inspiriational quote to the channel.'),

    async execute(Interaction, client) {

        const fetch = require("node-fetch")
        function getQuote() {
            return fetch("https://zenquotes.io/api/random")
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    return data[0]["q"] + " - " + data[0]["a"]
                })
        }

        getQuote().then(quote => {

            const embed = new MessageEmbed()
                .setColor('#ff634a')
                .setTitle(`YOUR INSPIRATIONAL QUOTE:`)
                .setDescription(`${quote}`)
                .setFooter({ text: `Hope this cheers you up 😀`, iconURL: client.user.displayAvatarURL({ dynamic: true, size: 512 }) })
                .setThumbnail('https://cdn.discordapp.com/attachments/930679082784538704/1021754150062657616/inspire.png')

            Interaction.reply({ embeds: [embed] })
        });
    }
};