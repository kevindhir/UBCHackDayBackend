'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const emotionsApi = require('./emotionsApi').create();
const emailService = require('./email.js');
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectID = Schema.ObjectID;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


const mongoUri = 'mongodb://localhackday:testpassword@ds044667.mlab.com:44667/ubclocalhackday';
mongoose.connect(mongoUri);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error: '));
db.once('openUri', function () {
    console.log('Successfully connected to MongoDB');
});

const userSchema = new Schema({
    name: String,
    email: String,
    happiness: Number,
    sadness: Number
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(express.json());

const port = process.env.PORT || 8000

app.listen(port, () => console.log('Example app listening on port' + port));

const distance = function (x1, x2, y1, y2) {
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}


const getMatch = function (user) {


    User.find(function (err, users) {
        if (err) return console.error(err);

        console.log(users);
        console.log("LENGTH " + users.length);

        let happiness = user.happiness;
        let sadness = user.happiness;

        if (happiness === -1 || sadness === -1) {
            console.log("SOMETHING IS -1")
            return user;
        }

        let minDifference = Number.MAX_SAFE_INTEGER;
        console.log("minDiff is initialized");

        let bestMatch;

        for (let i = 0; i < users.length; i++) {
            let current = users[i];
            let currH = current.happiness;
            let currS = current.sadness;
            if (currH === 1 || currS === 1) {
                continue;
            }
            let diff = distance(happiness, sadness, currH, currS);
            console.log("diff is" + diff);
            if (diff < minDifference && diff !== 0) {
                minDifference = diff;
                bestMatch = current;
            }
        }

        console.log("minDiff is " + minDifference);
        return bestMatch;
    })
};

app.get('', function (request, response) {
    response.send('This is not the place for you to be.');
});

app.post('/submit', function (request, response) {
    console.log(request);
    const name = request.body.name.text;
    const email = request.body.email.text;
    const image = request.body.image;

    console.log(image);

    emotionsApi.getData(image, function (value) {
        let happiness = -1;
        let sadness = -1;

        if (value.hasOwnProperty("happiness") && value.hasOwnProperty("sadness")) {
            happiness = value.happiness;
            sadness = value.sadness;
        }

        const user = new User({
            name: name,
            email: email,
            happiness: happiness,
            sadness: sadness
        });

        let bestMatch = getMatch(user);

        user.save(function (err, value) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log(value);
        });

        const mailer = new emailService();
        mailer.sendEmail(email, bestMatch);
        response.send("sent email to" + email);
    });


});
