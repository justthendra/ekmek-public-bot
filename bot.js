const { Client, GatewayIntentBits, Partials, Collection, ActivityType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});

client.commands = new Collection();
client.aliases = new Collection();
const voice = new Collection();

require('./database/connect');

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

["ready", "messageCreate", "guildMemberAdd"].forEach(event => {
  require(`./events/${event}`)(client);
});

["randomID"].forEach(util => {
    require(`./utils/${util}`)(client);
  });

client.login(config.bot.token)