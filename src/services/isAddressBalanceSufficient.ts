import { BigNumber } from 'ethers';

import { getStatemintApi } from './polkadot';

interface TokenBalance {
  balance: number;
  isFrozen: boolean;
  isSufficient: boolean;
}

export const isAddressBalanceSufficient = async (dotAddress: string): Promise<boolean> => {
  const api = await getStatemintApi();
  const balance = await api.query.system.account(dotAddress);

  return BigNumber.from(balance.data.free.toString()).gte(api.consts.balances.existentialDeposit.toString());
};

export const getpolkadotWalletBalance = async (polkadotAddress: string, id: string): Promise<string> => {
  const api = await getStatemintApi();

  const balance = (await api.query.assets.account(id, polkadotAddress)).toJSON() as unknown as TokenBalance;

  return balance.balance.toString();
};
