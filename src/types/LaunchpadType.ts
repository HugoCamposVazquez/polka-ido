export type LaunchpadApiType = {
  data: LaunchpadType;
};

export type LaunchpadType = {
  projectsLaunched: number;
  fundsRaised: number;
  usersParticipated: number;
};

export interface LaunchpadData {
  platforms: {
    fundsRaised: string;
    numOfUsers: number;
    numOfProjects: number;
  }[];
}
