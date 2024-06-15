import nodemailer from 'nodemailer'

async function sendEmail() {
    // Configure the transporter
    let transporter = nodemailer.createTransport({
        host: 'mail.arunshaw.in',
        port: 587,
        secure: true, // Use SSL/TLS
        auth: {
            user: 'info@arunshaw.in', // your email
            pass: 'password' // your password
        },
        tls: {
            rejectUnauthorized: true
        }
    });

    // Define email options
    let mailOptions = {
        from: '"Example User" <info@arunshaw.in>', // sender address
        to: 'arunshaw433@gmail.com', // list of receivers
        subject: 'Hello', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Test email from smtp </b>' // html body
    };

    // Send mail

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info);
    } catch (error) {
        console.log(error);
    }

}

sendEmail()
