// API/src/Modules/Auth/AuthResolver.ts
import { execute } from 'API/Library/execute';
import { factory } from 'API/Library/Factory';
import { User } from 'API/Modules/Users/UserModel';
import { Configuration } from '../Configurations/ConfigurationModel';

describe('Authentication Resolver', () => {
  test('Login Test User', async () => {
    const configuration = await factory.for(Configuration).create(1);
    const user = await factory.for(User).create(1);

    const { data, errors } = await execute(
      `mutation { 
        login(input: { username: "${user.username}", password: "password" }) {
          token
        }
      }`,
      { currentUser: undefined },
    );

    expect(data.login.token).toBeDefined();
    expect(errors).toBeUndefined();
    await Promise.all([user.remove(), configuration.remove()]);
  });

  test('Sign Up User', async () => {
    const configuration = await factory.for(Configuration).create(1);

    const { data, errors } = await execute(`mutation {
      register(
        input: {
          username: "TestUser1"
          email: "testuser@example.com"
          password: "password"
        }
      ) {
        token
      }
    }
    `);

    expect(data.register.token).toBeDefined();
    expect(errors).toBeUndefined();

    configuration.remove();
  });
});
