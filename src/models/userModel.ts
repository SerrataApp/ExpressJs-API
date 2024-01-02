import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export interface UserPrivateData extends UserPublicData {
    email: string;
    signupDate: Date;
    disabled: boolean;
    cgu: boolean;
    admin: boolean;
}

export interface UserCreate {
    username: string;
    email: string;
    password: string;
}

export interface UserPublicData {
    id: number;
    username: string;
    playedGames: number;
}

export async function getUser(id: number): Promise<UserPublicData | null> {
    const user: UserPublicData | null = await prisma.user.findUnique({
        where: { id: id }
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

export async function createUser(newUser: UserCreate): Promise<UserPrivateData | null> {
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