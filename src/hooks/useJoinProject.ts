import SaleContract from '@nodefactoryio/ryu-contracts/artifacts/contracts/SaleContract.sol/SaleContract.json';
import { SaleContract as SaleContractTypes } from '@nodefactoryio/ryu-contracts/typechain/SaleContract';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export const useJoinProject = (id: string) => {
  const [balance, setBalance] = useState('0');
  const [maxAllocation, setMaxAllocation] = useState('0');
  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      const provider = new ethers.providers.JsonRpcProvider({ url: 'https://rpc.testnet.moonbeam.network' });
      provider.getBalance(account).then(ethers.utils.formatEther).then(setBalance);
      const contract = new ethers.Contract(id, SaleContract.abi, provider);
      contract.maxDepositAmount().then(ethers.utils.formatEther).then(setMaxAllocation);
    }
  }, [account]);

  return { balance, maxAllocation };
};
