import { format } from 'date-fns';
import React from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useFormContext } from 'react-hook-form';

import { sideColor, sideColor6, sideColor8, sideColor13 } from '../../utils/colorsUtil';
import * as styles from './DateField.styles';

type IProps = {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  mode: 'light' | 'dark';
};

export const DateField = ({ name, placeholder, disabled, autoFocus, mode }: IProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ onChange, value }) => (
        <DatePicker
          className={styles.inputClassName(
            mode === 'light' ? sideColor8 : sideColor13,
            mode === 'light' ? sideColor : sideColor6,
          )}
          onChange={onChange}
          disabled={disabled}
          autoFocus={autoFocus}
          selected={value}
          placeholderText={placeholder}
          value={value}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      )}
    />
  );
};
