import { gql, useQuery } from '@apollo/client';

import { client } from '../../services/apollo';
import { ProjectAllocations } from '../../types/ProjectType';

interface ProjectsAllocationsHook {
  loading: boolean;
  data: ProjectAllocations | undefined;
}

export const useUserAllocations = (id: string, userAddress?: string): ProjectsAllocationsHook => {
  const { data, loading } = useQuery(FETCH_PROJECT_ALLOCATION_DATA, {
    client,
    variables: {
      id,
      userAddress,
    },
  });

  return { data, loading };
};

const FETCH_PROJECT_ALLOCATION_DATA = gql(
  `
    query Project_allocations($id: String, $userAddress: String) {
      sales(where: { id: $id }) {
        allocations(where: {id: $userAddress}) {
          id
          amount
        }
      }
    }
    `,
);
