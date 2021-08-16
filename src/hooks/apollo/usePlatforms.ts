import { DocumentNode, gql, useQuery } from '@apollo/client';

import { client } from '../../services/apollo';
import { LaunchpadData } from '../../types/LaunchpadType';

interface PlatformsHook {
  loading: boolean;
  data: LaunchpadData | undefined;
}

export const usePlatformsStats = (): PlatformsHook => {
  const apolloClient = client;
  const { data, loading } = useQuery<LaunchpadData | undefined>(FETCH_PLATFORM_STATS, {
    client: apolloClient,
  });

  return { data, loading };
};

const FETCH_PLATFORM_STATS = gql(
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
