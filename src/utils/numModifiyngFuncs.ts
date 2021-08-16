export const fixNums = (num: number, fixTo: number) => {
  if (!fixTo) return num.toFixed(fixTo); // don't go wrong if no decimal

  return num.toFixed(fixTo).replace(/\.?0+$/, '');
};

export const numberWithCommas = (num: string) => {
  num = num.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(num)) num = num.replace(pattern, '$1,$2');

  return num;
};
