// API/src/Modules/ResourceRecords/ResourceRecordTypes.ts
import { registerEnumType } from 'type-graphql'

export enum ResourceRecordType {
  A = 'A',
  NS = 'NS'
}

registerEnumType(ResourceRecordType, { name: 'ResourceRecordType' })