// API/src/Modules/Subscribers/SubscriptionPubSub.ts
import { EventEmitter } from 'events';
import { Subscriber } from './SubscriberModel';
import pEvent from 'p-event';
import { Zone } from '../Zones/ZoneModel';

export class SubscriberPubSub {
  public ee = new EventEmitter();

  public async publish(zoneId: string, payload: Zone) {
    console.log(zoneId, payload);
    this.ee.emit(zoneId, payload);
  }

  public async subscribe(
    subscriberToken: string,
  ): Promise<AsyncIterator<Zone>> {
    const subscription = await Subscriber.getSubscriberFromToken(
      subscriberToken,
    );

    const zoneIds: string[] = [];

    for (const { id } of subscription.subscribedZones) zoneIds.push(id);

    return pEvent.iterator(this.ee, zoneIds, {
      resolutionEvents: ['end'],
    });
  }
  public async unsubscribe(subId: number) {}
}

export const subscriberPubSub = new SubscriberPubSub();
