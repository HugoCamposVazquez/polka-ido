import { abi } from '@nodefactoryio/ryu-contracts/artifacts/contracts/SaleContractFactory.sol/SaleContractFactory.json';
import deploymentsJSON from '@nodefactoryio/ryu-contracts/deployments/deployments.json';
import { SaleContractFactory } from '@nodefactoryio/ryu-contracts/typechain/SaleContractFactory';
import { useWeb3React } from '@web3-react/core';

import { DeploymentJson } from '../../../types/Deployment';
import { NETWORKS, useContract } from './useContract';

export const useSaleFactoryContract = (): SaleContractFactory | null => {
  const { chainId } = useWeb3React();

  if (chainId && chainId in deploymentsJSON) {
    const address = getSaleFactoryContractAdddress(chainId);

    return useContract(address, abi) as SaleContractFactory;
  }

  return null;
};

const getSaleFactoryContractAdddress = (chainId: number): string => {
  return (deploymentsJSON as unknown as DeploymentJson)[chainId][NETWORKS[chainId]].contracts['SwapKiwi'].address;
};
