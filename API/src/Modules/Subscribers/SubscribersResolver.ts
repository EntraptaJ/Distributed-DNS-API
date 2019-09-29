// API/src/Modules/Subscribers/SubscribersResolver.ts
import {
  Resolver,
  Mutation,
  Arg,
  Authorized,
  Ctx,
  Query,
  Subscription,
  Root,
} from 'type-graphql';
import { Subscriber } from './SubscriberModel';
import { CreateSubscriberInput } from './CreateSubscriberInput';
import { Zone } from '../Zones/ZoneModel';
import { AuthContext } from 'API/Context';
import { ZoneAccessPermission } from '../Zones/ZonePermissionModel';
import { subscriberPubSub } from './SubscriptionPubSub';

@Resolver(() => Subscriber)
export class SubscribersResolver {
  @Query(() => [Zone])
  async getSubscribedZones(
    @Arg('subscriberToken') subscriberToken: string,
  ): Promise<Zone[]> {
    const subscriber = await Subscriber.getSubscriberFromToken(subscriberToken);
    return subscriber.subscribedZones;
  }

  @Authorized()
  @Mutation(() => Subscriber)
  async createSubscriber(
    @Arg('input') { zoneIds }: CreateSubscriberInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Subscriber> {
    const zonePromises: Promise<Zone>[] = [];

    for (const zoneId of zoneIds)
      zonePromises.push(
        Zone.getUserZone(currentUser, zoneId, ZoneAccessPermission.ADMIN),
      );

    const zones = await Promise.all(zonePromises);

    const subscriber = await Subscriber.create({
      subscribedZones: zones,
    }).save();

    return subscriber;
  }

  @Subscription({
    // @ts-ignore
    subscribe: async (stuff, args) =>
      subscriberPubSub.subscribe(args.subscriberToken),
  })
  subscribeToZones(
    @Arg('subscriberToken') subscriberToken: string,
    @Root() root: Zone,
  ): Zone {
    return root;
  }
}
