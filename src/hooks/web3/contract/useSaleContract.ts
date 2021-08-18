import { abi } from '@nodefactoryio/ryu-contracts/artifacts/contracts/SaleContractFactory.sol/SaleContractFactory.json';
import { SaleContract } from '@nodefactoryio/ryu-contracts/typechain/SaleContract';

import { useContract } from './useContract';

export const useSaleContract = (address: string): SaleContract | null => {
  try {
    return useContract(address, abi) as SaleContract;
  } catch (e) {
    console.error(`An error ocurred while trying to connect to sale contract ${address}: ${e.message}`);

    return null;
  }
};
