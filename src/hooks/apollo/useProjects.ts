import { gql, useQuery } from '@apollo/client';

import { client } from '../../services/apollo';
import { ProjectSales } from '../../types/ProjectType';

interface ProjectsHook {
  loading: boolean;
  data: ProjectSales | undefined;
}

export const useProject = (itemNum?: number, feat?: boolean): ProjectsHook => {
  const apolloClient = client;

  const { data, loading } = useQuery(FETCH_PROJECTS_DATA, {
    client: apolloClient,
    variables: {
      numOfItems: itemNum,
      featured: feat,
    },
  });

  return { data, loading };
};

const FETCH_PROJECTS_DATA = gql(
  `
    query Projects($numOfItems: Int, $featured: Boolean) {
      sales(first: $numOfItems,  featured: $featured) {
        id
        salePrice
        startDate
        endDate
        whitelisted
        featured
        metadataURI
        maxDepositAmount
        currentDepositAmount
        allocations {
          id
        }
      }
    }
    `,
);
