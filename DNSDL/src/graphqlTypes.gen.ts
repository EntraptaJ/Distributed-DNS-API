export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AuthResponse = {
   __typename?: 'AuthResponse',
  token: Scalars['String'],
  currentUser: CurrentUser,
};

export type Configuration = {
   __typename?: 'Configuration',
  id: Scalars['ID'],
};

export type CreateUtilityInput = {
  name: Scalars['String'],
};

export type CreateValueResourceRecordInput = {
  domainName: Scalars['String'],
  type: ResourceRecordType,
  host: Scalars['String'],
  value: Scalars['String'],
};

export type CurrentUser = {
   __typename?: 'CurrentUser',
  id: Scalars['ID'],
  username: Scalars['String'],
  email: Scalars['String'],
  roles: Array<UserRole>,
};

export type InitialConfigurationInput = {
  initialUser: UserInput,
};

export type LoginInput = {
  username: Scalars['String'],
  password: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  login: AuthResponse,
  register: RegisterResponse,
  resetPasswordReset: Scalars['Boolean'],
  initialConfiguration: Configuration,
  createValueResourceRecord: Scalars['Boolean'],
  createUtility: Utility,
  createZone: Zone,
};


export type MutationLoginArgs = {
  input: LoginInput
};


export type MutationRegisterArgs = {
  input: RegisterInput
};


export type MutationResetPasswordResetArgs = {
  input: RequestPasswordResetInput
};


export type MutationInitialConfigurationArgs = {
  input: InitialConfigurationInput
};


export type MutationCreateValueResourceRecordArgs = {
  input: CreateValueResourceRecordInput
};


export type MutationCreateUtilityArgs = {
  input: CreateUtilityInput
};


export type MutationCreateZoneArgs = {
  input: ZoneInput
};

export type Query = {
   __typename?: 'Query',
  currentUser: User,
  hasSetup: Scalars['Boolean'],
  users: Array<User>,
  utilities: Array<Utility>,
  helloWorld: Scalars['String'],
  zones: Array<Zone>,
};

export type RegisterInput = {
  username: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export type RegisterResponse = {
   __typename?: 'RegisterResponse',
  success: Scalars['Boolean'],
  token: Scalars['String'],
  currentUser: CurrentUser,
};

export type RequestPasswordResetInput = {
  email: Scalars['String'],
};

export type ResetPasswordInput = {
  token: Scalars['String'],
  password: Scalars['String'],
};

export type ResourceRecord = {
   __typename?: 'ResourceRecord',
  id: Scalars['ID'],
  type: ResourceRecordType,
  host: Scalars['String'],
  /** JSON Stringified data */
  data: Scalars['String'],
};

export enum ResourceRecordType {
  A = 'A',
  Ns = 'NS'
}

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  username: Scalars['String'],
};

export type UserInput = {
  username: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export enum UserRole {
  Guest = 'GUEST',
  User = 'USER',
  Admin = 'ADMIN'
}

export type Utility = {
   __typename?: 'Utility',
  id: Scalars['ID'],
  name: Scalars['String'],
};

export type Zone = {
   __typename?: 'Zone',
  id: Scalars['ID'],
  domainName: Scalars['String'],
  resourceRecords: Array<ResourceRecord>,
};

export type ZoneInput = {
  domainName: Scalars['String'],
};
export type ZonesQueryVariables = {};


export type ZonesQuery = (
  { __typename?: 'Query' }
  & { zones: Array<(
    { __typename?: 'Zone' }
    & Pick<Zone, 'domainName' | 'id'>
    & { resourceRecords: Array<(
      { __typename?: 'ResourceRecord' }
      & Pick<ResourceRecord, 'id' | 'type' | 'host' | 'data'>
    )> }
  )> }
);
