module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('F.R.I.D.A.Y is online.');

        //async function pickPresence () {
            //const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: ('/help'),//statusArray[option].content,
                            type: 'LISTENING'//statusArray[option].type,

                        },
                    
                    ],

                    //status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }
    }
//};