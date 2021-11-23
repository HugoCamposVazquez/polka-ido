import { ethers, providers } from 'ethers';

import { MOONBEAM_ALPHA_CHAIN_ID } from '../hooks/web3/connectors';

interface AddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export async function switchToNetwork(provider: providers.ExternalProvider): Promise<unknown | null> {
  const moonbeamChain: AddEthereumChainParameter = {
    chainId: ethers.utils.hexValue(MOONBEAM_ALPHA_CHAIN_ID),
    rpcUrls: ['https://rpc.testnet.moonbeam.network'],
    chainName: 'Moonbase Alpha',
    nativeCurrency: {
      name: 'DEV',
      symbol: 'DEV',
      decimals: 18,
    },
    blockExplorerUrls: ['https://moonbase-blockscout.testnet.moonbeam.network/'],
  };

  if (provider.request) {
    try {
      console.log('provider.request');
      return await provider.request({
        method: 'wallet_addEthereumChain',
        params: [moonbeamChain],
      });
    } catch (e) {
      console.log('Failed to switch to moonbeam with external provider: ' + e);
    }
  }

  if ((window as any).ethereum) {
    console.log('window ethereum frende');
    const { ethereum } = window as any;
    try {
      return await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [moonbeamChain],
      });
    } catch (e) {
      console.log('Failed to switch to moonbeam with window.ethereum provider: ' + e);
    }
  }

  return null;
}
