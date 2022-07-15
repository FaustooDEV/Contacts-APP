const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
    username: { type: String},
    email: {type: String},
    password: {type: String}
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model("User", UserScheme);