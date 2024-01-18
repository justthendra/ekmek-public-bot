const mongoose = require("mongoose");

const punishmentSh = new mongoose.Schema({
    code: { type: String, default: null },
    type: { type: String, default: null },
    reason: { type: String, default: null },
    time: { type: String, default: null },
    date: { type: String, default: null },
    point: { type: Number, default: 0 },


    member: { type: String, default: null },
    staff: { type: String, default: null },

});

module.exports = mongoose.model("punishment", punishmentSh);