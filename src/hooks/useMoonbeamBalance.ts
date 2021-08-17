import { useWeb3React } from '@web3-react/core';
import { BigNumberish, ethers } from 'ethers';
import { useEffect, useState } from 'react';

export const useMoonbeanBalance = () => {
  const [balance, setBalance] = useState<BigNumberish>();
  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      const getMoonbeamBalance = async (): Promise<void> => {
        const provider = new ethers.providers.JsonRpcProvider({
          url: process.env.REACT_APP_MOONBEAM_NETWORK_URL as string,
        });
        const balance = await provider.getBalance(account);
        const formatedBalance = ethers.utils.formatEther(balance);
        setBalance(formatedBalance);
      };
      getMoonbeamBalance();
    }
  }, [account]);

  return { balance };
};
