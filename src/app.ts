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
import { ensureAuthenticated } from "./middleware/loginMiddleware";
import { isAdmin } from "./middleware/adminMiddleware";

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
app.use('/mode', modeRoutes);

app.get('/', (req: Request, res: Response) => {
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
