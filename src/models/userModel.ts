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

export interface UserCreate extends UserUpdate {
    id: number;
    password: string;
    cgu?: boolean;
}

export interface UserUpdate {
    username: string;
    email: string;
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

const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export async function getUserPublicDataByUsername(username: string): Promise<UserPublicData | null> {
    try {
        const user: UserPublicData | null = await prisma.user.findUnique({
            where: { username: username },
            select: {
                id: true,
                username: true,
                playedGames: true,
                signupDate: true,
            }
        });
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error in the getUser: ", error);
        throw error;
    }
}

export async function getUserPublicDataById(id: number): Promise<UserPublicData | null> {
    try {
        const user: UserPublicData | null = await prisma.user.findUnique({
            where: { id: id },
            select: {
                id: true,
                username: true,
                playedGames: true,
                signupDate: true,
            }
        });
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error in the getUser: ", error);
        throw error;
    }
}

export async function getUserPrivateData(username: string): Promise<UserPrivateData | null> {
    try {
        const user: UserPrivateData | null = await prisma.user.findUnique({
            where: { username: username }
        });
        if (user) {
            const { id, username, playedGames, email, signupDate, disabled, cgu, admin } = user;
            const UserPrivateData: UserPrivateData = { id, username, playedGames, email, signupDate, disabled, cgu, admin };
            return UserPrivateData;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error in the getUser: ", error);
        throw error;
    }
}

export async function getUserCreate(username: string): Promise<UserCreate | null> {
    try {
        const user: UserCreate | null = await prisma.user.findFirst({
            where: { OR: [
                {username: username},
                {email: username},
            ]},
        });
        if (user) {
            const { id, username, email, password } = user;
            const UserCreate: UserCreate = { id, username, email, password };
            return UserCreate;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error in the getUser: ", error);
        throw error;
    }
}

export async function createUser(newUser: UserCreate): Promise<UserPrivateData | Boolean> {
    if (validateEmail(newUser.email) == null)
        return false
    newUser.password = setPassword(newUser.password + process.env.SEL)
    try {
        const createUser = await prisma.user.create({
            data: newUser,
        });
        const { id, username, email, playedGames, signupDate, disabled, cgu, admin } = createUser;
        const userPrivateData: UserPrivateData = { id, username, email, playedGames, signupDate, disabled, cgu, admin }
        return userPrivateData;
    } catch (error) {
        console.error("Error in the createUser: ", error);
        throw error;
    }
}

export async function deleteUser(username: string): Promise<Boolean> {
    try {
        const userId = await getPlayerIdByUsername(username);
        if (userId) {
            await prisma.game.deleteMany({
                where: { playerId: userId }
            })
            await prisma.user.delete({
                where: { username: username }
            })
        }
        return true;
    } catch (error) {
        throw error;
    }
}

export async function updatePlayedGame(username: string): Promise<UserPublicData | null> {
    try {
        const user: UserPrivateData | null = await prisma.user.update({
            where: { username: username },
            data: {
                playedGames: {
                    increment: 1
                }
            }
        })
        return user;
    } catch (error) {
        throw error;
    }
}

export async function updatePlayerData(id: number, data: UserUpdate): Promise<UserUpdate | null | Boolean> {
    try {
        if (validateEmail(data.email) == null)
            return false
        const user: UserUpdate | null = await prisma.user.update({
            where: { id: id },
            data: {
                username: data.username,
                email: data.email
            }
        })
        return user;
    } catch (error) {
        console.error("Error in the updatePlayerData: ", error);
        throw error;
    }
}

export async function updatePassword(id: number, password: string): Promise<Boolean> {
    try {
        const newPassword = setPassword(password);
        await prisma.user.update({
            where: { id: id },
            data: { password: newPassword }
        });
        return true;
    } catch (error) {
        throw error;
    }
}

export async function getPlayerIdByUsername(username: string): Promise<number | null> {
    try {
        const user_id = await prisma.user.findUnique({
            where: {
                username: username
            },
            select: {
                id: true
            }
        });
        if (user_id)
            return user_id.id;
        else
            return null
    } catch (error) {
        throw error;
    }
}

export async function getPlayerUsernameById(id: number): Promise<string | null> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                username: true
            }
        });
        if (user)
            return user.username;
        else
            return null
    } catch (error) {
        throw error;
    }
}

export async function getUserAllData(id: number) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
            include: {
                Games: true,
                GameMode: true
            },
        })
        return user
    } catch (error) {
        throw error;
    }
}

export async function disableUser(id: number): Promise<Boolean> {
    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
            select: { disabled: true }
        });
        //@ts-ignore
        const newDisabledState = !user.disabled;

        await prisma.user.update({
            where: { id: id },
            data: { disabled: newDisabledState }
        });

        return newDisabledState;
    } catch (error) {
        throw error;
    }
}

export async function getAdminField(id: number): Promise<Boolean> {
    try {
        const userAdmin = await prisma.user.findUnique({
            where: { id: id },
            select: { admin: true }
        });
        //@ts-ignore
        return userAdmin.admin;
    } catch (error) {
        throw error;
    }
}

export async function turnOffCGU() {
    try {
        await prisma.user.updateMany({
            data: { cgu: false }
        })
        return;
    } catch (error) {
        throw error;
    }
}

export async function updateCGU(username: string) {
    try {
        await prisma.user.update({
            where: { username: username },
            data: { cgu: true }
        })
        return;
    } catch (error) {
        throw error;
    }
}

export async function getUserByEmail(email: string): Promise<UserPrivateData | null> {
    try {
        const user: UserPrivateData | null = await prisma.user.findUnique({
            where: { email: email }
        });
        if (user) {
            const { id, username, playedGames, email, signupDate, disabled, cgu, admin } = user;
            const UserPrivateData: UserPrivateData = { id, username, playedGames, email, signupDate, disabled, cgu, admin };
            return UserPrivateData;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}
