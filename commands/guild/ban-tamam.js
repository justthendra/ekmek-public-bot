const { EmbedBuilder } = require('discord.js');
const moment = require('moment');
moment.locale("tr");
const config = require('../../config.json');
const randomID = require('../../utils/randomID');
const punishmentSh = require('../../database/models/punishment');
const userSh = require('../../database/models/user');
const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

module.exports = {
    name: "ban",
    category: "guild",
    aliases: [],
    run: async (client, message, args) => {

        const guild = message.guild;
        const logChannel = message.guild.channels.cache.get(config.channels.logs.ban)
        const member = message.mentions.members.first() || guild.users.cache.find(i => i.username === args[0])
        const memberData = await userSh.findOne({ id: member.id })
        const reason = args.slice(1).join(" ");
        const punishmentID = `P-${randomID(5)}`;


        if(!message.member.roles.cache.get(config.roles.staffs.owner) && !message.member.roles.cache.get(config.roles.staffs.admin) && !message.member.roles.cache.get(config.roles.staffs.staff3) && !message.member.roles.cache.get(config.roles.staffs.staff2)) {
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

        if(!member) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Hata")
                    .setColor("RED")
                    .setDescription('Bu kişi sunucuda yok veya bir kişiyi etiketlemedin!')
                    .setTimestamp()
                    .setFooter(`${interaction.user.username} tarafından kullanıldı.`, interaction.user.avatarURL({ dynamic: true }))
                ],   
                ephemeral: true,
            });
        }

        try {

            new punishmentSh({
                code: punishmentID,
                type: 'Sunucudan Yasaklama',
                reason: reason,
                time: 'Sınırsız',
                date: moment(Date.now()).format("LLL"),
                point: config.points.punishments.ban,
                member: member.id,
                staff: message.author.id
            }).save();

            await memberData.punishmentPoint.inc(config.points.punishments.ban)





            const sucEmbed = new EmbedBuilder()
            .setTitle('Sunucudan Yasaklanma')
            .setColor(config.bot.colors.yellow)
            .setDescription(`**${member}** adlı kişi **${message.author}** tarafından sunucudan yasaklandı.`)
            .addFields(
                { name: "Ceza No", value: `${punishmentID}`, inline: true },
                { name: "Sebep", value: `${reason || 'Sebep belirtilmemiş.'}`, inline: true }
            )
            .setTimestamp()
            .setFooter({
                text: `${message.author.username} tarafından kullanıldı.`,
                iconURL: message.author.avatarURL({ dynamic: true }),
            })

            const logEmbed = new EmbedBuilder()
            .setTitle('Sunucudan Yasaklanma')
            .setColor(config.bot.colors.red)
            .setDescription(`**${member}** adlı kişi **${message.author}** tarafından sunucudan yasaklandı.`)
            .addFields(
                { name: "Ceza No", value: `${punishmentID}`, inline: true },
                { name: "Tarih", value: moment(Date.now()).format("LLL"), inline: true },
                { name: "Sebep", value: `${reason || 'Sebep belirtilmemiş.'}` },
            )

            message.reply({ embeds: [sucEmbed] })
            logChannel.send({ embeds: [logEmbed] })


           await delay(100);
           return guild.members.ban(member, { reason: `${reason || 'Sebep belirtilmemiş. '} (${punishmentID})` });
        } catch (error) {
            message.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Hata")
                    .setColor(config.bot.colors.red)
                    .setDescription('Beklenmedik bir hata oluştu bir kaç dakika sonra tekrar deneyin ya da geliştirici ile iletişime geçin!')
                    .setTimestamp()
                    .setFooter({
                        text: `${message.author.username} tarafından kullanıldı.`,
                        iconURL: message.author.avatarURL({ dynamic: true }),
                    })
                ],
            })
           console.log(error)
        }
    }
}