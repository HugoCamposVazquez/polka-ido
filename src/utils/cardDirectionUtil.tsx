const getElementsPerRow = (width: number) => {
  if (width <= 830) {
    return 1;
  } else if (width > 830 && width <= 1435) {
    return 2;
  } else {
    return 4;
  }
};

export const getCardDirection = (width: number, index: number): 'right' | 'left' => {
  const elementsPerRow = getElementsPerRow(width);
  const times = Math.floor(index / elementsPerRow);
  const everOrOddRow = times % 2 === 0 ? 0 : 1;

  return (elementsPerRow !== 1 ? index % 2 === everOrOddRow : everOrOddRow) ? 'right' : 'left';
};
