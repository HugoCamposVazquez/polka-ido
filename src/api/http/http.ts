import { AxiosResponse } from 'axios';

import { ProjectStatus } from '../../types/enums/ProjectStatus';
import { LaunchpadApiType } from '../../types/LaunchpadType';
import { ProjectsApiType } from '../../types/ProjectType';
import { SourceType } from '../../types/SourceType';
import { axiosAnonymous } from '../axios';

export const projectsHTTP: SourceType = {
  getTopFeaturedProjects: async () => {
    const response = await axiosAnonymous.get<any, AxiosResponse<ProjectsApiType>>('/top-featured-projects');

    return response.data;
  },
  getProjects: async (fetchFilter: 'upcoming' | 'joined' | 'featured' | undefined) => {
    const response = await axiosAnonymous.get<any, AxiosResponse<ProjectsApiType>>(
      fetchFilter !== undefined ? `/projects/${fetchFilter}` : '/projects',
    );

    return response.data;
  },
  getLaunchpadDetails: async () => {
    const response = await axiosAnonymous.get<any, AxiosResponse<LaunchpadApiType>>('/launchpad-details');

    return response.data;
  },
};
