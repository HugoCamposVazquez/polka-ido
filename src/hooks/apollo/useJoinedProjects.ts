import { gql, useQuery } from '@apollo/client';

import { client } from '../../services/apollo';
import { SalesDto } from '../../types/ProjectType';

interface ProjectsHook {
  loading: boolean;
  data: SalesDto[] | undefined;
}

export const useJoinedProjects = (userAddress: string): ProjectsHook => {
  const { data: joinedProjectData, loading } = useQuery(FETCH_JOINED_PROJECTS, {
    client,
    variables: { userAddress },
  });

  const data: ProjectsHook['data'] = joinedProjectData?.user?.allocations.map(
    (joinedProject: { sale: SalesDto }): SalesDto => {
      return {
        ...joinedProject.sale,
        token: {
          ...joinedProject.sale.token,
          id: joinedProject.sale.token.id.split('-')[1],
        },
      };
    },
  );

  return { data, loading };
};

const FETCH_JOINED_PROJECTS = gql(
  `
  query Query($userAddress: ID!) {
    user(id: $userAddress) {
      allocations {
        sale {
          id
          salePrice
          startDate
          endDate
          whitelisted
          featured
          metadataURI
          minUserDepositAmount
          maxUserDepositAmount
          cap
          currentDepositAmount
          vestingStartDate
          vestingEndDate
          token {
            id
            decimals
            walletAddress
          }
        }
      }
    }
  }`,
);
