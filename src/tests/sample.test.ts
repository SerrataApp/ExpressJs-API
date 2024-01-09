import { User } from "@prisma/client";
import { createUser, deleteUser } from "../models/userModel"; // Update the path accordingly

describe('Test /users', () => {
  describe('Create user', () => {
    it('User should be OK', async () => {
      // Create a mock UserCreate object for testing
      const mockUserCreate = {
        username: 'test',
        email: 'test@example.com',
        password: 'password123',
        // Add other properties as needed for your UserCreate type
      };

      // Call the createUser function with the mockUserCreate object
      const result = await createUser(mockUserCreate as User);

      await deleteUser("test");
      // Add your assertions based on the expected behavior of the createUser function
      expect(result).toEqual(
        {"admin": false,
        "cgu": false, 
        "disabled": false, 
        "email": "test@example.com", 
        "id": 6, 
        "playedGames": 0,
        "signupDate": "2024-01-08T16:15:42.936Z", 
        "username": "test"}
      );

    });
  });
});