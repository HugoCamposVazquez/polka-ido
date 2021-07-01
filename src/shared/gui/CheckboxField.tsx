import { Checkbox } from 'antd';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { sideColor3 } from '../../utils/colorsUtil';
import { styled } from '../../utils/css';

type IProps = {
  name: string;
  style?: any;
  disabled?: boolean;
};

const checkboxStyle = styled.cssClassName`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${sideColor3};
  }
`;

export const CheckboxField = ({ name, disabled, style }: IProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ value, onChange }) => (
        <Checkbox
          className={checkboxStyle}
          style={style}
          disabled={disabled}
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
      )}
    />
  );
};
