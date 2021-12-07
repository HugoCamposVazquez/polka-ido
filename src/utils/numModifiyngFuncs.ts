import { formatUnits } from '@ethersproject/units';
import { BigNumber, ethers } from 'ethers';

export const fixNums = (num: number, fixTo: number) => {
  if (!fixTo) return num.toFixed(fixTo); // don't go wrong if no decimal

  return removeTrailingZeros(num.toFixed(fixTo));
};

export const numberWithDots = (num: string) => {
  num = num.toString();

  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(num)) num = num.replace(pattern, '$1.$2');

  return num;
};

export const removeTrailingZeros = (str: string): string => str.replace(/\.0+$/, '');

export const removeExcessDecimal = (str: string, maxDecimals: number): string => {
  const index = str.indexOf('.');
  if (index === -1) return str;
  return str.substring(0, index + maxDecimals + 1);
};

export const formatBalance = (str: string, maxDecimalDigits: number): string => {
  if (str.includes('.')) {
    const parts = str.split('.');

    return parts[0] + '.' + parts[1].slice(0, maxDecimalDigits);
  }

  return removeTrailingZeros(str);
};

export const formatWei = (numberInWei: string | BigNumber): string => {
  if (numberInWei.toString() === '0') {
    return '0';
  }
  const eth = ethers.utils.formatEther(numberInWei);
  return removeTrailingZeros(eth);
};

export const formatTokenAmount = (numberInWei: string | BigNumber, decimals?: string): string => {
  const parsed = formatUnits(numberInWei, decimals);
  return numberWithDots(removeTrailingZeros(parsed));
};
