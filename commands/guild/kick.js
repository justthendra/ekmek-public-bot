const { EmbedBuilder } = require('discord.js');
const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

module.exports = {
    name: "kick",
    category: "guild",
    aliases: [],
    run: async (client, message, args) => {

        const guild = message.guild;
        const kişi = message.mentions.members.first() || guild.users.cache.find(i => i.username === args[0])
        const sebep = args.slice(1).join(" ");

        if(!message.member.permissions.has("KickMembers")) return message.reply("❌ Bu komutu kullanabilmek için `Üyeleri At` yetkisine sahip olmalısın!");

        if(!kişi) return message.reply("❌ Bu kişi sunucuda yok veya bir kişiyi etiketlemedin!")
        
        const kanal = "1105873286044328067";
        const kanall = message.guild.channels.cache.find(c => c.id === kanal)

        try {

        const sucembed = new EmbedBuilder()
           .setDescription(`**${kişi}** isimli kullanıcı **Justify**'den \`${sebep}\` sebebi ile atıldı.`)
           .setColor("#00B50C")
           .setFooter({
            text: `Justify | Kick`,
            iconURL: client.user.displayAvatarURL()
           })
           .setTimestamp()
           message.channel.send({ embeds: [sucembed] })
           const logembed = new EmbedBuilder()
           .setDescription(`**${kişi}** isimli kullanıcı **Justify**'den \`${sebep}\` sebebi ile atıldı.`)
           .addFields(
            { name: "Yetkili", value: `${message.author}`}
            )
           .setThumbnail(kişi.displayAvatarURL())
           .setColor("#00B50C")
           .setFooter({
            text: `Justify | LOGS`,
            iconURL: client.user.displayAvatarURL()
           })
           .setTimestamp()
           kanall.send({ embeds: [logembed] })
           await delay(100);
           return guild.members.kick(kişi, { reason: sebep });
        } catch (error) {
           message.reply("Beklenmedik bir hata oluştu bir kaç dakika sonra tekrar deneyin ya da geliştirici ile iletişime geçin!")
           console.log(error)
        }
    }
}