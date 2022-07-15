const { check } = require("express-validator");

const validatorRegister = [
    check("username")
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 30 })
        .withMessage("The username must have at least 3 characters and 30 at most."),
    check("email")
        .exists()
        .notEmpty()
        .isEmail()
        .isLength({ min: 5, max: 40 })
        .withMessage("The email must have at least 5 characters and 40 at most."),
    check("password")
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 50 })
        .withMessage("The password must have at least 3 characters and 50 at most."),
]

const validatorLogin = [
    check("email")
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 30 })
        .withMessage("The username must have at least 3 characters and 30 at most."),
    check("password")
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 50 })
        .withMessage("The password must have at least 3 characters and 50 at most."),
]

module.exports = { validatorRegister, validatorLogin };