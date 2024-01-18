const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "unlock",
  category: "chat",
  aliases: [],
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ManageMessages"))
      return message.reply(
        "Bu komutu kullanabilmek için `Mesajları Yönet` yetkisine sahip olmalısın."
      );

    message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
      ViewChannel: true,
      SendMessages: true,
      ReadMessageHistory: true,
      AttachFiles: true,
    });

    const embed = new EmbedBuilder()
      .setAuthor({
        name: "Kanal kilidi açıldı.",
        iconURL: message.author.displayAvatarURL(),
      })
      .setDescription(
        `${message.channel} isimli kanalın kilidi açıldı. Artık kullanıcılar kanala mesaj atabilir.`
      )
      .setColor("#00B50C")
      .setFooter({
        text: `Justify | Kanal Kilit`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  },
};
