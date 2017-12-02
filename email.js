const nodemailer = require('nodemailer');


class EmailService {


    constructor() {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ubcneedafriend@gmail.com',
                pass: 'ubclocalhackday'
            }
        });

        this.transporter = transporter;

        this.transporter.verify(function (error, success) {
            if (error) {
                console.log("error with transporter");
                console.log(error);
            } else {
                console.log('Server is ready to take our messages');
            }
        })
    }

    sendEmail(recipient) {
        if (this.transporter == null) {
            this.constructor();
        }

        const transporter = this.transporter;

        let mailOptions = {
            from: '"Friend Finder" <ubcneedafriend@gmail.com>', // sender address
            to: recipient,
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };


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

