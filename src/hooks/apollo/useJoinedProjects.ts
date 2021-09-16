import { gql, useQuery } from '@apollo/client';

import { client } from '../../services/apollo';
import { ProjectData } from '../../types/ProjectType';

interface ProjectsHook {
  loading: boolean;
  data: ProjectData[] | undefined;
}

export const useJoinedProjects = (userAddress: string): ProjectsHook => {
  const { data: joinedProjectData, loading } = useQuery(FETCH_JOINED_PROJECTS, {
    client,
    variables: {
      userAddress,
    },
  });

  const data = joinedProjectData?.allocations.map((joinedProject: any) => {
    return { ...joinedProject.sale };
  });

  return { data, loading };
};

const FETCH_JOINED_PROJECTS = gql(
  `
  query UserProjects($userAddress: String) {
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
        totalDepositAmount
        currentDepositAmount
        vestingStartDate
        vestingEndDate
          token {
            id
          }
      }
    }
  }`,
);
