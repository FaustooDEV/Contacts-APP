const mongoose = require("mongoose");
const {URI} = require("./keys");

mongoose.connect(URI).then(() => {
    console.log("Database is connected!");
}).catch((e) => {
    console.log("Something was wrong with the database!");
});