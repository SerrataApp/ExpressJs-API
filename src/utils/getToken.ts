import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";

export const getToken = (
    user: any,
    secret: string,
    expiresIn: string,
    tokenId?:string,
) => {
    const {id, username, email} = user;
    const jwtid = tokenId || randomUUID();
    const token = jwt.sign(
        {jwtid, id , username, email},
        secret,
        {algorithm: "HS256", expiresIn}
    );

    return token;
}

export const genPassResetToken = (user: any) => {
    return getToken(user, process.env.PASS_RESET_SECRET!, "5m");
}