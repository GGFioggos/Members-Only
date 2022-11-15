const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, minLength: 3, maxLength: 15 },
    password: { type: String, required: true, minLength: 3, maxLength: 15 },
});

UserSchema.virtual('fullname').get(function () {
    return this.firstname + this.lastname;
});

module.exports = mongoose.model('User', UserSchema);
