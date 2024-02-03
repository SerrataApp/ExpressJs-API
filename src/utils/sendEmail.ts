import nodemailer from 'nodemailer';

export const sendEmail = async (receiverEmail: string, subject: string, body: string) => {
    const configTransporter = {
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_USER,
            pass: process.env.PASSWORD_USER,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
        }
    }

    const transporter = nodemailer.createTransport(configTransporter as nodemailer.TransportOptions);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: receiverEmail,
        subject: subject,
        html: body,
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log('Error occurs', err);
        }
    })
}