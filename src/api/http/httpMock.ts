import horseImage from '../../assets/horse_image.png';
import projectImage from '../../assets/project_image.svg';
import { ProjectAccess } from '../../types/enums/ProjectAccess';
import { ProjectStatus } from '../../types/enums/ProjectStatus';
import { LaunchpadType } from '../../types/LaunchpadType';
import { ProjectType } from '../../types/ProjectType';
import { SourceType } from '../../types/SourceType';

const projectStatuses: ProjectStatus[] = ['upcoming', 'ended'];
const projectAccesses: ProjectAccess[] = ['whitelist', 'private'];
const imageUrls: any[] = [projectImage, horseImage];

const allProjects: ProjectType[] = [];

const mockTimeMs = 1500;

for (let i = 0; i < 80; i++) {
  allProjects.push({
    id: i,
    title: 'Project name ' + i,
    status: projectStatuses[Math.floor(Math.random() * projectStatuses.length)],
    access: projectAccesses[Math.floor(Math.random() * projectAccesses.length)],
    featured: Math.random() > 0.5,
    starts: new Date(2014, 1, 11),
    ends: new Date(2014, 1, 11),
    raiseAmountTotal: Math.floor(Math.random() * (100000 - 90000) + 90000),
    tokenPrice: 0.02,
    tokenValue: 20,
    imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)],
    etherscanLink: 'string',
    webLink: 'string',
    twitterLink: 'string',
    telegramLink: 'string',
    distributionDate: new Date(2014, 1, 11),
    minUserDeposit: '150',
    maxUserDeposit: '20000',
    minSwapLevel: 0.01,
    tokenId: 123,
    shortDescription: 'string',
    description:
      'For athletes, high altitude produces two contradictory effects on performance. For explosive events (sprints up to 400 metres, long jump, triple jump)',
    raiseAmountCurrent: Math.floor(Math.random() * 90000),
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
  getProject: async (id: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let resultProject: ProjectType | undefined;

        for (let i = 0; i < allProjects.length; i++) {
          const project: ProjectType = allProjects[i];

          if (String(project.id) === id) {
            resultProject = project;
            break;
          }
        }

        resolve({ data: resultProject });
      }, mockTimeMs);
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
