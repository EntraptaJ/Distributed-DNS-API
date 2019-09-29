// API/src/Modules/Auth/AuthResolver.ts
import { execute } from 'API/Library/execute';
import { factory } from 'API/Library/Factory';
import { User } from 'API/Modules/Users/UserModel';

describe('Authenication Resolver', () => {
  test('Login Test User', async () => {
    const user = await factory.for(User).create(1);

    const response = await execute(
      `mutation { 
        login(input: { username: "${user.username}", password: "password" }) {
          token
        }
      }`,
      { currentUser: undefined },
    );

    expect(typeof response.data.login.token === 'string').toBe(true);
    await user.remove();
  });
});
