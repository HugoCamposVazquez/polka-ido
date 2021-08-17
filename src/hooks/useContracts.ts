import SaleContract from '@nodefactoryio/ryu-contracts/artifacts/contracts/SaleContract.sol/SaleContract.json';
import { SaleContract as SaleContractTypes } from '@nodefactoryio/ryu-contracts/typechain/SaleContract';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export const useGetContract = (id: string) => {
  const [contract, setContract] = useState<SaleContractTypes>();
  const { account } = useWeb3React();
  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider({ url: 'https://rpc.testnet.moonbeam.network' });
    const signer = provider.getSigner(account as string);

    const contract = new ethers.Contract(id, SaleContract.abi, signer) as unknown;
    setContract(contract as SaleContractTypes);
  }, []);

  return { contract };
};
