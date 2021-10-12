import { gql, useQuery } from '@apollo/client';

import { client } from '../../services/apollo';
import { ProjectSales } from '../../types/ProjectType';

interface ProjectsHook {
  loading: boolean;
  data: ProjectSales | undefined;
}

export const useSingleProject = (id?: string): ProjectsHook => {
  if (id) {
    const { data, loading } = useQuery(FETCH_SINGLE_PROJECT_DATA, {
      client,
      variables: {
        id,
      },
    });

    return { data, loading };
  } else {
    return {
      data: undefined,
      loading: false,
    };
  }
};

const FETCH_SINGLE_PROJECT_DATA = gql(
  `
    query Projects($id: String) {
      sales(where: { id: $id }) {
        id
        token {
          id
          decimals
          walletAddress
        }
        salePrice
        startDate
        endDate
        whitelisted
        featured
        metadataURI
        vestingStartDate
        vestingEndDate
        minUserDepositAmount
        maxUserDepositAmount
        currentDepositAmount
        cap
      }
    }
    `,
);
