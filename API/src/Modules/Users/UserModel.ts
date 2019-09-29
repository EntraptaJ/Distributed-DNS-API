// API/src/Modules/Users/UserModel.ts
import { ObjectType, Field, ID, ArgumentValidationError } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from './UserRole';
import {
  validatePassword,
  generateToken,
  hashPassword,
} from '../Auth/AuthController';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('varchar')
  username: string;

  @Column('varchar')
  email: string;

  @Column({
    array: true,
    enum: UserRole,
    type: 'enum',
    default: [UserRole.USER],
  })
  roles: UserRole[];

  @Column('text')
  hashedPassword: string;

  async generateToken(plainText: string): Promise<string> {
    const valid = await validatePassword(plainText, this.hashedPassword);
    if (!valid)
      throw new ArgumentValidationError([
        {
          property: 'password',
          constraints: {
            isValid: 'Password Invalid',
          },
          children: [],
        },
      ]);
    return generateToken(this);
  }

  async setPassword(plainText: string): Promise<void> {
    this.hashedPassword = await hashPassword(plainText);
  }
}
