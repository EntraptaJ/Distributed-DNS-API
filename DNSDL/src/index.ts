// DNSDL/src/index.ts
import { initApollo } from './initApollo';
import { Zones, ZonesQuery } from './Zones.gen';
import { createConfig } from './namedConf';
import { createZoneFile } from './ZoneFile';
const Domains: string[] = [];

async function startDNSDL(): Promise<void> {
  const client = initApollo({ URL: 'http://localhost/graphql' });

  const { data } = await client.query<ZonesQuery>({ query: Zones });

  for (const zone of data.zones) {
    Domains.push(zone.domainName);

    createZoneFile(zone.resourceRecords, zone.domainName);
  }

  await createConfig(Domains);

  console.log('Starting DNSDL');
}

startDNSDL();
