//const { MessageEmbed } = require('discord.js');


const usersMap = new Map();
const LIMIT = 6;
const DIFF = 6000;

module.exports = {
    name: 'messageCreate',
    on: true,
    async execute(message, client) {

        if (message.mentions.has(client.user.id) && message.content.includes('What does F.R.I.D.A.Y stand for?') ) {
            message.channel.send('Female Replacement Intelligent Digital Assistant Youth.')
        } else {
            return;
        };

        if (message.author.bot) return;

        if (usersMap.has(message.author.id)) {
            const userData = usersMap.get(message.author.id);
            const { lastMessage, timer } = userData;
            const difference = message.createdTimestamp - lastMessage.createdTimestamp;
            let msgCount = userData.msgCount;
            //console.log(difference);

            //If the time from when the new msg was created after the previous one was sent - is greater than the total time set in DIFF, do not bulk delete. 

            if (difference > DIFF) {
                clearTimeout(timer);
                console.log('Cleared timeout.');
                userData.msgCount = 1;
                userData.lastMessage = message;
                userData.timer = setTimeout(() => {
                    usersMap.delete(message.author.id);
                    //console.log('Removed from map.')
                }, 4000);
                usersMap.set(message.author.id, userData)
            }

            else {
                ++msgCount;
                if (parseInt(msgCount) === LIMIT) {

                    message.channel.send(`${message.author} **WARNING:** Please do not spam this channel. Do this again and I will shut off your Internet for 24 hours.`);
                    message.channel.bulkDelete(LIMIT);
                }
                else {
                    userData.msgCount = msgCount;
                    usersMap.set(message.author.id, userData);
                }
            }

        } else {
            let fn = setTimeout(() => {
                usersMap.delete(message.author.id);
                //console.log('Removed from map.')
            }, 4000);
            usersMap.set(message.author.id, {
                msgCount: 1,
                lastMessage: message,
                timer: fn
            });
        }
    }
}