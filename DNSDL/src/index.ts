// DNSDL/src/index.ts
import { initApollo } from './initApollo';
import { getSubscribedZones, subscribeToZone } from './Subscriber';
import { handleZone } from './Zone';
import { generateZoneFile } from 'ts-zone-file';
import { outputFile } from 'fs-extra';

const DATA_VOLUME =
  process.env.NODE_ENV === 'production'
    ? process.env.DATA_VOLUME || '/data'
    : 'data';

const subscriberToken = process.env.SUBSCRIBER_TOKEN;

async function startDNSDL(): Promise<void> {
  console.log('Starting DNSDL');
  const client = initApollo({ URL: 'http://localhost/graphql' });

  console.log('Fetching subscribed Zones');
  const {
    data: { getSubscribedZones: zones }
  } = await getSubscribedZones({ client, subscriberToken });

  for (const zone of zones) {
    const Zone = await handleZone(zone);
    await outputFile(
      `${DATA_VOLUME}/${zone.domainName}`,
      await generateZoneFile(Zone)
    );
  }

  console.log('Subscribing to changes');

  const subscription = await subscribeToZone({ client, subscriberToken });
  subscription.subscribe({
    async next({ data: { subscribeToZones } }) {
      console.log('Recieved new zone');
      const Zone = await handleZone(subscribeToZones);
      await outputFile(
        `${DATA_VOLUME}/${Zone.$origin}`,
        await generateZoneFile(Zone)
      );
    }
  });
}

startDNSDL();
