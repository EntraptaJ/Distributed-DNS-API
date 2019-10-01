// API/src/Modules/Zones/ZoneModel.test.ts
import { factory } from 'API/Library/Factory';
import { User } from '../Users/UserModel';
import { UserRole } from '../Users/UserRole';
import { execute } from 'API/Library/execute';
import { getTestContext } from 'API/Context';

describe('Zone Model', () => {
  test('Create Zone & Permissions', async () => {
    const user = await factory
      .for(User)
      .state(UserRole.ADMIN)
      .create(1);

    const createZoneResponse = await execute(
      `mutation {
        createZone(
          input: {
            zoneOwnerUserId: "${user.id}"
            domainName: "example.com",
            contact: "me.example.com.",
            ns: "ns1.kristianjones.dev."
          }
        ) {
          domainName
          id
        }
      }
    `,
      await getTestContext(user.id),
    );

    expect(createZoneResponse.data.createZone.domainName).toBe('example.com');
    expect(createZoneResponse.errors).toBeUndefined();
  });
});
