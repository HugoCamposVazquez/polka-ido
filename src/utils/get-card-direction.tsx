function getFactor(width: number) {
  if (width <= 830) {
    return 0;
  } else if (width > 830 && width <= 1435) {
    return 2;
  } else if (width > 1435 && width <= 2400) {
    return 4;
  } else {
    return 6;
  }
}

export default function getCardDirection(width: number, index: number): 'right' | 'left' {
  const factor = getFactor(width);
  const times = factor !== 0 ? Math.floor(index / factor) : 0;
  const oddOrEven = times % 2 === 0 ? 0 : 1;

  return index % 2 === oddOrEven ? 'right' : 'left';
}
