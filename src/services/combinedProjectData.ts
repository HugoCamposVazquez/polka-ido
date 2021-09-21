import { FullProjectData, ProjectMetadata, ProjectSales } from '../types/ProjectType';
import { fetchIPFSData } from './fetchIPFSData';

export const getCombinedData = async (projects: ProjectSales): Promise<FullProjectData[]> => {
  const combinedData = await Promise.all(
    projects.sales.map(async (projectData) => {
      const ipfsData: ProjectMetadata | undefined = await fetchIPFSData(projectData.metadataURI);
      return { ...projectData, ...ipfsData };
    }),
  );

  return combinedData;
};
