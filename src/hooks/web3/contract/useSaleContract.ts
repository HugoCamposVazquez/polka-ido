import { abi } from '@nodefactoryio/ryu-contracts/artifacts/contracts/SaleContract.sol/SaleContract.json';
import { SaleContract } from '@nodefactoryio/ryu-contracts/typechain/SaleContract';

import { useContract } from './useContract';

export const useSaleContract = (address?: string): SaleContract | null => {
  try {
    if (address) {
      return useContract(address, abi) as SaleContract;
    } else return null;
  } catch (e) {
    console.error(`An error ocurred while trying to connect to sale contract ${address}: ${e.message}`);
    return null;
  }
};
