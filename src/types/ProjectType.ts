import { ProjectStatus } from './enums/ProjectStatus';

export type ProjectsApiType = {
  data: ProjectType[];
};

export type ProjectType = {
  id: number;
  iconUrl: string;
  title: string;
  description: string;
  status: ProjectStatus;
  raiseAmountCurrent: number;
  raiseAmountTotal: number;
  perToken: number;
  startDate: string;
  endDate: string;
  access: string;
};
