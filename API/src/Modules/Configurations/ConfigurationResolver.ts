// API/src/Modules/Configurations/ConfigurationResovler.ts
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from 'API/Modules/Users/UserModel';
import { UserRole } from 'API/Modules/Users/UserRole';
import { hasSetup } from 'API/Modules/Utilities/hasSetup';
import { Configuration } from './ConfigurationModel';
import { InitialConfigurationInput } from './InitialConfigurationInput';

@Resolver(() => Configuration)
export class ConfigurationResovler {
  @Query(() => Boolean)
  async hasSetup(): Promise<boolean> {
    return Configuration.hasCompletedSetup();
  }

  @hasSetup(false)
  @Mutation(() => Configuration)
  async initialConfiguration(@Arg('input')
  {
    initialUser: { password, ...initialUser },
  }: InitialConfigurationInput): Promise<Configuration> {
    const initialAdmin = User.create({
      ...initialUser,
      roles: [UserRole.USER, UserRole.ADMIN],
    });
    await initialAdmin.setPassword(password);
    await initialAdmin.save();

    return Configuration.create({ id: 1 }).save();
  }
}
