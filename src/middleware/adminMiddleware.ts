//@ts-nocheck

import { Request, Response, NextFunction } from 'express';
import { getAdminField } from '../models/userModel';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userAdmin: Boolean = await getAdminField(req.user.id);
        if (userAdmin === true)
            return next();
        else
            res.status(401).json({ message: "You are not admin" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Administrator status check error' });
    }
}