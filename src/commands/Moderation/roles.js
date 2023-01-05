const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, CommandInteraction, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles-setup')
        .setDescription('Setup a drop-down menu where users may choose their server roles.'),

    async execute(Interaction, client) {

        const arrayOfRoles = [];
        let counter = 0;
        let filtermsg = (m) => m.author.id === Interaction.user.id;
        let embed = new MessageEmbed().setColor('#ff634a')

        let mainMsg = await Interaction.channel.send({ embeds: [new MessageEmbed().setTitle('Starting Role Selection')] });

        ask_addrole();

        async function ask_addrole() {
            counter++;
            if (counter === 23) {
                Interaction.followUp('❌ **Sorry, you have reached the maximum amount of roles available to be set.**');
                return Finished(Interaction);
            }
            await mainMsg.edit({ embeds: [embed.setTitle(`What would you like Role **${counter}** to be?`).setDescription('Please type \`finish\` if you are finished creating your roles.'),], })
                .then(async (msg) => {
                    await msg.channel
                        .awaitMessages({
                            max: 1,
                            time: 180000,
                            errors: ["TIME"],
                            filter: filtermsg,
                        })
                })
                .then((collected) => {
                    collected
                        .first()
                        .delete()
                        .catch((e) => { });
                    if (collected.first().content.toLowerCase() === "finish") {
                        return Finished(Interaction);
                    } else {
                        let role = collected.first().mentions.roles.first();
                        switch (counter) {
                            case 1:
                                arrayOfRoles.push(role.name);
                                break;
                            case 2:
                                arrayOfRoles.push(role.name);
                                break;
                            case 3:
                                arrayOfRoles.push(role.name);
                                break;
                            case 4:
                                arrayOfRoles.push(role.name);
                                break;
                            case 5:
                                arrayOfRoles.push(role.name);
                                break;
                            case 6:
                                arrayOfRoles.push(role.name);
                                break;
                            case 7:
                                arrayOfRoles.push(role.name);
                                break;
                            case 8:
                                arrayOfRoles.push(role.name);
                                break;
                            case 9:
                                arrayOfRoles.push(role.name);
                                break;
                            case 10:
                                arrayOfRoles.push(role.name);
                                break;
                            case 11:
                                arrayOfRoles.push(role.name);
                                break;
                            case 12:
                                arrayOfRoles.push(role.name);
                                break;
                            case 13:
                                arrayOfRoles.push(role.name);
                                break;
                            case 14:
                                arrayOfRoles.push(role.name);
                                break;
                            case 15:
                                arrayOfRoles.push(role.name);
                                break;
                            case 16:
                                arrayOfRoles.push(role.name);
                                break;
                            case 17:
                                arrayOfRoles.push(role.name);
                                break;
                            case 18:
                                arrayOfRoles.push(role.name);
                                break;
                            case 19:
                                arrayOfRoles.push(role.name);
                                break;
                            case 20:
                                arrayOfRoles.push(role.name);
                                break;
                            case 21:
                                arrayOfRoles.push(role.name);
                                break;
                            case 22:
                                arrayOfRoles.push(role.name);
                                break;
                            case 23:
                                arrayOfRoles.push(role.name);
                                break;

                        }
                        ask_addrole();
                    }
                }).catch((error) => {
                    return Interaction.followUp('A timeout occured.');
                });
        }

        function Finished(Interaction) {

            Interaction.channel.send('Roles are complete.');
            self_roles(Interaction, arrayOfRoles);
        }
        /**
         * 
         * @param {CommandInteraction} Interaction
         * @param {Array} roles
         */
        async function self_roles(Interaction, roles) {
            if (!roles || !Interaction)
                throw new Error("Please provide the required arguments.");
            if (roles.length > 25)
                throw new Error("The amount of selections must be less than or equal to 25."
                );

            let arr = [];

            roles.forEach((role) => {
                arr.push({
                    label: role.charAt(0).toUpperCase() + role.slice(1),
                    description: `Select to receive the ${role} role.`,
                    value: role,

                });
            });

            let selectMenu = await Create_menu({
                id: "Self-roles",
                placeHolder: "Select Your Role",
                array: arr,
            });

            Interaction.channel.send({
                content: "Select a role!",
                components: [selectMenu],
            });
        }

        async function Create_menu({ id, placeHolder, array }) {
            if (!id || !array)
                throw new Error('The options were not provided. Please make sure you provide all the options.');

            if (array.length < 0)
                throw new Error('The array must contain at least one role to select.');
            let select_menu;

            placeHolder = placeHolder ? placeHolder : "Nothing Selected";
            array.forEach((item) => {
                if (!item.label)
                    throw new Error('The array must contain an objects with the following: (label, description and value).');
                if (!item.description)
                    throw new Error('The array must contain objects with the following: (label, description, and value).');
                if (!item.label)
                    throw new Error('The array must contain objects with the following: (label, description, and value).');
            });


            select_menu = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId(id)
                    .setPlaceholder(placeHolder)
                    .addOptions(array)
            );

            return select_menu;
        }
    },
};