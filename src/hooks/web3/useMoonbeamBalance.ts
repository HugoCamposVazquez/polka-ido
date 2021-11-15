import { useWeb3React } from '@web3-react/core';
import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';

export const useMoonbeanBalance = () => {
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));
  const { account } = useWeb3React();

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider({
      url: process.env.REACT_APP_MOONBEAM_NETWORK_URL,
    });

    const getBalance = () => {
      if (account) {
        try {
          provider.getBalance(account).then(setBalance);
        } catch (e) {
          console.log('Failed to connect to provider: ', e);
        }
      }
    };

    getBalance();
    provider.on('block', getBalance);

    return () => {
      provider.off('block', getBalance);
    };
  }, [account]);

  return { balance };
};
