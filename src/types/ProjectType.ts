import { ProjectAccess } from './enums/ProjectAccess';
import { ProjectStatus } from './enums/ProjectStatus';

export type ProjectsApiType = {
  data: ProjectType[];
};

export type ProjectApiType = {
  data: ProjectType;
};

export interface ProjectMetadata {
  title: string;
  webLink: string;
  twitterLink: string;
  telegramLink: string;
  shortDescription: string;
  description: string;
  imageUrl: string | undefined;
}

export interface ProjectType extends ProjectMetadata {
  id?: number;
  status: ProjectStatus;
  access: ProjectAccess;
  featured: boolean;
  starts: Date;
  ends: Date;
  minUserDepositAmount: string;
  maxUserDepositAmount: string;
  cap: string;
  tokenPrice: number | string;
  vestingStartDate: Date;
  vestingEndDate: Date;
  tokenId: number;
  raiseAmountCurrent?: number;
  joined?: boolean;
  walletAddress: string;
  decimals: number;
  whitelistedAddresses?: string;
}

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
  cap: string;
  currentDepositAmount: string;
  vestingStartDate: string;
  vestingEndDate: string;
}

export interface SalesDto extends ProjectData {
  token: {
    id: string;
    decimals: number;
    walletAddress: string;
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

export type FullProjectData = Partial<ProjectMetadata> & SalesDto;
