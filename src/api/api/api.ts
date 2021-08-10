import { useQuery } from 'react-query';

import { LaunchpadApiType } from '../../types/LaunchpadType';
import { ProjectApiType, ProjectsApiType } from '../../types/ProjectType';
import { SourceType } from '../../types/SourceType';
import { projectsMockHTTP } from '../http/httpMock';
export const projectCacheKeys = {
  topFeaturedProjects: 'topFeaturedProjects',
  projects: 'projects',
  project: 'project',
  launchpadDetails: 'launchpadDetails',
};

const source: SourceType = projectsMockHTTP;

export const useTopFeaturedProjects = () => {
  return useQuery<ProjectsApiType, any>([projectCacheKeys.topFeaturedProjects], () => source.getTopFeaturedProjects());
};

export const useProject = (id: string | undefined) => {
  if (id !== undefined) {
    return useQuery<ProjectApiType, any>([projectCacheKeys.project, id], () => source.getProject(id));
  } else {
    return { data: { data: undefined }, isLoading: false };
  }
};

export const useLaunchpadDetails = () => {
  return useQuery<LaunchpadApiType, any>([projectCacheKeys.launchpadDetails], () => source.getLaunchpadDetails());
};
