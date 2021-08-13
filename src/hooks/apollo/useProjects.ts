import { DocumentNode, gql, useQuery } from '@apollo/client';

import { client } from '../../services/apollo';
import { ProjectSales } from '../../types/ProjectType';

interface ProjectsHook {
  loading: boolean;
  data: ProjectSales | undefined;
}

export const useProject = (itemNum?: number, feat?: boolean): ProjectsHook => {
  const apolloClient = client;

  if (itemNum && feat) {
    const { data, loading } = useQuery(FETCH_FEATURED_PROJECTS_DATA, {
      client: apolloClient,
      variables: {
        numOfItems: itemNum,
        featured: feat,
      },
    });

    return { data, loading };
  } else {
    const { data, loading } = useQuery(FETCH_PROJECTS_DATA, {
      client: apolloClient,
    });

    return { data, loading };
  }
};

const FETCH_FEATURED_PROJECTS_DATA = gql(
  `
    query Projects($numOfItems: Int, $featured: Boolean) {
      sales(first: $numOfItems, where: { featured: $featured }) {
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

const FETCH_PROJECTS_DATA = gql(
  `
    query Projects {
      sales {
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
