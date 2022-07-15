const express = require("express");
require("./passport/passport");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require('connect-mongo');

// Database
const { PORT, URI } = require("./keys");
require("./DB");

// Initializations
const app = express();

// Global
app.set("views", path.join(__dirname, "views"));

// Settings
const { create } = require("express-handlebars");
const hbs = create({
    extname: ".hbs",
    partialsDir: path.join(app.get("views"), "partials"),
    layoutsDir: path.join(app.get("views"), "layouts"),
    helpers: require("./views/helpers/timeago")
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", app.get("views"));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(session({
    secret: 'Authentication_Session',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: URI
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Flash messages
app.use((req, res, next) => {
    app.locals.AUTHENTICATION_MESSAGE = req.flash("AUTHENTICATION_MESSAGE");
    app.locals.user = req.user;
    next();
});

// Routes
app.use("/", require("./routes/home.routes"));
app.use("/profile", require("./routes/contacts.routes"));
app.use("/authentication", require("./routes/authentication.routes"));
app.use("/api", require("./routes/api.routes"));

// Public
app.use(express.static(path.join(__dirname, "/../frontEnd")));

// Server
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});