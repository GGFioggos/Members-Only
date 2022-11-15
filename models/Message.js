const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: { type: String, required: true, maxLength: 20 },
    text: { type: String, required: true, maxLength: 150 },
    timestamp: { type: Date, required: true },
});

messageSchema.virtual('timestamp_formatted').get(function () {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(
        DateTime.DATETIME_MED_WITH_SECONDS
    );
});

module.exports = mongoose.model('Message', messageSchema);
