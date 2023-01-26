const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const warningSchema = require('../../schemas.js/warnSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear-warnings')
        .setDescription('Clears a users warnings')
        .addUserOption(option => option.setName('user').setDescription('The user you would like to clear warnings for').setRequired(true)),

    async execute(Interaction, client) {

        const member = Interaction.options.getUser('user');
        const memberUser = await Interaction.guild.members.cache.get(member.id)

        if (!Interaction.member.permissions.has("KICK_MEMBERS")) return Interaction.reply({ content: "You are unauthorized to execute that command. **Missing permissions | \`KICK_MEMBERS\`.**" });
        if (!Interaction.guild.me.permissions.has("KICK_MEMBERS")) return Interaction.reply({ content: "I do not have permission to use this command. You must give me the **\`KICK_MEMBERS\`.** permission." });
        if (Interaction.member.id === member.id) return Interaction.reply({ content: "You can not clear the warnings for yourself unless you are " });
        if (memberUser.roles.cache.has(bb.id)) return Interaction.reply({ content: 'You can not clear warnings for a bot. Why would a bot have any warnings in the first place? Use your brain, chief.' });
        if (memberUser.id === client.user.id) return Interaction.reply({ content: `You can clear my warnings. First off, I don't have any. Second, you don't want to know what happens if you were to try that.` });
        if (!memberUser.kickable) Interaction.reply({ content: `I can clear warnings for that user. They may have higher perms than you or I.` });
        if (!memberUser) return Interaction.reply({ content: 'The user you mentioned is no longer in the server.' }); //Don't need with slash commands bc it won't show the user as an option if they aren't in the server.
        // if(!member.kickable) return Interaction.reply({ content: "I can not warn this user, I am permission restricted.", ephemeral: true });

        const embed = new MessageEmbed()

        warningSchema.findOne({ GuildID: Interaction.guild.id, UserID: user.id, UserTag: member.tag }, async (err, data) => {

            if (err) throw err;

            if (data) {
                await warningSchema.findOneAndDelete({ GuildIDL: guildId, UserID: member.id, UserTag: member.tag })

                embed.setColor('GREEN')
                    .setDescription(`<a:GreenTick:984501363436294164> ${member.tag}'s warnings have now been cleared in this server.`)
                    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 512 })}` })
                    .setTimestamp()
            }
        })
    }
}
