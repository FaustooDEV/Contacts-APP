const bcrypt = require("bcryptjs");

const encryptPassword = async (pass) => {
    return await bcrypt.hash(pass, 10);
};

const comparePassword = async (pass, hashPass) => {
    return await bcrypt.compare(pass, hashPass);
};

module.exports = { encryptPassword, comparePassword };