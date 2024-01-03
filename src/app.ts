import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import usersRoutes from './routes/users/usersRoutes';
import gamesRoutes from './routes/games/gamesRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/users', usersRoutes);
app.use('/games', gamesRoutes);

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
