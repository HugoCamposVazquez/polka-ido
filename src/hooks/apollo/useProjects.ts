import { gql, useQuery } from '@apollo/client';

import { client } from '../../services/apollo';
import { ProjectSales } from '../../types/ProjectType';

interface ProjectsHook {
  loading: boolean;
  data: ProjectSales | undefined;
}

export const useProjects = (numberOfItems?: number, loadFeatured?: boolean): ProjectsHook => {
  const apolloClient = client;

  const { data: projectSalesData, loading } = useQuery(FETCH_PROJECTS_DATA, {
    client: apolloClient,
    variables: {
      numberOfItems,
      where: loadFeatured ? { loadFeatured } : {},
    },
  });

  const projectSales = projectSalesData as ProjectSales;

  const data: ProjectsHook['data'] = {
    ...projectSales,
    sales: projectSales
      ? projectSales.sales.map((sale) => {
          return {
            ...sale,
            token: {
              ...sale.token,
              id: sale.token.id.split('-')[1],
            },
          };
        })
      : [],
  };

  return { data, loading };
};

const FETCH_PROJECTS_DATA = gql(
  `
    query Projects($numberOfItems: Int, $where: Sale_filter) {
      sales(first: $numberOfItems,  where: $where) {
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
