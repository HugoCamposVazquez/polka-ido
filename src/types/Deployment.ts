export interface DeploymentJson {
  [key: string]: NetworkDeployment;
}

export interface NetworkDeployment {
  [key: string]: Deployment;
}

export interface Deployment {
  name: string;
  chainId: string;
  contracts: Contracts;
}

export interface Contracts {
  [key: string]: Contract;
}

export interface Contract {
  address: string;
  abi: [];
}
