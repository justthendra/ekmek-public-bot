const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "moveuser",
  category: "guild",
  aliases: ['taşı'],
  run: async (client, message, args) => {

if(!message.member.permissions.has("ManageMessages")) return message.reply("Bu komutu kullanabilmek için `Üyeleri Taşı` yetkisine sahip olmalısın.");
    const eleman = message.mentions.members.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]);
    if(!eleman) return message.reply("Bir kullanıcı etiketlemelisin.");

    const kanal = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.name === args[1]) || client.channels.cache.get(args[1])

    eleman.voice.setChannel(kanal)
    const embed = new EmbedBuilder()
    .setAuthor({ name: "Bir kullanıcı farklı kanala taşındı", iconURL: eleman.displayAvatarURL()})
    .setDescription(`${eleman} isimli kullanıcı ${kanal} kanalına taşındı.`)
    .setColor("#00B50C")
    .setFooter({
        text: `Justify | Taşı`,
        iconURL: client.user.displayAvatarURL()
    })
    .setTimestamp()
    message.channel.send({embeds: [embed]})

    }
}