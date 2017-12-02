const express = require('express')
const app = express()
const emotionsApi = require('./emotionsApi').create();

emotionsApi.getData('http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg', function (data) {
    console.log('data retrieved');
    console.log(data);
});

const emailService = require('./email.js');
const app = express();
app.listen(8080, () => console.log('Example app listening on port 8080!'));

app.post('/submit', function (request, response) {
    const email = "kevinkdhir@gmail.com";

    const mailer = new emailService();
    mailer.sendEmail(email);

    response.send("sent email to" + email);
});
