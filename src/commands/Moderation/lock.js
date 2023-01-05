const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription(`Lock a channel preventing @everyone to send messages.`)
        .addChannelOption(option => option.setName('channel').setDescription('The channel you would like to lock.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Please type the reason you wish to lock the channel.').setRequired(true)),


    async execute(Interaction, client) {

        let reason = Interaction.options.getString('reason');
        let channel = Interaction.options.getChannel('channel');
        const roles = Interaction.guild.roles;
        const guild = Interaction.guild;
        const members = Interaction.author;
        const role = roles.cache.find(r => r.name === '@everyone')

        const LockdownEmbed = new MessageEmbed()
            .setTitle('Channel Locked')
            .setDescription(`I have successfully locked ${channel}, preventing @everyone from sending messages`)
            .setColor('#ff634a')
            .addFields({ name: 'Command Requested by', value: `**${Interaction.member}**` },
                { name: 'Reason', value: `**${reason}**` })
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        if (!Interaction.guild) return;

        if (!Interaction.member.permissions.has("MANAGE_CHANNELS")) return Interaction.reply({ content: `${Interaction.member} You are unauthorized to execute this command. **Missing permissions | \`MANAGE_CHANNELS & MANAGE_ROLES\`.**` });
        if (!channel.permissionsFor(Interaction.guild.id).has('SEND_MESSAGES')) return Interaction.reply({ content: `This Channel Is Already Locked!`, ephemeral: true });


        channel.permissionOverwrites.create(role, { SEND_MESSAGES: false });
        //await Interaction.reply({ content: `${Interaction.member} has successfully locked the channel.` })
        await Interaction.reply({ embeds: [LockdownEmbed] })
        //console.log(`${role} \n\n ${roles} \n\n ${channel} \n\n ${guild} \n\n ${members}`)
    }

}
