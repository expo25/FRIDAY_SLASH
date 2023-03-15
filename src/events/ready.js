const mongoose = require('mongoose') // npm i mongoose
const mongodbURL = process.env.mongodbURL;

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('F.R.I.D.A.Y is online.');

        if (!mongodbURL) return;

        mongoose.set('strictQuery', false);

        await mongoose.connect(mongodbURL || '', {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        if (mongoose.connect) {
            console.log('F.R.I.D.A.Y has connected to the database.')
        };

        try {
            await client.user.setPresence({
                activities: [
                    {
                        name: ('/help'),//statusArray[option].content,
                        type: 'LISTENING' //statusArray[option].type,

                    },
                ],
                status: 'online'
                //status: statusArray[option].status
            });

        } catch (error) {
            console.error(error);
        }

        // const inviteSchema = require('../schemas.js/inviteSchema');

        // const invites = new Collection();
        // const wait = require("timers/promises").setTimeout;

        // await wait(2000);

        // client.guilds.cache.forEach(async (guild) => {

        //     const clientMember = guild.members.cache.get(client.user.id);

        //     if (!clientMember.permissions.has(PermissionFlagsBits.ManageGuild)) return;

        //     const firstInvites = await guild.invites.fetch().catch(err => (console.log(err)));

        //     invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
        // })
    }
}