import nodemailer from 'nodemailer';

export const sendEmail = async (receiverEmail: string, subject: string, body: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.PASSWORD_USER,
        }
    })

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
            console.log('Email sent!!!' + data.response);
        }
    })
}