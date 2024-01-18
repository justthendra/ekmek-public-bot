const { EmbedBuilder } = require('discord.js');
const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
const config = require('../../config.json');


module.exports = {
    name: "bankontrol",
    category: "guild",
    aliases: [],
    run: async (client, message, args) => {

        const member = args[0];

        if(!message.member.roles.cache.get(config.roles.staffs.owner) && !message.member.roles.cache.get(config.roles.staffs.admin) && !message.member.roles.cache.get(config.roles.staffs.staff3) && !message.member.roles.cache.get(config.roles.staffs.staff2) && !message.member.roles.cache.get(config.roles.staffs.staff1)) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Yetersiz Yetki")
                    .setColor(config.bot.colors.red)
                    .setDescription('Bu komutu kullanmak için yeterli yetkiye sahip değilsiniz.')
                    .setTimestamp()
                    .setFooter({
                        text: `${message.author.username} tarafından kullanıldı.`,
                        iconURL: message.author.avatarURL({ dynamic: true }),
                    })
                ],   
            });
        }

    message.guild.bans.fetch()
        .then(bans => {
            if (!bans.has(member)) {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle('Ban Kontrol')
                        .setColor(config.bot.colors.yellow)
                        .setDescription('Bu kullanıcı yasaklanmamış!')
                        .setTimestamp()
                        .setFooter({
                            text: `${message.author.name} tarafından kullanıldı.`,
                            iconURL: message.author.displayAvatarURL()
                        })
                    ]
                })
            }
        })


    message.guild.bans.fetch(member).then(({ user, reason }) => {
        const banneden = new EmbedBuilder()
        .setDescription(`**${user.tag}** isimli kullanııcı **\`${reason}\`** sebebi ile sunucudan yasaklanmış.`)
        .setFooter({
            text: `Justify | Ban Kontrol`,
            iconURL: message.author.displayAvatarURL()
        })
        .setColor("#FF0000")
        .setTimestamp()
        message.channel.send({embeds: [banneden]})

    })
    }
}