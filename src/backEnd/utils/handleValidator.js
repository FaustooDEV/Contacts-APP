const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const { username } = req.user;
        const validations = errors.array();

        req.validationsErrors = validations;
        req.flash("info", req.body);

        res.render("contacts/add", {errors: req.validationsErrors, add_Form: true, username, previousDates: req.flash("info")});

    } else {
        return next();
    }
}

module.exports = validateResults;