import { BigNumber } from 'ethers';

import { getStatemintApi } from './polkadot';

export const isAddressBalanceSufficient = async (dotAddress: string): Promise<boolean> => {
  const api = await getStatemintApi();
  const balance = await api.query.system.account(dotAddress);

  return BigNumber.from(balance.data.free.toString()).gte(api.consts.balances.existentialDeposit.toString());
};
