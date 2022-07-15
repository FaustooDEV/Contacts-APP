const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const phoneValidator = require('./phoneNumberAPI');

const createContact = [
    check("firstName")
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 10 })
        .withMessage("The first name must have at least 3 characters and 10 at most."),
    check("lastName")
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 10 })
        .withMessage("The last name must have at least 3 characters and 10 at most."),
    check("phoneNumber")
        .custom(async (value) => {
            const phoneNumber = await phoneValidator(value);
            if (!phoneNumber) {
                 throw new Error("The phone number is invalid.");
            }
        }), (req, res, next) => {
            return validateResults(req, res, next);
        }
]

const getID = [
    check("id")
        .exists()
        .notEmpty()
        .isMongoId(), (req, res, next) => {
            validateResults(req, res, next);
        }
]

module.exports = { createContact, getID };