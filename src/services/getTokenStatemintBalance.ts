import { getStatemintApi } from './polkadot';

interface TokenBalance {
  balance: number;
  isFrozen: boolean;
  isSufficient: boolean;
}

export const getStatemintTokenBalance = async (polkadotAddress: string, id: string): Promise<string | void> => {
  try {
    const api = await getStatemintApi();
    const balance = (await api.query.assets.account(id, polkadotAddress)).toJSON() as unknown as TokenBalance;

    return balance.balance.toString();
  } catch (error) {
    console.error(error.message);
  }
};
