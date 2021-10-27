import { gql, useQuery } from '@apollo/client';

import { client } from '../../services/apollo';
import { ProjectSales } from '../../types/ProjectType';

interface ProjectsHook {
  loading: boolean;
  data: ProjectSales | undefined;
}

export const useProjects = (numberOfItems?: number, loadFeatured?: boolean): ProjectsHook => {
  const apolloClient = client;

  const { data, loading } = useQuery(FETCH_PROJECTS_DATA, {
    client: apolloClient,
    variables: {
      numberOfItems,
      loadFeatured,
    },
  });
  return { data, loading };
};

const FETCH_PROJECTS_DATA = gql(
  `
    query Projects($numberOfItems: Int, $loadFeatured: Boolean) {
      sales(first: $numberOfItems,  featured: $loadFeatured) {
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

        allocations {
          id
        }
      }
    }
    `,
);
