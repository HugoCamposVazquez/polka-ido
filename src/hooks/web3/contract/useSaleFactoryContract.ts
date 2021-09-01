import { abi } from '@nodefactoryio/ryu-contracts/artifacts/contracts/SaleContractFactory.sol/SaleContractFactory.json';
import deploymentsJSON from '@nodefactoryio/ryu-contracts/deployments/deployments.json';
import { SaleContractFactory } from '@nodefactoryio/ryu-contracts/typechain/SaleContractFactory';
import { useWeb3React } from '@web3-react/core';

import { DeploymentJson } from '../../../types/Deployment';
import { DEFAULT_NETWORK_ID, NETWORKS, useContract } from './useContract';

export const useSaleFactoryContract = (): SaleContractFactory | null => {
  const { chainId } = useWeb3React();

  try {
    const address = getSaleFactoryContractAddress(chainId || DEFAULT_NETWORK_ID);
    return useContract(address, abi) as SaleContractFactory;
  } catch (e) {
    console.error(`Error while trying to connect to contract: ${e.message}`);
    return null;
  }
};

const getSaleFactoryContractAddress = (chainId: number): string => {
  return (deploymentsJSON as unknown as DeploymentJson)[chainId][NETWORKS[chainId]].contracts['SaleContractFactory']
    .address;
};
