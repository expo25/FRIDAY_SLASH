const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('recruit-msg')
        .setDescription('Send the current recruitment message to the user upon acceptance to the server & change nickname.')
        .addUserOption(option => option.setName('user').setDescription('The user you would like to tag in the message').setRequired(true))
        .addStringOption(option => option.setName('nickname').setDescription('The nickname you would like to set for this user.').setRequired(true)),
    // .addSubcommand(subcommand =>
    //     subcommand
    //         .setName('nickname-change')
    //         .setDescription('Change the nickname of the user to match their IGN.')
    //         .addUserOption(option => option.setName('user').setDescription('The user you would like to give the role and change the nickname for.').setRequired(true))
    //         .addStringOption(option => option.setName('nickname').setDescription('The nickname you would like to set for this user.').setRequired(true)),
    // ),

    async execute(Interaction, client) {

        // let data = JSON.parse(fs.readFileSync('./src/commands/Moderation/test.json', 'utf8'));

        const user = Interaction.options.getUser('user');
        const userNickname = Interaction.options.getString('nickname');
        const rr = Interaction.guild.roles.cache.find(r => r.id === '980916746363998209'); //\ Switch to match your server role's id. 
        const cr = Interaction.guild.roles.cache.find(r => r.id === '981276719849812028'); //\ Switch to match your server role's id. 
        const bb = Interaction.guild.roles.cache.find(r => r.id === '952570074441584700'); //\ Switch to match your server role's id. 
        const applicantRole = Interaction.guild.roles.cache.find(r => r.id === '980625735205138492'); //\ Switch to match your server role's id.
        const userID = Interaction.guild.members.cache.get(user.id);
        const interactionUser = await Interaction.guild.members.fetch(Interaction.user.id);
        // const { options } = Interaction;
        // const args = options._hoistedOptions;
        // const userNickname = args.find(x => x.name == "user");
        // const nickname = args.find(x => x.name == "nickname");
        // const oldNick = userNickname.member.nickname ? userNickname.member.nickname : userNickname.member.user.username;

        // Error handling logic regarding roles/permissions.

        if (!interactionUser.roles.cache.has(rr.id)) return Interaction.reply({ content: "You are unauthorized to execute this command." });
        if (Interaction.user.id === user.id) return Interaction.reply({ content: `You can not use this command on yourself. Don't be silly.` });//, ephemeral: true
        if (!userID) return Interaction.reply({ content: 'The user you mentioned is no longer in the server.' });//, ephemeral: true
        if (userID.id === client.user.id) return Interaction.reply({ content: `You can not include me in this message. As much as I'd like it to be about me, I am not a recruit.` });//, ephemeral: true
        if (!userID.kickable) Interaction.reply({ content: `I can not include that user in the message. They may have higher perms than you or I, mate.` });//, ephemeral: true
        if (userID.roles.cache.has(cr.id)) return Interaction.reply({ content: 'This user already has access to the server. I will not send them another message.' });//, ephemeral: true
        if (userID.roles.cache.has(bb.id)) return Interaction.reply({ content: 'You can not give a bot the role. How would that even make sense?' });

        // if (oldNick === nickname.value) return Interaction.reply({ content: 'That user already has that nickname! Choose another one.' });

        await userID.roles.add(cr).then(userID.roles.remove(applicantRole)).then(userID.setNickname(userNickname));

        const embed = new MessageEmbed()
            .setColor('#ff634a')
            .setTitle('**WELCOME!**')
            .addFields({ name: '\u200b', value: `>>> I have changed your server name to match your in-game name: **\`${userNickname}\`**` },
                { name: '\u200b', value: '>>> I have also given you the <@&981276719849812028> role., which means that you now have access to the entire server.' },
                { name: '\u200b', value: '>>> You no longer have the <@&980625735205138492> role.' },
                { name: '\u200b', value: '>>> Please now add your time zone in <#952558279219871784> and get to know the rest of the server. That would be great.' },
                { name: '\u200b', value: '>>> Please either use \`/rt\` or look for an invite from me in your in-game inbox. Make sure you are green for receiving invites.' },
                { name: '\u200b', value: '>>> When farming, we keep CC request open and none - specified. Of course for war, legend attack, pushing trophy and practicing tactics you may specify exactly what you need! If specifying CC, make sure you state the reasons clearly in request text, i.e “Perfecting tactics" | "Practicing for war" | "Farming"' },
                { name: '\u200b', value: '>>> I would just like to add one very important note here so there is no confusion about how we play Normal War...' },
                { name: '\u200b', value: '>>> No one should be going into an attack with doubt in mind whether they will triple or not. Do not bother going on the system “recommended target” or your mirror. Find a base that is lower than your mirror, a base design that is suited to your preferred tactic, to ensure 100 % triple attack.' },
                { name: '\u200b', value: '>>> If you don’t like attacking early and want to hold and wait for all lower to be cleared, that is fine. But please pay attention to all base notes as we are very organised and coordinated here. We will use this to signal to our higher guys if clearing is needed in certain lower bases.' },
                { name: '\u200b', value: `>>> I hope this make sense, please ask any questions if you are not sure. I will now leave this ticket open during your trial period so we can discuss whatever questions you may have in the foreseeable future, with rest of our <@&952554951475871795> team.` })

        // fs.readFile('./src/commands/Moderation/test.json', JSON.stringify(data), (err) => {
        //     if (err) console.log(err)
        // });

        await Interaction.reply({ content: `Hi ${user} ! `, embeds: [embed] })

        // console.log(embedData);

    }
}