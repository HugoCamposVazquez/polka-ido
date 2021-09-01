import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { sideColor, sideColor6, sideColor8, sideColor13 } from '../../utils/colorsUtil';
import { cs } from '../../utils/css';
import * as styles from './TextField.styles';

type IProps = {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  style?: any;
  styleType: 'bordered' | 'underlined' | 'none';
  autoFocus?: boolean;
  mode: 'light' | 'dark';
  type?: string;
  imposeMinMax?: any;
};

export const TextField = ({ name, placeholder, disabled, styleType, autoFocus, mode, style, type }: IProps) => {
  const { control } = useFormContext();

  let borderWidth = '';

  if (styleType === 'bordered') {
    borderWidth = '0.06rem';
  } else if (styleType === 'underlined') {
    borderWidth = '0 0 0.06rem';
  } else {
    borderWidth = '0rem';
  }

  return (
    <div style={styles.inputParentStyle}>
      <Controller
        name={name}
        control={control}
        render={({ onChange, value }) => {
          return (
            <input
              className={styles.inputClassName(
                mode === 'light' ? sideColor8 : sideColor13,
                mode === 'light' ? sideColor : sideColor6,
              )}
              style={cs(style, { borderWidth: borderWidth })}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              onChange={onChange}
              autoFocus={autoFocus}
              type={type || 'text'}
            />
          );
        }}
      />
    </div>
  );
};
