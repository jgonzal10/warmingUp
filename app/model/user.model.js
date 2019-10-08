const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    surname: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);