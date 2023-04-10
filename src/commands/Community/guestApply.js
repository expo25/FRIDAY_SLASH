const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guest-apply')
        .setDescription('Apply to recieve our server guest role.'),
    // .addUserOption(option => option.setName('user').setDescription('The user you would like to tag in the message').setRequired(true)),

    async execute(Interaction, client) {

        const user = Interaction.user;
        const intChannel = Interaction.channel.id;
        const interactionUser = await Interaction.guild.members.fetch(Interaction.user.id);
        const userID = Interaction.guild.members.cache.get(user.id);
        const applicantRole = Interaction.guild.roles.cache.find(r => r.id === '980625735205138492'); //\ Switch to match your server role's id.
        const familyFriend = Interaction.guild.roles.cache.find(r => r.id === '1066380373740753016'); //\ Switch to match your server role's id.

        // if (user.id != interactionUser) return Interaction.reply({ content: "You are only authorized to give the role to yourself. C'mon now." });
        if (userID.roles.cache.has(familyFriend.id)) return Interaction.reply({ content: 'You already have the role <@&1066380373740753016>. Why would I give you it again?' });//, ephemeral: true
        // if (!userID.roles.cache.has(applicantRole.id)) return Interaction.reply({ content: 'You already have access to the server.' })

        await interactionUser.roles.add(familyFriend).then(interactionUser.roles.remove(applicantRole));

        const embed = new MessageEmbed()
            .setColor('#ff634a')
            .setTitle('**WELCOME!**')
            .setDescription(`>>> I have now given you the <@&1066380373740753016> role. Enjoy the server.\n\nIf you are interested in joining us in the future, just re-visit <#977897112178151434> and open an application. All the best!`)
            .setFooter({ text: `This ticket will auto-delete in 30 seconds.`, iconURL: Interaction.user.displayAvatarURL({ dynamic: true }) })
        // .setTimestamp()

        await Interaction.reply({ content: `Hi ${user}! `, embeds: [embed] })
        setTimeout(() => {
            Interaction.channel.delete()
        }, 30 * 1000);

        //set Timeout, delete the channel after n seconds. 

    }
}