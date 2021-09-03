import { gql, useQuery } from '@apollo/client';

import { client } from '../../services/apollo';
import { ProjectSales } from '../../types/ProjectType';

interface ProjectsHook {
  loading: boolean;
  data: ProjectSales | undefined;
}

export const useSingleProject = (id: string, userAddress?: string): ProjectsHook => {
  const { data, loading } = useQuery(FETCH_SINGLE_PROJECT_DATA, {
    client,
    variables: {
      id,
      userAddress,
    },
  });

  return { data, loading };
};

const FETCH_SINGLE_PROJECT_DATA = gql(
  `
    query Projects($id: String, $userAddress: String) {
      sales(where: { id: $id }) {
        id
        salePrice
        startDate
        endDate
        whitelisted
        featured
        metadataURI
        maxDepositAmount
        currentDepositAmount
        token {
          id
        }
        allocations(where: {id: $userAddress}) {
          id
          amount
        }
      }
    }
    `,
);
