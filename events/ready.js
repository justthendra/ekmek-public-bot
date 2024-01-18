const { ActivityType } = require('discord.js');
const config = require('../config.json');

module.exports = (client) => {
    client.on('ready', async () => {

        client.user.setStatus(config.bot.presence.status);
        client.user.setPresence({ 
            activities: [{
                name: config.bot.presence.text,
                type: config.bot.presence.type
            }]
        })

        console.log(client.user.username + ' adlı bot başlatıldı.')
    });
}