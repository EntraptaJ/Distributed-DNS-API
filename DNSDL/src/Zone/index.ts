// DNSDL/src/Zone/index.ts
import { ZONE } from 'ts-zone-file';
import { ZoneFragment } from './Zone.gen';
import { handleResourceRecords } from '../ResourceRecords/index';

export async function handleZone(zone: ZoneFragment): Promise<ZONE> {
  const zoneFile: ZONE = {
    soa: {
      contact: 'me@kristianjones.xyz',
      serial: '1',
      refresh: '2500',
      retry: '2500',
      expire: '2500',
      mttl: '300'
    },
    $origin: zone.domainName,
    ns: []
  };

  await handleResourceRecords(zone.resourceRecords, zoneFile);

  return zoneFile;
}
