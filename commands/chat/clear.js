const { EmbedBuilder } = require("discord.js");
const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

module.exports = {
  name: "clear",
  category: "chat",
  aliases: [],
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ManageMessages"))
      return message
        .reply("Bu komutu kullanmaya yetkin yok!")
        .then((message) => setTimeout(() => message.delete(), 6000));
    if (!args[0])
      return message.channel
        .send("Lütfen silinecek mesaj sayısını belirt!")
        .then((message) => setTimeout(() => message.delete(), 6000));
    message.channel.bulkDelete(args[0]).then(() => {
      const embed = new EmbedBuilder()
        .setDescription(`**${args[0]}**, mesaj başarıyla silindi.`)
        .setFooter({
          iconURL: client.user.displayAvatarURL(),
          text: `${message.author.tag} tarafından istendi`,
        })
        .setColor("Random")
        .setTimestamp()
      message.channel
        .send({ embeds: [embed] })
        .then((message) => setTimeout(() => message.delete(), 6000));
    });
  },
};
