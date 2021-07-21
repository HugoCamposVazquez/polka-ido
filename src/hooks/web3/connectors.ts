import { InjectedConnector } from '@web3-react/injected-connector';

export const MOONBEAM_ALPHA_CHAIN_ID = 1287;

export const injected = new InjectedConnector({ supportedChainIds: [MOONBEAM_ALPHA_CHAIN_ID] });
