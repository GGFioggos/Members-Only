const mongoose = require('mongoose');

module.exports = mongoose.model(
    'Message',
    new mongoose.Schema({
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: { type: String, required: true, maxLength: 20 },
        text: { type: String, required: true, maxLength: 100 },
        timestamp: { type: Date, required: true },
    })
);
