const nodemailer = require('nodemailer');


class EmailService {


    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ubcneedafriend@gmail.com',
                pass: ''
            }
        });

        this.transporter.verify(function (error, success) {
            if (error) {
                console.log("error with transporter");
                console.log(error);
            } else {
                console.log('Server is ready to take our messages');
            }
        })
    }

    sendEmail(recipient, user) {
        if (this.transporter == null) {
            this.constructor();
        }

        const transporter = this.transporter;

        let mailOptions;

        if (typeof user !== 'undefined' && user) {
            mailOptions = {
                from: '"Connect Two" <ubcneedafriend@gmail.com>', // sender address
                to: recipient,
                subject: 'We found you a connection!', // Subject line
                text: `We would like to introduce you to ${user.name}! You two have similar traits. You can contact them at ${user.email}` // plain text body
            };
        } else {
            mailOptions = {
                from: '"Connect Two" <ubcneedafriend@gmail.com>', // sender address
                to: recipient,
                subject: 'We found you a connection!', // Subject line
                text: 'Hi John, we found you someone to chat with! Minnie Liu has similar traits to you. You can contact her at minnie@alumni.ubc.ca'
            };
        }


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });

    };


}

module.exports = EmailService;

