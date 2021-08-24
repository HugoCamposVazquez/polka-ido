export const fixNums = (num: number, fixTo: number) => {
  if (!fixTo) return num.toFixed(fixTo); // don't go wrong if no decimal

  return num.toFixed(fixTo).replace(/\.?0+$/, '');
};

export const numberWithDots = (num: string) => {
  num = num.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(num)) num = num.replace(pattern, '$1.$2');

  return num;
};

export const formatBalance = (str: string, maxDecimalDigits: number): string => {
  if (str.includes('.')) {
    const parts = str.split('.');

    return parts[0] + '.' + parts[1].slice(0, maxDecimalDigits);
  }

  return str;
};

export const scientificToDecimal = (num: any) => {
  const nsign = Math.sign(num);
  //remove the sign
  num = Math.abs(num);
  //if the number is in scientific notation remove it
  if (/\d+\.?\d*e[+-]*\d+/i.test(num)) {
    const zero = '0',
      parts = String(num).toLowerCase().split('e'); //split into coeff and exponent
    const e = Number(parts.pop()); //store the exponential part
    let l = Math.abs(e); //get the number of zeros
    const sign = e / l,
      coeff_array = parts[0].split('.');
    if (sign === -1) {
      l = l - coeff_array[0].length;
      if (l < 0) {
        num =
          coeff_array[0].slice(0, l) + '.' + coeff_array[0].slice(l) + (coeff_array.length === 2 ? coeff_array[1] : '');
      } else {
        num = zero + '.' + new Array(l + 1).join(zero) + coeff_array.join('');
      }
    } else {
      const dec = coeff_array[1];
      if (dec) l = l - dec.length;
      if (l < 0) {
        num = coeff_array[0] + dec.slice(0, l) + '.' + dec.slice(l);
      } else {
        num = coeff_array.join('') + new Array(l + 1).join(zero);
      }
    }
  }

  return nsign < 0 ? '-' + num : num;
};
