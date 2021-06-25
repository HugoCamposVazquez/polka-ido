import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { cs } from '../../utils/css';
import * as styles from './TextField.styles';

type IProps = {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  style?: any;
  type: 'bordered' | 'underlined' | 'none';
  autoFocus?: boolean;
};

export const TextField = ({ name, placeholder, disabled, style, type, autoFocus }: IProps) => {
  const { control } = useFormContext();

  let borderWidth = '';

  if (type === 'bordered') {
    borderWidth = '0.06rem';
  } else if (type === 'underlined') {
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
              className={styles.inputClassName}
              style={cs(style, { borderWidth: borderWidth })}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              onChange={onChange}
              autoFocus={autoFocus}
            />
          );
        }}
      />
    </div>
  );
};
