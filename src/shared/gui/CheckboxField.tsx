import { Checkbox } from 'antd';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import * as styles from './CheckboxField.styles';

type IProps = {
  name: string;
  style?: any;
  disabled?: boolean;
};

export const CheckboxField = ({ name, disabled, style }: IProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ value, onChange }) => (
        <Checkbox
          className={styles.checkboxStyle}
          style={style}
          disabled={disabled}
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
      )}
    />
  );
};
