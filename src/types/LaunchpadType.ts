export type LaunchpadApiType = {
  data: LaunchpadType;
};

export type LaunchpadType = {
  projectsLaunched: number;
  fundsRaised: number;
  usersParticipated: number;
};
