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
                        type: 'LISTENING'//statusArray[option].type,

                    },
                ],
                status: 'online'
                //status: statusArray[option].status
            })
        } catch (error) {
            console.error(error);
        }
    }
}
//};