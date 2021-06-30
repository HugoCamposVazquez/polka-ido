import horseImage from '../../assets/horse_image.png';
import projectImage from '../../assets/project_image.svg';
import { ProjectStatus } from '../../types/enums/ProjectStatus';
import { LaunchpadType } from '../../types/LaunchpadType';
import { ProjectType } from '../../types/ProjectType';
import { SourceType } from '../../types/SourceType';

const projectStatuses: ProjectStatus[] = ['upcoming', 'ended'];
const iconUrls: any[] = [projectImage, horseImage];

const allProjects: ProjectType[] = [];

const mockTimeMs = 1500;

for (let i = 0; i < 80; i++) {
  allProjects.push({
    id: i,
    iconUrl: iconUrls[Math.floor(Math.random() * iconUrls.length)],
    title: 'Project name ' + i,
    description:
      'For athletes, high altitude produces two contradictory effects on performance. For explosive events (sprints up to 400 metres, long jump, triple jump)',
    status: projectStatuses[Math.floor(Math.random() * projectStatuses.length)],
    raiseAmountCurrent: Math.floor(Math.random() * 100000),
    raiseAmountTotal: 100000,
    perToken: Math.random(),
    startDate: '24/06/21',
    endDate: '22/08/22',
    access: 'Whitelist',
    featured: Math.random() > 0.5,
    joined: Math.random() > 0.5,
  });
}

export const projectsMockHTTP: SourceType = {
  getTopFeaturedProjects: async () => {
    return new Promise((resolve) => {
      const projects: ProjectType[] = [];

      for (let i = 0; i < allProjects.length; i++) {
        const project: ProjectType = allProjects[i];

        if (project.featured) {
          projects.push(project);
        }

        if (projects.length == 4) {
          break;
        }
      }

      setTimeout(() => {
        resolve({ data: projects });
      }, mockTimeMs);
    });
  },
  getProjects: async (fetchFilter: 'upcoming' | 'joined' | 'featured' | undefined) => {
    return new Promise((resolve) => {
      if (fetchFilter === undefined) {
        setTimeout(() => {
          resolve({ data: allProjects });
        }, mockTimeMs);
      } else {
        const projects: ProjectType[] = [];

        for (let i = 0; i < allProjects.length; i++) {
          const project: ProjectType = allProjects[i];

          if (fetchFilter === 'joined' && project.joined) {
            projects.push(project);
            continue;
          }

          if (fetchFilter === 'featured' && project.featured) {
            projects.push(project);
            continue;
          }

          if (fetchFilter === 'upcoming' && project.status === 'upcoming') {
            projects.push(project);
            continue;
          }
        }

        setTimeout(() => {
          resolve({ data: projects });
        }, 2 * mockTimeMs);
      }
    });
  },
  getLaunchpadDetails: async () => {
    return new Promise((resolve) => {
      const launchpadDetails: LaunchpadType = { projectsLaunched: 12, fundsRaised: 224234, usersParticipated: 4382 };

      setTimeout(() => {
        resolve({ data: launchpadDetails });
      }, mockTimeMs);
    });
  },
};
