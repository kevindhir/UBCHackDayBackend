'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const emailService = require('./email.js');
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectID = Schema.ObjectID;


const mongoUri = 'mongodb://localhackday:testpassword@ds044667.mlab.com:44667/ubclocalhackday';
mongoose.connect(mongoUri);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error: '));
db.once('openUri', function () {
    console.log('Successfully connected to MongoDB');
});

//defining ticket model
const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    happiness: Number,
    sadness: Number
});

const User = mongoose.model('User', userSchema);


app.use(bodyParser.json());
app.use(express.json());

app.listen(8080, () => console.log('Example app listening on port 8080!'));

app.post('/submit', function (request, response) {
    const email = request.body.email;
    const user = new User({
        first_name: "Kevin",
        last_name: "Dhir",
        email: email,
        happiness: -1,
        sadness: -1
    });

    user.save(function (err, value) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(value);
    });


    const mailer = new emailService();
    mailer.sendEmail(email);
    response.send("sent email to" + email);
});

