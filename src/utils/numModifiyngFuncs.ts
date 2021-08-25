import { BigNumber, ethers } from 'ethers';

export const fixNums = (num: number, fixTo: number) => {
  if (!fixTo) return num.toFixed(fixTo); // don't go wrong if no decimal

  return num.toFixed(fixTo).replace(/\.?0+$/, '');
};

export const numberWithCommas = (num: string) => {
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(num)) num = num.replace(pattern, '$1,$2');

  return num;
};

export const formatWei = (numberInWei: string | BigNumber): string => {
  const eth = ethers.utils.formatEther(numberInWei);
  const formattedNumber = numberWithCommas(eth);
  if (Number(formattedNumber) === 0) {
    return '0';
  }

  return formattedNumber;
};
