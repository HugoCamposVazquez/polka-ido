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
  type?: 'text' | 'number' | 'numerical';
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

  let additionalProps = {};
  if (type === 'numerical') {
    additionalProps = {
      type: 'text',
      inputMode: 'decimal',
      autoComplete: 'off',
      autoCorrect: 'off',
      pattern: '^[0-9]*[.,]?[0-9]*$',
      title: 'Invalid number',
      placeholder: '0.0',
      minLength: 1,
      maxLength: 79,
      spellCheck: 'false',
    };
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
              autoFocus={autoFocus}
              type={type || 'text'}
              {...additionalProps}
              onChange={(e) => {
                if (type === 'numerical') {
                  // replace commas with periods
                  const formattedValue = e.target.value.replace(/,/g, '.');
                  onChange(formattedValue);
                }
              }}
            />
          );
        }}
      />
    </div>
  );
};
