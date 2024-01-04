import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

//-------------Schemas de données-------------

export interface UserPrivateData extends UserPublicData {
    email: string;
    signupDate: Date;
    disabled: boolean;
    cgu: boolean;
    admin: boolean;
}

export interface UserCreate {
    id: number;
    username: string;
    email: string;
    password: string;
}

export interface UserPublicData {
    id: number;
    username: string;
    playedGames: number;
}

//-------------Fonctions de traitement-------------

function setPassword(value: String) {
    const buffer: Buffer = Buffer.from(value, 'utf-8');
    return bcrypt.hashSync(buffer, 10);
}

export async function getUserPublicData(username: string): Promise<UserPublicData | null> {
    const user: UserPublicData | null = await prisma.user.findUnique({
        where: { username: username }
    });
    if (user) {
        const { id, username, playedGames } = user;
        const userPublicData: UserPublicData = { id, username, playedGames };
        console.log(userPublicData);
        return userPublicData;
    } else {
        return null;
    }
}

export async function getUserPrivateData(username: string): Promise<UserPrivateData | null> {
    const user: UserPrivateData | null = await prisma.user.findUnique({
        where: { username: username }
    });
    if (user) {
        const { id, username, playedGames, email, signupDate, disabled, cgu, admin } = user;
        const UserPrivateData: UserPrivateData = { id, username, playedGames, email, signupDate, disabled, cgu, admin };
        console.log(UserPrivateData);
        return UserPrivateData;
    } else {
        return null;
    }
}

export async function getUserCreate(username: String): Promise<UserCreate | null> {
    const user: UserCreate | null = await prisma.user.findUnique({
        where: { username: username }
    });
    if (user) {
        const { id, username, email, password } = user;
        const UserCreate: UserCreate = { id, username, email, password };
        return UserCreate;
    } else {
        return null;
    }
}

export async function createUser(newUser: UserCreate): Promise<UserPrivateData | null> {
    newUser.password = setPassword(newUser.password)
    const createUser = await prisma.user.create({
        data: newUser,
    });
    if (createUser) {
        const { id, username, email, playedGames, signupDate, disabled, cgu, admin } = createUser;
        const userPrivateData: UserPrivateData = { id, username, email, playedGames, signupDate, disabled, cgu, admin }
        console.log(userPrivateData);
        return userPrivateData;
    } else {
        return null;
    }
}

export async function deleteUserMe(username: string): Promise<UserPrivateData | null> {
    const user: UserPrivateData | null = await prisma.user.delete({
        where: { username: username }
    })
    return user;
}

export async function updatePlayedGame(username: string): Promise<UserPublicData | null> {
    const user: UserPrivateData | null = await prisma.user.update({
        where: { username: username },
        data: {
            playedGames: {
                increment: 1
            }
        }
    })
    return user;
}

export async function getPlayerIdByUsername(username: string): Promise<number> {
    const user_id = await prisma.user.findUnique({
        where: {
            username: username
        },
        select: {
            id: true
        }
    });
    return user_id.id;
}