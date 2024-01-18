const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "voicekick",
  category: "guild",
  aliases: ['sesat'],
  run: async (client, message) => {

    if(!message.member.permissions.has("KickMembers")) return message.reply("Bu komutu kullanabilmek için `Üyeyi At` yetkisine sahip olmalısın!");
    const user = message.mentions.members.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]);
    if(!user) return message.reply("Bir kullanıcı etiketlemelisin!");
    const voiceChannel = message.member.channel;


    const embed = new EmbedBuilder()
    .setAuthor({ name: "Bir kullanıcı ses kanalından atıldı", iconURL: user.displayAvatarURL()})
    .setDescription(`${user} isimli kullanıcı kanaldan atıldı.`)
    .setColor("#00B50C")
    .setFooter({
        text: `Justify | Sesli At`,
        iconURL: client.user.displayAvatarURL()
    })
    .setTimestamp()

    message.mentions.members.each((user) => {
        if (!user.voice.channel)
          return message.reply(`${user} isimli kullanıcı sesli kanalda değil.`);
      
        user.voice
          .disconnect()
          .then((member) =>
            message.channel.send({embeds: [embed]})
          )
          .catch(console.error);
      });

  },
};
