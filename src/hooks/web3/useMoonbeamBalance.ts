import { useWeb3React } from '@web3-react/core';
import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';

export const useMoonbeanBalance = () => {
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));
  const { account } = useWeb3React();

  useEffect(() => {
    (async (): Promise<void> => {
      if (account) {
        try {
          const provider = new ethers.providers.JsonRpcProvider({
            url: process.env.REACT_APP_MOONBEAM_NETWORK_URL,
          });
          const balance = await provider.getBalance(account);
          setBalance(balance);
        } catch (e) {
          console.log('Failed to connect to provider: ', e);
        }
      }
    })();
  }, [account]);

  return { balance };
};
