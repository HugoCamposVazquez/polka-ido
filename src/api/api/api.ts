import { useQuery } from 'react-query';

import { ProjectStatus } from '../../types/enums/ProjectStatus';
import { LaunchpadApiType } from '../../types/LaunchpadType';
import { ProjectsApiType } from '../../types/ProjectType';
import { SourceType } from '../../types/SourceType';
import { projectsMockHTTP } from '../http/httpMock';
export const projectCacheKeys = {
  topFeaturedProjects: 'topFeaturedProjects',
  projects: 'projects',
  launchpadDetails: 'launchpadDetails',
};

const source: SourceType = projectsMockHTTP;

export const useTopFeaturedProjects = () => {
  return useQuery<ProjectsApiType, any>([projectCacheKeys.topFeaturedProjects], () => source.getTopFeaturedProjects());
};

export const useProjects = (fetchFilter: 'upcoming' | 'joined' | 'featured' | undefined) => {
  return useQuery<ProjectsApiType, any>([projectCacheKeys.projects, fetchFilter], () =>
    source.getProjects(fetchFilter),
  );
};

export const useLaunchpadDetails = () => {
  return useQuery<LaunchpadApiType, any>([projectCacheKeys.launchpadDetails], () => source.getLaunchpadDetails());
};
