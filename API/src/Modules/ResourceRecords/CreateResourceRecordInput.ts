// API/src/Modules/ResourcesRecord/CreateResourceRecordInput.ts
import { InputType, Field } from 'type-graphql';
import { ResourceRecord } from './ResourceRecordModel';
import { ResourceRecordType } from './ResourceRecordTypes';

@InputType()
export class CreateValueResourceRecordInput implements Partial<ResourceRecord> {
  @Field()
  zoneId: string;

  @Field(() => ResourceRecordType)
  type: ResourceRecordType;

  @Field()
  host: string;

  @Field()
  value: string;
}
