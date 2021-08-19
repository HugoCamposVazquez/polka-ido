import { Button } from 'antd';
import React from 'react';

import { cs } from '../../utils/css';
import * as styles from './MainButton.styles';
type IProps = {
  title: string;
  onClick: () => void;
  type: 'fill' | 'bordered';
  style?: any;
  disabled?: boolean;
};

export const MainButton = ({ title, onClick, type, style, disabled }: IProps) => {
  return (
    <Button
      onClick={onClick}
      style={cs(type === 'fill' ? styles.fillButtonStyle : styles.borderedButtonStyle, style)}
      disabled={disabled}>
      {title}
    </Button>
  );
};
