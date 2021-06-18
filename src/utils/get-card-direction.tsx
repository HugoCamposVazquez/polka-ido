export default function getCardDirection(width: number, index: number): 'right' | 'left' {
  let startsDirection: 'left' | 'right' = 'right';

  const factor = width > 830 && width < 1436 ? 2 : 4;

  const times = Math.floor(index / factor);

  for (let i = 0; i < times; i++) {
    if (startsDirection === 'left') {
      startsDirection = 'right';
    } else {
      startsDirection = 'left';
    }
  }

  let direction: 'right' | 'left';

  if (startsDirection === 'right') {
    direction = index % 2 === 0 ? 'right' : 'left';
  } else {
    direction = index % 2 === 0 ? 'left' : 'right';
  }

  return direction;
}
