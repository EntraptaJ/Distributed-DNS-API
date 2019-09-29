// API/src/Modules/ResourceRecords/ResourceRecordModel.ts
import { ObjectType, ID, Field } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { ResourceRecordType } from './ResourceRecordTypes';
import { Zone } from '../Zones/ZoneModel';

@ObjectType()
@Entity()
export class ResourceRecord extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field(() => ResourceRecordType)
  @Column({ type: 'enum', enum: ResourceRecordType })
  type: ResourceRecordType;

  @Field()
  @Column('varchar')
  host: string;

  @Field({ description: 'JSON Stringified data' })
  @Column('text')
  data: string;

  @ManyToOne(() => Zone)
  zone: Zone;
  @Column()
  zoneId: string;
}
