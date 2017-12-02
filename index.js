const express = require('express');
const emailService = require('./email.js');
const app = express();
app.listen(8080, () => console.log('Example app listening on port 8080!'));

app.post('/submit', function (request, response) {
    const email = "kevinkdhir@gmail.com";

    const mailer = new emailService();
    mailer.sendEmail(email);

    response.send("sent email to" + email);
});