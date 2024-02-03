import nodemailer from 'nodemailer';

export const sendEmail = async (receiverEmail: string, subject: string, body: string) => {
    const service = process.env.EMAIL_SERVICE as string;
    const configTransporter = {
        service,
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_USER,
            pass: process.env.PASSWORD_USER,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
        }
    }

    const transporter = nodemailer.createTransport(configTransporter);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: receiverEmail,
        subject: subject,
        text: body,
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log('Error occurs', err);
        } else {
            console.log('Email sent!!!');
        }
    })
}