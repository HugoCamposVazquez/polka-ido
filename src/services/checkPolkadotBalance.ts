import { BigNumber } from 'ethers';

import { getStatemintApi } from './polkadot';

export const checkPolakdotBalance = async (dotAddress: string): Promise<boolean | undefined> => {
  if (dotAddress) {
    const api = await getStatemintApi();
    const balance = await api.query.system.account(dotAddress);
    return BigNumber.from(balance.data.free.toString()).lte(api.consts.balances.existentialDeposit.toString());
  }
};
