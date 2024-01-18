const mongoose = require("mongoose");

const userSh = new mongoose.Schema({
    id: { type: String, default: null },
    userCreated: { type: String, default: Date.now() },
    userJoined: { type: Array, default: [] },

    punishmentPoint: { type: Number, default: 0 },

});

module.exports = mongoose.model("user", userSh);