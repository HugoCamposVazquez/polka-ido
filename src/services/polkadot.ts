import { ApiPromise, WsProvider } from '@polkadot/api';

declare global {
  interface Window {
    statemintConnection: ApiPromise | null;
  }
}

if (!window.statemintConnection) window.statemintConnection = null;

// initialise via static create
export const getStatemintApi = async (): Promise<ApiPromise> => {
  if (!process.env.REACT_APP_STATEMINT_URL) {
    throw new Error('Statemint URL not set in the environment.');
  }

  if (!window.statemintConnection) {
    const provider = new WsProvider(process.env.REACT_APP_STATEMINT_URL);
    window.statemintConnection = await ApiPromise.create({ provider });
  }

  return window.statemintConnection;
};
