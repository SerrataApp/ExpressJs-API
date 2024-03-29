import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import usersRoutes from './routes/users/usersRoutes';
import gameRoutes from './routes/games/gameRoutes';
import gamesRoutes from './routes/games/gamesRoutes';
import adminRoutes from './routes/admin/adminRoutes'
import imageRoutes from './routes/images/imageRoutes'
import gameModeRoutes from './routes/gameModes/gameModeRoutes'
import modeRoutes from './routes/modes/modesRoutes'
import resetPasswordRoutes from "./routes/resetPassword/resetPasswordRoutes";
import { ensureAuthenticated } from "./middleware/loginMiddleware";
import { isAdmin } from "./middleware/adminMiddleware";
import { isModeOwner } from "./middleware/modeMiddleware";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/users', usersRoutes);
app.use('/game', gameRoutes);
app.use('/games', gamesRoutes);
app.use('/admin', ensureAuthenticated, isAdmin, adminRoutes);
app.use('/image', imageRoutes);
app.use('/gameMode', gameModeRoutes);
app.use('/mode', ensureAuthenticated, isModeOwner, modeRoutes);
app.use('/resetpassword', resetPasswordRoutes);

app.get('/', (req: Request, res: Response) => {
    console.log(
        req.ip,
    );
    res.status(200).json({
        message: "Hello Wolrd!"
    })
})

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

app.use((err: Error, req: Request, res: Response) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' })
});

app.listen(port as number, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});
