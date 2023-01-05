const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot-stats')
        .setDescription(`F.R.I.D.A.Y's Technical Stats (For those who care).`),

    async execute(Interaction, client) {

        const Seconds = (client.uptime / 1000);
        const Days = Math.floor(Seconds / 86400);
        const Hours = Math.floor(Seconds / 3600);
        const Minutes = Math.floor(Seconds / 600);
        const Second = Math.floor(Seconds % 60);
        const RamUsed = Math.round(process.cpuUsage().system) / 1024;
        const RamUsage = Math.trunc(RamUsed);

        const embed = new MessageEmbed()
            .setAuthor({ name: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setColor("#ff634a")
            .setTitle(`Bot Stats`)
            .addFields(
                { name: 'Uptime:', value: `${Days} Days, ${Hours} Hours, ${Minutes} Minutes, ${Second} Seconds`},
                { name: 'Language:', value: "JavaScript", inline: true}, 
                { name: `Discord.js Version:`, value: `${require('discord.js/package.json').version}`, inline: true },
                { name: 'Node.js Version:', value: `16.13.2`, inline: true},
                { name: 'System Ping:', value: `${Math.round(client.ws.ping)} Ms`, inline: true},
                { name: 'Memory Usage:', value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} Mb`, inline: true },
                { name: 'CPU Usage:', value: `${RamUsage} Mb`, inline: true},
                //{ name: 'Watching:', value: `${client.users.cache.size} Discord users.`}
        )
        .setFooter({ text: `Requested By: ${Interaction.user.username}`, iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
        .setTimestamp()

        Interaction.reply({
            embeds: [embed]
        });
    }
}
