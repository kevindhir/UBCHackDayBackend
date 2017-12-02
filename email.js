const nodemailer = require('nodemailer');
const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: 'ubcneedafriend@gmail.com',
        pass: 'ubclocalhackday'
    }
};


class EmailService {


    constructor() {
        this.transporter = nodemailer.createTransport(smtpConfig);
        transport.verify(function (error, success) {
            if (error) {
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

        let mailOptions = {
            from: '"Friend Finder" <ubcneedafriend@gmail.com>', // sender address
            to: recipient,
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };

    };


}

module.exports = EmailService;

