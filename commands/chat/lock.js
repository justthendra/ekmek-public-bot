const { EmbedBuilder } = require('discord.js');
const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

module.exports = {
    name: "lock",
    category: "chat",
    aliases: [],
    run: async (client, message, args) => {

        if(!message.member.permissions.has("ManageMessages")) return message.reply("Bu komutu kullanabilmek için `Mesajları Yönet` yetkisine sahip olmalısın.");

    message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        ViewChannel: true,
        SendMessages: false,
        ReadMessageHistory: true,
        AttachFiles: false
    });

    const embed = new EmbedBuilder()
    .setAuthor({ name: "Kanal kilitlendi.", iconURL: message.author.displayAvatarURL()})
    .setDescription(`${message.channel} isimli kanal kilitlendi. Artık kimse kanala mesaj atamaz`)
    .setColor("#00B50C")
    .setFooter({
        text: `Justify | Kanal Kilitleme`,
        iconURL: client.user.displayAvatarURL()
    })
    .setTimestamp()
    message.channel.send({embeds: [embed]})
    }
}