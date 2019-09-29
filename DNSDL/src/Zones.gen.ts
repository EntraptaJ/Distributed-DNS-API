import * as Types from './graphqlTypes.gen';

import gql from 'graphql-tag';

export const Zones = gql`
    query Zones {
  zones {
    domainName
    id
    resourceRecords {
      id
      type
      host
      data
    }
  }
}
    `;export type ZonesQueryVariables = {};


export type ZonesQuery = (
  { __typename?: 'Query' }
  & { zones: Array<(
    { __typename?: 'Zone' }
    & Pick<Types.Zone, 'domainName' | 'id'>
    & { resourceRecords: Array<(
      { __typename?: 'ResourceRecord' }
      & Pick<Types.ResourceRecord, 'id' | 'type' | 'host' | 'data'>
    )> }
  )> }
);
