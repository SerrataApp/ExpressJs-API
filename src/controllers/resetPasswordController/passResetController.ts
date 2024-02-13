import { Request, Response } from "express"
import { getUserByEmail, updatePassword } from "../../models/userModel"
import { genPassResetToken } from "../../utils/getToken";
import { sendEmail } from "../../utils/sendEmail";
import { Prisma } from "@prisma/client";
import { addGitHubIssue } from "../../utils/githubIssues";

export const getPassResetLink = async (req: Request, res: Response) => {
    try {
        if (!req.body.email)
            return res.status(400).json({ message: 'Email is required' })
        
        const user = await getUserByEmail(req.body.email);
        if (!user || !user.email)
            return res.status(404).json({ message: 'Email not found' })
    
        const token = genPassResetToken(user);
        const requrl = req.protocol + '://' + req.get('host') + '/resetpassword/pass-reset';
        const url = process.env.REDIRECT_URL || requrl;

        const resetLink = `
        Cher client, <br><br>

        Nous avons bien reçu votre demande de réinitialisation de mot de passe. Pour procéder à cette opération, veuillez cliquer sur le lien ci-dessous :<br><br>
        
        <a target='_blank' href='${url}/${user.id}/${token}'>Lien de résinitialisation de mot de passe</a><br><br>
        
        Assurez-vous de compléter cette démarche dans les 5 minutes après l'envoi du mail pour des raisons de sécurité. Si vous n'avez pas initié cette demande, veuillez ignorer ce message.<br><br>
        
        Merci de faire partie de notre communauté.<br><br>
        
        Cordialement,<br>
        L'équipe de support de Drapito
        `;

        sendEmail(req.body.email, 'Demande de réinitialisation de mot de passe', resetLink);
        res.status(200).json({ message: 'Password reset link sent to your email' })
    
    } catch (error) {
        res.status(500).json({ message: "Failed to send email" })
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const user = parseInt(req.params.userId as string, 10);
        const password = req.body.password;
        await updatePassword(user, password);
        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            addGitHubIssue(error)
            
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}