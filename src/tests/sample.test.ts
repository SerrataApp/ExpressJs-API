import { PrismaClient } from "@prisma/client";
import { UserCreate, UserPrivateData, UserPublicData, createUser, deleteUser, getUserPublicDataByUsername } from "../models/userModel"; // Update the path accordingly

const prisma = new PrismaClient();

const mockUserCreate = {
  username: 'test123',
  email: 'test123@example.com',
  password: 'password123',
};

describe('Test /users', () => {
  // it('User should be OK', async () => {

  //   let result: UserPrivateData | Boolean | null = await createUser(mockUserCreate as UserCreate);

  //   const test = {
  //     //@ts-ignore
  //     id: result.id,
  //     //@ts-ignore
  //     signupDate: result.signupDate,
  //     admin: false,
  //     cgu: false,
  //     disabled: false,
  //     email: "test123@example.com",
  //     playedGames: 0,
  //     username: "test123"
  //   };

  //   await deleteUser("test123");

  //   expect(result).toEqual(test);

  // });
  // // get user public data by username
  // it('User should be OK', async () => {
  //   let result: UserPublicData | null = await getUserPublicData(mockUserCreate.username);

  //   console.log(result);
    
  //   const test = {

  //     playedGames: 0,
  //     username: mockUserCreate.username
  //   };

  //   await deleteUser("test123");

  //   expect(result).toEqual(test);
  // });
});