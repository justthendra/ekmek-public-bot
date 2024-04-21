const { EmbedBuilder } = require("discord.js");
const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
const config = require('../../config.json')

module.exports = {
  name: "unban",
  category: "guild",
  aliases: [],
  run: async (client, message, args) => {
    const kişi = args[0];
    const kanal = config.channels.logs.ban;
    const kanall = message.guild.channels.cache.find((c) => c.id === kanal);

    if (!message.member.permissions.has("BanMembers"))
      return message.channel.send("Yetersiz yetki!");

    if (!args[0]) return message.reply("Yanlış kullanıcı id'si girildi.");

    const bangitti = new EmbedBuilder()
      .setDescription(
        "ID'ye sahip kullanıcının sunucu yasağı kaldırıldı. Kullanıcı artık sunucuya girebilir."
      )
      .setFooter({
        text: `Ekmek | Unban`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setColor("#00B50C")
      .setTimestamp();
    message.channel.send({ embeds: [bangitti] });
    await message.guild.members.unban(kişi);

    const logembed = new EmbedBuilder()
      .setDescription(`**${kişi}** id'li kullanıcının yasağı kaldırıldı`)
      .addFields({ name: "Yetkili", value: `${message.author}` })
      .setColor("#00B50C")
      .setFooter({
        text: `Ekmek | LOGS`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTimestamp();
    kanall.send({ embeds: [logembed] });
  },
};
