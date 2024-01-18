const { EmbedBuilder } = require("discord.js");
const ms = require('ms');

module.exports = {
  name: "mute",
  category: "guild",
  aliases: [],
  run: async (client, message, args) => {

    if(!message.member.permissions.has("MuteMembers")) return message.channel.send("You are not authorized to use this command.");

    const etiket = message.mentions.members.first()
    const kanal = "1105873257829249104";
    const kanall = message.guild.channels.cache.find(c => c.id === kanal)

    const zaman = args[1];
    const sebep = args[2];
    const süre = ms(zaman);

    if(!sebep) {
        sebep = "Sebep Yok"
    }

    const hataEmb = new EmbedBuilder()
    .setDescription("Birşeyler ters gitti, lütfen geliştirici ile iletişime geçin.")
    .setColor("Red")
    .setTimestamp()

    try {

    const susturuldu = new EmbedBuilder()
    .setAuthor({name: "Bir kullanıcı susturuldu.", iconURL: etiket.displayAvatarURL()})
    .setDescription(`${etiket} isimli kullanıcı susturuldu.`)
    .addFields(
        { name: "Sebep", value: `${sebep}`, inline: true},
        { name: "Süre", value: `${süre}`, inline: true},
    )
    .setTimestamp()
    .setFooter({
        text: `Justify | Mute`,
        iconURL: client.user.displayAvatarURL()
       })
    .setColor("Green")
    message.channel.send({embeds: [susturuldu]})

    const susturmaKalktı = new EmbedBuilder()
        .setAuthor({name: "Bir kullanıcının susturması kaldırıldı.", iconURL: etiket.displayAvatarURL()})
        .setDescription(`Sürenin dolması sebebi ile ${etiket} isimli kullanıcının susturması kaldırıldı.`)
        .setFooter({
            text: `Justify | LOGS`,
            iconURL: client.user.displayAvatarURL()
           })
        .setTimestamp()
        .setColor("Green")

    const muteLog = new EmbedBuilder()
    .setAuthor({name: "Bir kullanıcı susturuldu.", iconURL: etiket.displayAvatarURL()})
    .setDescription(`${etiket} isimli kullanıcı susturuldu.`)
    .addFields(
        { name: "Sebep", value: `${sebep}`, inline: true},
        { name: "Süre", value: `${süre}`, inline: true},
        { name: "Yetkili", value: `${message.author}`}
    )
    .setFooter({
        text: `Justify | LOGS`,
        iconURL: client.user.displayAvatarURL()
       })
    .setTimestamp()
    .setColor("Green")
    kanall.send({embeds: [muteLog]})
    await etiket.timeout(süre, sebep)
    setTimeout(() => kanall.send({embeds: [susturmaKalktı]}), süre)
    } catch (err) {
        console.log(err)
        message.channel.send({embeds: [hataEmb]})
    }
 
  }
};
