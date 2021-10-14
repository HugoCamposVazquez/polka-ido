import { gql, useQuery } from '@apollo/client';

import { client } from '../../services/apollo';
import { SalesDto } from '../../types/ProjectType';

interface ProjectHook {
  loading: boolean;
  data: SalesDto | undefined;
}

export const useSingleProject = (id: string): ProjectHook => {
  const { data: projectData, loading } = useQuery(FETCH_SINGLE_PROJECT_DATA, {
    client,
    variables: {
      id,
    },
  });

  const data = projectData && {
    ...projectData.sales[0],
  };

  return { data, loading };
};

const FETCH_SINGLE_PROJECT_DATA = gql(
  `
    query Projects($id: String) {
      sales(where: { id: $id }) {
        id
        salePrice
        startDate
        endDate
        whitelisted
        featured
        metadataURI
        minUserDepositAmount
        maxUserDepositAmount
        totalDepositAmount
        currentDepositAmount
        vestingStartDate
        vestingEndDate
        token {
          id
        }
      }
    }
    `,
);
