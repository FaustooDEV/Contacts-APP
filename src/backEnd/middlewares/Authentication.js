const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect("/authentication/register");
    };
};

const isNotAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect("/profile");
    };
};

module.exports = { isAuthenticated,isNotAuthenticated };