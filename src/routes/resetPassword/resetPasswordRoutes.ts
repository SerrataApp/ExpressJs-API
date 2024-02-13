import express from "express";
import { getPassResetLink, resetPassword } from "../../controllers/resetPasswordController/passResetController";
import { verifyTokenResetToken } from "../../middleware/resetPasswordMiddleware";

const router = express.Router();

router.post('/', getPassResetLink);
router.get('/pass-reset/:userId/:token', (req, res) => {
    const { userId, token } = req.params

    res.send(`<form action="/resetpassword/pass-reset/${userId}/${token}" method="POST">
             <input type="password" name="password" value="" placeholder="Enter your new password..." /> 
             <input type="submit" value="Reset Password" />
             </form>`)
});
router.post('/pass-reset/:userId/:token', verifyTokenResetToken, resetPassword);

export default router;