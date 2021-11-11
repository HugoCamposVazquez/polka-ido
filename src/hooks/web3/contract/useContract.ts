import { useWeb3React } from '@web3-react/core';
import { Contract } from 'ethers';
import { useMemo } from 'react';

export const NETWORKS: { [chainId: number]: string } = {
  1287: 'moonbaseAlpha',
};

export const DEFAULT_NETWORK_ID = 1287;

export const useContract = (address: string | undefined, ABI: any): Contract | null => {
  const { library, account } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      const signer = library.getSigner(account);

      return new Contract(address, ABI, signer);
    } catch (error: any) {
      console.error(`Failed to connect to contract ${address}: `, error.message());

      return null;
    }
  }, [address, ABI, library, account]);
};
