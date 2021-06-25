import React from 'react';

import * as styles from './MainButton.styles';
type IProps = {
  title: string;
  onClick: () => void;
  type: 'fill' | 'bordered';
};

export const MainButton = ({ title, onClick, type }: IProps) => {
  return (
    <button onClick={onClick} style={type === 'fill' ? styles.fillButtonStyle : styles.borderedButtonStyle}>
      {title}
    </button>
  );
};
