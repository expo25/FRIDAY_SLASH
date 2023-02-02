const { model, Schema } = require('mongoose');

let warningSchema = new Schema({
    GuildID: String,
    UserID: String,
    UserTag: String,
    Content: Array,
    // UserWarns: Array,
    // Date: { type: Date, default: Date.now },
});

module.exports = model('warningSchema', warningSchema);