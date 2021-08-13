import { DocumentNode, gql, useQuery } from '@apollo/client';

import { client } from '../../services/apollo';
import { LaunchpadData } from '../../types/LaunchpadType';

interface PlatformsHook {
  loading: boolean;
  data: LaunchpadData | undefined;
}

export const usePlatformsStats = (): PlatformsHook => {
  const apolloClient = client;
  const { data, loading } = useQuery<LaunchpadData | undefined>(FETCH_ALL_PLATFORMS, {
    client: apolloClient,
  });

  return { data, loading };
};

const FETCH_ALL_PLATFORMS = gql(
  `
  query getPlatforms {
      platforms {
        numOfProjects
        numOfUsers
        fundsRaised
      }
    }
  `,
);
