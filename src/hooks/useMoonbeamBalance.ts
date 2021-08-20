import { useWeb3React } from '@web3-react/core';
import { BigNumberish, ethers } from 'ethers';
import { useEffect, useState } from 'react';

import { formatBalance } from '../utils/numModifiyngFuncs';

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
        const truncatedBalance = formatBalance(formatedBalance, 3); // max num balance of decimal digits is 3
        setBalance(truncatedBalance);
      };
      getMoonbeamBalance();
    }
  }, [account]);

  return { balance };
};
