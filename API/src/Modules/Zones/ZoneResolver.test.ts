// API/src/Modules/Zones/ZoneModel.test.ts
import { factory } from 'API/Library/Factory';
import { User } from '../Users/UserModel';
import { UserRole } from '../Users/UserRole';
import { execute } from 'API/Library/execute';
import { getTestContext } from 'API/Context';
import { ZonePermissions, ZoneAccessPermission } from './ZonePermissionModel';
import { Zone } from './ZoneModel';
import { ResourceRecord } from '../ResourceRecords/ResourceRecordModel';

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

  test('User Authorized Zones', async () => {
    const user = await factory.for(User).create(1);

    const zone = await factory.for(Zone).create(1);

    await factory.for(ZonePermissions).create(1, {
      zoneId: zone.id,
      userId: user.id,
      accessPermissions: [ZoneAccessPermission.READ],
    });

    await factory
      .for(ResourceRecord)
      .state('NS')
      .create(1, { zoneId: zone.id });

    const { data, errors } = await execute(
      `query {
      zones {
        domainName
        id
        resourceRecords {
          host
          type
          value
        }
      }
    }`,
      await getTestContext(user.id),
    );

    expect(data.zones[0].domainName).toBe(zone.domainName);
    expect(data.zones[0].resourceRecords[0]).toBeDefined();
    expect(errors).toBeUndefined();
  });
});
