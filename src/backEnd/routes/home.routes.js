const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/Authentication");

// Home
router.get("/", (req, res) => {
     res.render("home");
});

module.exports = router;