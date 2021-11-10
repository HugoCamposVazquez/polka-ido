import { formatUnits } from '@ethersproject/units';
import { BigNumber, ethers } from 'ethers';

export const fixNums = (num: number, fixTo: number) => {
  if (!fixTo) return num.toFixed(fixTo); // don't go wrong if no decimal

  return removeTrailingZeros(num.toFixed(fixTo));
};

export const numberWithSpaces = (num: string) => {
  let intPart = num.split('.')[0];
  const decimals = num.split('.')[1];
  if (intPart === '0') return num;

  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(intPart)) intPart = intPart.replace(pattern, '$1 $2');

  return intPart + (decimals ? `.${decimals}` : '');
};

const removeTrailingZeros = (str: string): string => str.replace(/\.0+$/, '');

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

export const formatTokenAmount = (numberInWei: string | BigNumber, decimals: string): string => {
  const parsed = formatUnits(numberInWei, decimals);
  const basicNumber = parsed.replace(/\.0+$/, ''); // replace trailing zeros
  return numberWithSpaces(basicNumber);
};

export const mulBigNumber = (first: BigNumber, second: BigNumber) => {
  // if(first)
};
