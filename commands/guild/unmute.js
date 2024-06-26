const { EmbedBuilder } = require("discord.js");
const config = require('../../config.json')

module.exports = {
  name: "unmute",
  category: "guild",
  aliases: [],
  run: async (client, message, args) => {

    if(!message.member.permissions.has("MuteMembers")) return message.channel.send("You are not authorized to use this command.");

    const etiket = message.mentions.members.first()
    const kanal = config.channels.logs.mute;
    const kanall = message.guild.channels.cache.find(c => c.id === kanal)

    const hataEmb = new EmbedBuilder()
    .setDescription("Birşeyler ters gitti, lütfen geliştirici ile iletişime geçin.")
    .setColor("Red")
    .setTimestamp()

    try {

        const susturmaKalktı = new EmbedBuilder()
        .setAuthor({name: "Bir kullanıcının susturması kaldırıldı.", iconURL: etiket.displayAvatarURL()})
        .setDescription(`${etiket} isimli kullanıcının susturması kaldırıldı.`)
        .setFooter({
            text: `Ekmek | Unmute`,
            iconURL: message.author.displayAvatarURL()
           })
        .setTimestamp()
        .setColor("Green")
        message.channel.send({embeds: [susturmaKalktı]})
    
        const muteLog = new EmbedBuilder()
        .setAuthor({name: "Bir kullanıcının susturması kaldırıldı.", iconURL: etiket.displayAvatarURL()})
        .setDescription(`${etiket} isimli kullanıcının susturması kaldırıldı.`)
        .addFields(
            { name: "Yetkili", value: `${message.author}`}
        )
        .setFooter({
            text: `Ekmek | LOGS`,
            iconURL: message.author.displayAvatarURL()
           })
        .setTimestamp()
        .setColor("Green")
        kanall.send({embeds: [muteLog]})
        await etiket.timeout(null)
        } catch (err) {
            console.log(err)
            message.channel.send({embeds: [hataEmb]})
        }
 
  }
};
