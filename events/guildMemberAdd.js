const userSh = require('../database/models/user');
const moment = require('moment');
moment.locale("tr")

module.exports = (client) => {
    client.on('guildMemberAdd', async (member) => {

        const userData = await userSh.findOne({ id: member.id });

        if(!userData) {
            new userSh({
                id: member.id,
                userCreated: moment(member.createdTimestamp).format("LLL"),
                userJoined: [moment(member.joinedTimestamp).format("LLL")]
            }).save();
        } else {
            userData.userJoined.push(moment(member.joinedTimestamp).format("LLL"));
            await userData.save();
        }
    });
}