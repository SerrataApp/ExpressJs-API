import { Request, Response } from "express"
import { getUserByEmail } from "../../models/userModel"
import { genPassResetToken } from "../../utils/getToken";
import { sendEmail } from "../../utils/sendEmail";

export const getPassResetLink = async (req: Request, res: Response) => {
    try {
        if (!req.body.email)
            return res.status(400).json({ message: 'Email is required' })
        
        const user = await getUserByEmail(req.body.email);
        if (!user || !user.email)
            return res.status(404).json({ message: 'Email not found' })
    
        const token = genPassResetToken(user);
        console.log(token);
        const requrl = req.protocol + '://' + req.get('host') + '/resetPassword/';
        const resetLink = `<a target='_blank' href='${requrl}/${user.id}/${token}'>Password Reset Link</a>`;
        sendEmail(req.body.email, 'Password Reset Link', resetLink);
        res.status(200).json({ message: 'Password reset link sent to your email' })
    
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to send email" })
    }
}