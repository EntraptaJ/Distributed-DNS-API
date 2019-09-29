// API/src/Modules/Users/UserResolver.ts
import { Resolver, Query } from 'type-graphql';
import { User } from './UserModel';

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }
}
