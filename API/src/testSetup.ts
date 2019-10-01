import './Setup';
import { createConnection } from 'typeorm';
import { getConnectionArgs } from 'API/Library/getDbConnection';

export default async function(): Promise<void> {
  console.log('Setup Tests');
  const connection = await createConnection(getConnectionArgs(true));
  await connection.dropDatabase();
  await connection.synchronize();
  await connection.close();
}
