const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const itineraries = require("./routes/api/itineraries")
const attractions = require("./routes/api/attractions")
// const User = require("./models/User");
const bodyParser = require("body-parser");
const passport = require('passport');

const path = require('path');

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


app.use(passport.initialize());
require('./config/passport')(passport);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
} else {
    app.get("/", (req, res) => {
        res.send("Initial creation");
    });
}

app.use("/api/users", users);
app.use("/api/itineraries", itineraries);
app.use("/api/attractions", attractions);


const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Listening on port ${port}`)});