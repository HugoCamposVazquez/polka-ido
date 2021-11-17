import { BigNumber, utils } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';

export const getIPFSResolvedLink = (uri: string): string => {
  let hash = uri;
  if (uri.startsWith('ipfs://')) {
    hash = uri.replace('ipfs://', '');
  }

  return `${process.env.REACT_APP_IPFS_GATEWAY}${hash}`;
};

export const getPercentage = (fraction: string, total: string): number => {
  const percentage = BigNumber.from(fraction).mul(100).div(BigNumber.from(total));
  return percentage.toNumber();
};

export const getTokenPrice = (salePrice: string, decimals?: string): string => {
  console.log('salePrice');
  console.log(salePrice);
  console.log('decimals');
  console.log(decimals);
  const precision = 12;
  const precisonMul = (10 ** precision).toString();

  const result = BigNumber.from(salePrice).mul(precisonMul).div(utils.parseUnits('1.0', decimals));
  const formated = formatUnits(result, precision);

  return formated;
};
