// API/src/Modules/Users/UserInput.ts
import { InputType, Field } from 'type-graphql';
import { User } from './UserModel';
import { IsEmail } from 'class-validator';

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
