const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription(`Sends your text to the server's suggestion channel in an embed.`)
        .addStringOption(option => option.setName('suggestion').setDescription('The suggestion text.').setRequired(true)),

    async execute(Interaction, client) {

        const channel = Interaction.guild.channels.cache.find(c => c.name.includes('suggest'));
        if(!channel) return Interaction.reply('This channel does not exist.');

        let messageArgs = Interaction.options.getString('suggestion')

        //const user = message.guild.users.cache.find(user => user.username === args[0]);
        //var user = message.guild.members.cache.find(u => u.user.username.toUpperCase() === args.join(" ") || u.user.username.toLowerCase() === args.join(" ") || u.user.username === args.join(" "))
        const embed = new MessageEmbed()
        .setColor('#ff634a')
        .setTitle('Suggestion')
        .setDescription(messageArgs)
        .setFooter({text: `Made By: ${Interaction.user.username}`, iconURL: `${Interaction.user.avatarURL({dynamic: true, size: 512})}`})
        //.setAuthor(`Suggestion made by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))

        channel.send({ embeds: [embed]}).then((msg) =>{
            msg.react('✅');
            msg.react('❌');
           Interaction.reply({ content: 'I sent your suggestion successfully.', ephemeral: true });
        }).catch((err)=>{
            throw err;
        });
    }
}