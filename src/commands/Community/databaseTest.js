const { SlashCommandBuilder } = require('@discordjs/builders');
const testSchema = require('../../schemas.js/test')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dbs')
        .setDescription('Test the db connection string.'),

    async execute(Interaction, client) {

        testSchema.findOne({ GuildID: Interaction.guild.id, UserID: Interaction.user.id }, async (err, data) => {
            if (err) throw new err;

            if (!data) {
                testSchema.create({
                    GuildID: Interaction.guild.id,
                    UserID: Interaction.user.id
                })
            }

            if (data) {

                const user = data.UserID;
                const guild = data.GuildID;

                console.log({ user, guild })
            }
        })
    }
}