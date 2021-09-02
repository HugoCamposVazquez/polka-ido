import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import { useSaleContract } from './useSaleContract';

export const useGetAllocations = (address: string): string | undefined => {
  const [totalDeposit, setTotalDeposit] = useState<string | undefined>('0');
  const saleContract = useSaleContract(address);

  useEffect(() => {
    const getAllAlocations = async (): Promise<void> => {
      const total = await saleContract?.totalDepositPerUser();
      const formmatedTotalDeposits = total && ethers.utils.formatEther(total);
      setTotalDeposit(formmatedTotalDeposits);
    };
    getAllAlocations();
  });
  return totalDeposit;
};
