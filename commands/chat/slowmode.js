const { EmbedBuilder } = require("discord.js");
const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

module.exports = {
  name: "slowmode",
  category: "chat",
  aliases: ['yavaşmod'],
  run: async (client, message) => {

    if(!message.content.startsWith("j/")) return
    const messageArray = message.content.split(' ');
    const args = messageArray.slice(1);

    if(!message.member.permissions.has("ManageMessages")) return message.reply("Bu komutu kullanabilmek için `Mesajları Yönet` yetkisine sahip olman lazım.");

    message.channel.setRateLimitPerUser(args[0]);
    message.reply(`Yavaş mod ${args[0]} saniye olarak ayarlandı.`)
  },
};
