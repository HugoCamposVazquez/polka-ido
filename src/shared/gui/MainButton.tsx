import { Button } from 'antd';
import React, { useCallback } from 'react';

import { cs } from '../../utils/css';
import * as styles from './MainButton.styles';

type IProps = {
  title: string;
  onClick: () => void;
  type: 'fill' | 'bordered';
  style?: any;
  disabled?: boolean;
  className?: string;
};

export const MainButton = ({ title, onClick, type, style, disabled, className }: IProps) => {
  const getButtonStyle = useCallback(() => {
    if (disabled) {
      return styles.fillButtonDisabledStyle;
    }

    if (type === 'fill') {
      return styles.fillButtonStyle;
    }
    return styles.borderedButtonStyle;
  }, [type, disabled]);

  const buttonStyle = getButtonStyle();
  return (
    <Button onClick={onClick} style={cs(buttonStyle, style)} disabled={disabled} className={className}>
      {title}
    </Button>
  );
};
