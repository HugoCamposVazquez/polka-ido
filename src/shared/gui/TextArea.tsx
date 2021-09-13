import { max } from 'moment';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { sideColor, sideColor6, sideColor8, sideColor13 } from '../../utils/colorsUtil';
import * as styles from './TextArea.styles';

type IProps = {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  style?: any;
  autoFocus?: boolean;
  mode: 'light' | 'dark';
  maxLength?: number;
};

export const TextArea = ({ name, placeholder, disabled, autoFocus, mode, style, maxLength }: IProps) => {
  const { control } = useFormContext();

  return (
    <div style={styles.inputParentStyle}>
      <Controller
        name={name}
        control={control}
        render={({ onChange, value }) => {
          return (
            <textarea
              className={styles.inputClassName(
                mode === 'light' ? sideColor8 : sideColor13,
                mode === 'light' ? sideColor : sideColor6,
              )}
              style={style}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              onChange={onChange}
              autoFocus={autoFocus}
              maxLength={maxLength}
            />
          );
        }}
      />
    </div>
  );
};
