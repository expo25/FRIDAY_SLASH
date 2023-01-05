const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('This command mutes a user in the guild who you believe is causing disruptive behaviour.')
        .addUserOption(option => option.setName('user').setDescription('The user you would like to mute').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Please type the reason you wish to mute this user.').setRequired(false))
        .addStringOption(option => option.setName('duration').setDescription('Please select the amount of time you would like to mute the user.')
            .addChoices({ name: '1 Hour', value: '1h' }, 
                        {name: '1 Day', value: '1d'},
                        {name: '5 Seconds', value: '5s'}).setRequired(false))
        .addStringOption(option => option.setName('customtime').setDescription('Please provide a custom time 1s/1h/1d').setRequired(false)),

    async execute(Interaction, client) {

        const target = Interaction.options.getUser('user');
        let muteReason = Interaction.options.getString('reason') || "No Reason Given."
        const time = Interaction.options.getString('duration') || Interaction.options.getString('customtime') || '14d'
        const muteRole = Interaction.guild.roles.cache.find(role => role.name.toLowerCase().includes("muted"));

        //if (Interaction.target.id === target.id) return Interaction.reply({ content: "You can not mute yourself.", ephemeral: true });
        //if (target.id === client.user.id) return Interaction.reply({ content: "I can not mute myself. That would defeat the whole purpose 😊", ephemeral: true });
        if (!Interaction.guild.roles.cache.find(role => role.name.toLowerCase().includes("muted"))) return Interaction.reply({ embeds: [new MessageEmbed().setColor('DARK_RED').setDescription('❌ This role does not exist in this server.')]})
        if (!Interaction.member.permissions.has("KICK_MEMBERS")) return Interaction.reply({ content: 'You are unauthorized to execute that command. Missing permission | \`\(KICK_MEMBERS\)\`' });

        await target.roles.add(muteRole)
        setTimeout(async () => {
            if(!target.roles.cache.has(muteRole)) return;
            await target.roles.remove(muteRole)
        }, (ms(time)))

        const embed = new MessageEmbed()
            .setColor("0#ff634a")
            .setDescription(`:white_check_mark: ${target} has been **muted** for ${time} | ${muteReason}`)

        const dmEmbed = new Discord.MessageEmbed()
            .setColor("0#ff634a")
            .setDescription(`:x: You have been **muted** in ${Interaction.guild.name} | ${muteReason}`)//If you believe this was a mistake, please send a DM to expo#4207. Thanks!`)
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        await Interaction.reply({ embeds: [embed] })
        muteUser.send({ embeds: [dmEmbed] }).catch(err => { console.log('There was an error sending this user a DM. User may have direct messaging turned off.') })

    }
}