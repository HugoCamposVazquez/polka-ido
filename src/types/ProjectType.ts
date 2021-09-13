import { ProjectAccess } from './enums/ProjectAccess';
import { ProjectStatus } from './enums/ProjectStatus';

export type ProjectsApiType = {
  data: ProjectType[];
};

export type ProjectApiType = {
  data: ProjectType;
};

export type ProjectMetadata = {
  title: string;
  webLink: string;
  twitterLink: string;
  telegramLink: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
};

export type ProjectType = ProjectMetadata & {
  id?: number;
  status: ProjectStatus;
  access: ProjectAccess;
  featured: boolean;
  starts: Date;
  ends: Date;
  minUserDepositAmount: string;
  maxUserDepositAmount: string;
  raiseAmountTotal: string;
  tokenPrice: number | string;
  tokenValue: number;
  vestingStartDate: Date;
  vestingEndDate: Date;
  minSwapLevel: number;
  tokenId: number;
  raiseAmountCurrent?: number;
  joined?: boolean;
  walletAddress: string;
  decimals: number;
};

export interface ProjectData {
  id: string;
  salePrice: string;
  startDate: string;
  endDate: string;
  whitelisted: boolean;
  featured: boolean;
  metadataURI: string;
  minUserDepositAmount: string;
  maxUserDepositAmount: string;
  totalDepositAmount: string;
  currentDepositAmount: string;
  vestingStartDate: string;
  vestingEndDate: string;
}

interface SalesDto extends ProjectData {
  token: {
    id: string;
  };
}

export interface ProjectSales {
  sales: SalesDto[];
}

export interface Allocation {
  id: string;
  amount: string;
  timestamp: string;
}

export interface AllocationDto extends Allocation {
  user: {
    id: string;
  };
}

export interface ProjectAllocationsDto {
  sale: {
    allocations: AllocationDto[];
  };
}
