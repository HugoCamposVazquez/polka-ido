import { BigNumber, ethers } from 'ethers';

import { numberWithCommas } from './numModifiyngFuncs';

export const getIPFSResolvedLink = (uri: string): string => {
  let hash = uri;
  if (uri.startsWith('ipfs://')) {
    hash = uri.replace('ipfs://', '');
  }

  return `${process.env.REACT_APP_IPFS_GATEWAY}${hash}`;
};

export const getPercentage = (fraction: string, total: string): string => {
  const percentage = BigNumber.from(fraction).mul(100).div(BigNumber.from(total));
  return percentage.toString();
};

export const getTokenPrice = (salePrice: string): string => {
  return numberWithCommas(BigNumber.from(salePrice).div(ethers.utils.parseEther('1.0')).toString());
};
