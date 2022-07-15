const mongoose = require("mongoose");

const contactScheme = new mongoose.Schema({
        firstName: {type: String},
        lastName: {type: String},
        phoneNumber: {type: Number},
        author: {type: mongoose.Types.ObjectId}
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model("Contact", contactScheme);