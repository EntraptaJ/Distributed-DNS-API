// DNSDL/src/namedConf.ts
import { generateConfig } from 'ts-zone-file';
import { outputFile } from 'fs-extra';

export async function createConfig(domains: string[]): Promise<void> {
  const bindConfig = await generateConfig({
    zones: domains.map(domainName => ({
      type: 'master',
      name: domainName,
      file: `/Zones/${domainName}`
    })),
    options: {
      directory: '/var/bind',
      listenOn: ['any']
    }
  });

  return outputFile('named.conf', bindConfig)
}
