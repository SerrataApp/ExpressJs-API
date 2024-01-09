import { User } from "@prisma/client";
import { UserPrivateData, createUser, deleteUser } from "../models/userModel"; // Update the path accordingly

describe('Test /users', () => {
  describe('Create user', () => {
    it('User should be OK', async () => {
      // Create a mock UserCreate object for testing
      const mockUserCreate = {
        username: 'test123',
        email: 'test123@example.com',
        password: 'password123',
        // Add other properties as needed for your UserCreate type
      };

      // Call the createUser function with the mockUserCreate object
      let result: UserPrivateData | Boolean | null = await createUser(mockUserCreate as User);

      const { id, signupDate, ...expectedResult } = {
        //@ts-ignore
        id: result?.id,
        //@ts-ignore
        signupDate: result?.signupDate,
        admin: false,
        cgu: false,
        disabled: false,
        email: "test123@example.com",
        playedGames: 0,
        username: "test123"
      };


      await deleteUser("test123");
      // Add your assertions based on the expected behavior of the createUser function
      expect(result).toEqual(expectedResult);

    });
  });
});