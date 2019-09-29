// API/Modules/User/UserFactory.ts
import { DeepEntityPartial } from '@entity-factory/core';
import { TypeormBlueprint } from '@entity-factory/typeorm';
import { User } from './UserModel';
import { hashPassword } from '../Auth/AuthController';

export class UserFactory extends TypeormBlueprint<User> {
  constructor() {
    super();

    this.type(User);

    this.define(
      async ({ faker, factory }): Promise<DeepEntityPartial<User>> => {
        const firstName = faker.name.firstName();
        return {
          username: firstName,
          hashedPassword: await hashPassword('password'),
          email: faker.internet.email(firstName),
        };
      },
    );
  }
}
