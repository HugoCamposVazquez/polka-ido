import { ProjectAccess } from './enums/ProjectAccess';
import { ProjectStatus } from './enums/ProjectStatus';

export type ProjectsApiType = {
  data: ProjectType[];
};

export type ProjectApiType = {
  data: ProjectType;
};

export type ProjectType = {
  id?: number;
  title: string;
  status: ProjectStatus;
  access: ProjectAccess;
  featured: boolean;
  starts: Date;
  ends: Date;
  raiseAmountTotal: number;
  tokenPrice: number;
  tokenValue: number;
  iconUrl: string;
  etherScanLink: string;
  webLink: string;
  twitterLink: string;
  telegramLink: string;
  distributionDate: Date;
  minAllocation: number;
  maxAllocation: number;
  minSwapLevel: number;
  whitelistStatus: string;
  tokenName: string;
  symbol: string;
  decimals: number;
  totalSupply: number;
  shortDescription: string;
  description: string;
  raiseAmountCurrent?: number;
  joined?: boolean;
};

export interface ProjectSales {
  sales: {
    id: string;
    salePrice: string;
    startDate: string;
    endDate: string;
    whitelisted: boolean;
    featured: boolean;
    metadataURI: string;
    maxDepositAmount: string;
    currentDepositAmount: string;
    allocations: {
      id: string;
    }[];
  }[];
}

export interface ProjectData {
  id: string;
  salePrice: string;
  startDate: string;
  endDate: string;
  whitelisted: boolean;
  featured: boolean;
  metadataURI: string;
  maxDepositAmount: string;
  currentDepositAmount: string;
  allocations: {
    id: string;
  }[];
}
