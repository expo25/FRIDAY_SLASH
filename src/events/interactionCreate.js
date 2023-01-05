const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(Interaction, client) {

        //if (Interaction.customId === "Self-roles") {

        //await Interaction.deferUpdate().catch((e) => { });

        //let value = Interaction.values[0];
        //let role = Interaction.guild.roles.cache.find(
        //(r) => r.name.toLowerCase() === value.toLowerCase()
        //);
        //if (!role) {
        //role = await Interaction.guild.roles.create({
        //name: value,
        //permissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
        //});
        //}

        //if (!Interaction.member.roles.cache.has(role.id)) {
        //await Interaction.member.roles.add(role.id);
        //Interaction.followUp({
        //content: `You just received the ${role} role.`,
        //ephemeral: true,
        //});
        //} else {
        //await Interaction.member.roles.remove(role.id);
        //Interaction.followUp({
        //content: `The ${role} was just removed.`,
        //ephemeral: true,
        //});
        //}

        //};

        // if (Interaction.customId == 'newMeme') {
        //     //create an array of memes 
        //     var memes = ['https:aws1.discourse-cdn.com/codecademy/original/5X/3/c/8/5/3c85feecb4eb52a4d69ef0891cfbc495a1da7174.png',
        //         'https:i.redd.it/520hz0cgh8471.jpg',
        //         'https:remote-tools-images.s3.amazonaws.com/programmer-memes/10.jpg',
        //         'https:assets-global.website-files.com/5f3c19f18169b62a0d0bf387/60d33be7eedf8e1f31aabcec_BwENfmI0CU5dZGYlSyo142mpfG08-rYgTS-Qm47uMUXN6JXtmdZvtzVzTooUQdXTWmTD8uzF9N6XQJA2vUIMi53tunFyVtvOBJTNfOjHit2P_JkTmFzFsK7ep6Vb9781XZnRAryH.png',
        //         'https:miro.medium.com/max/1400/0*z1mm6izqSeDiKukb',
        //         'https:i.chzbgr.com/full/9591928832/h8AC54339/laptop-writing-whole-project-as-student-gim-writing-10-lines-code-as-salaried-enough-today',
        //         'https:i.pinimg.com/originals/d0/8d/7d/d08d7d3564444466692a186c232e9e5d.png',
        //         'https:i1.wp.com/cleus.co/wp-content/uploads/2019/03/memecoders.jpg?resize=1058%2C959&ssl=1',
        //         'https:www.semicolonworld.com/uploads/memes/HPh5cSj4MQ.jpg',
        //         'https:miro.medium.com/max/1400/0*r6iQzljiuJavVxRM',
        //         'https:cdn.discordapp.com/attachments/970879944555118682/1009140103861506149/Screenshot_20220816-124224_Chrome.jpg',
        //     ]

        //     //create random index from 0 to the length of memes array
        //     var index = Math.floor(Math.random() * memes.length);

        //     //create new image embed
        //     let newMeme = new MessageEmbed()
        //         .setImage(memes[index])

        //     //change the embed to show the next meme
        //     Interaction.update({ embeds: [newMeme] })
        // }
        if (!Interaction.isCommand()) return;

        const command = client.commands.get(Interaction.commandName);

        if (!command) return

        try {


            await command.execute(Interaction, client);
        } catch (error) {
            console.log(error);
            await Interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
    },

};