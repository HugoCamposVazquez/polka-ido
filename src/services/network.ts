import { ethers, providers } from 'ethers';

import { MOONBEAM_ALPHA_CHAIN_ID } from '../hooks/web3/connectors';

export async function createSwitchToNetwork(
  provider: providers.ExternalProvider, // window.ethereum?
): Promise<unknown | null> {
  if (!provider.request) {
    return null;
  }

  return await provider.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: ethers.utils.hexValue(MOONBEAM_ALPHA_CHAIN_ID),
        rpcUrls: ['https://rpc.testnet.moonbeam.network'],
        chainName: 'Moonbase Alpha',
        nativeCurrency: {
          name: 'DEV',
          symbol: 'DEV',
          decimals: 18,
        },
        blockExplorerUrls: ['https://moonbase-blockscout.testnet.moonbeam.network/'],
      },
    ],
  });
}
