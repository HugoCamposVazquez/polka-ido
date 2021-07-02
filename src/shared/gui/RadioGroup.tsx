import { Radio } from 'antd';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { sideColor, sideColor6 } from '../../utils/colorsUtil';
import * as styles from './RadioGroup.styles';

type IProps = {
  name: string;
  style?: any;
  disabled?: boolean;
  options: { value: string; label: string }[];
  color: string;
};

export const RadioGroup = ({ name, disabled, options, color, style }: IProps) => {
  const { control, watch } = useFormContext();

  const values = options.map((option) => (
    <Radio key={option.value} value={option.value}>
      <div
        className={styles.radioLabelStyle}
        style={watch(name) === option.value ? { color: sideColor6 } : { color: sideColor }}>
        {option.label}
      </div>
    </Radio>
  ));

  return (
    <Controller
      name={name}
      control={control}
      render={({ value, onChange }) => (
        <Radio.Group
          value={value}
          style={style}
          className={styles.radioStyle(color)}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}>
          {values}
        </Radio.Group>
      )}
    />
  );
};
