// DNSDL/src/ZoneFile.ts
import { generateZoneFile } from 'ts-zone-file';
import { ResourceRecord, ResourceRecordType } from './graphqlTypes.gen';
import { outputFile } from 'fs-extra';

export async function createZoneFile(
  resourceRecords: ResourceRecord[],
  domainName: string
): Promise<void> {
  const zoneFile = await generateZoneFile({
    soa: {
      contact: 'me@kristianjones.xyz',
      serial: '1',
      refresh: '2500',
      retry: '2500',
      expire: '2500',
      mttl: '300'
    },
    $origin: domainName,
    ns: [{ host: '@', value: 'ns1.kristianjones.dev' }],
    a: resourceRecords.filter(({ type }) => type === ResourceRecordType.A).map(({ host, data }) => ({ host, ...JSON.parse(data) }))
  });
  return outputFile(`zone/${domainName}`, zoneFile)
}
