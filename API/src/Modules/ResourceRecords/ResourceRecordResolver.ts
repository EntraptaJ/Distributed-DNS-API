// API/src/Modules/ResourceRecords/ResourceRecordResolver.ts
import { Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { CreateValueResourceRecordInput } from './CreateResourceRecordInput';
import { ResourceRecord } from './ResourceRecordModel';
import { Zone } from '../Zones/ZoneModel';
import { AuthContext } from 'API/Context';
import { ZoneAccessPermission } from '../Zones/ZonePermissionModel';
import { subscriberPubSub } from '../Subscribers/SubscriptionPubSub';

@Resolver(() => ResourceRecord)
export class ResourceRecordResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async createValueResourceRecord(
    @Arg('input') { zoneId, value, ...type }: CreateValueResourceRecordInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<boolean> {
    const zone = await Zone.getUserZone(
      currentUser,
      zoneId,
      ZoneAccessPermission.WRITE,
      { relations: ['resourceRecords'] },
    );
    await ResourceRecord.create({
      zoneId: zone.id,
      data: JSON.stringify({ value }),
      ...type,
    }).save();

    subscriberPubSub.publish(zone.id, zone);

    return true;
  }
}
