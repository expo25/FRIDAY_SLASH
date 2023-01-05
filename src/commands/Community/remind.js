const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const ms = require('ms')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remind')
        .setDescription(`Set a custom reminder for yourself. The bot will DM you after the amount of time set has elapsed.`)
        .addStringOption(option => option.setName('duration').setDescription('Type how much time you would like to be reminded in.').setRequired(true))
        .addStringOption(option => option.setName('reminder').setDescription('Type the reminder you want to the bot to send you.').setRequired(true)),

    async execute(Interaction, client) {

        let reminder = Interaction.options.getString('reminder');
        let time = Interaction.options.getString('duration');
        let user = Interaction.user;
        const remindMember = await Interaction.guild.members.fetch(user.id);

        if (!time.includes('s') && time.includes('m') && !time.includes('h') && !time.includes('d')) return Interaction.reply({ content: `\`${time}\` is an invalid option. Please first include a number followed by \`s\` | \`m\` | \`h\` | \`d\` | \`w\` | \`y\` (Signifies Seconds, Minutes, Hours, Days, Weeks, Years)`, ephemeral: true});

        //if (time !== 's') return Interaction.reply({ content: `\`${time}\` is an invalid option. Please include an integer followed by \`s\` | \`m\` | \`h\` | \`d\` | \`w\` | (Seconds, Minutes, Hours, Days, Weeks)`, ephemeral: true})

        const embed = new MessageEmbed()
            .setColor('ff634a')
            .setAuthor({ name: 'Reminder Set!', iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`I have successfully set ${Interaction.user.username}'s reminder.`)
            .addFields({ name: `Remind In: ${time}`, value: `Reminder: ${reminder}` })
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()

        Interaction.reply({ embeds: [embed], ephemeral: true });

        setTimeout(async function () {

            const DMembed = new MessageEmbed()
                .setColor('ff634a')
                .setAuthor({ name: "Reminder Alert!", iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                .addFields({ name: 'Reminder:', value: `${reminder}` })
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                .setTimestamp()

                remindMember.send({ embeds: [DMembed] });

        }, ms(time));
    },
};
