const { ActivityType } = require('discord.js');
const config = require('../config.json');

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;
        if (!message.guild) return;
        if (!message.content.startsWith(config.bot.prefix)) return;
        if (!message.member) message.member = await message.guild.fetchMember(message);
    
        const args = message.content.slice(config.bot.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
    
        if (cmd.length === 0) return;
        
        let command = client.commands.get(cmd);
        if (!command) command = client.commands.get(client.aliases.get(cmd));
    
        if (command) 
        command.run(client, message, args);
    });
}