import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import * as styles from './TextArea.styles';

type IProps = {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  style?: any;
  autoFocus?: boolean;
};

export const TextArea = ({ name, placeholder, disabled, style, autoFocus }: IProps) => {
  const { control } = useFormContext();

  return (
    <div style={styles.inputParentStyle}>
      <Controller
        name={name}
        control={control}
        render={({ onChange, value }) => {
          return (
            <textarea
              className={styles.inputClassName}
              style={style}
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
