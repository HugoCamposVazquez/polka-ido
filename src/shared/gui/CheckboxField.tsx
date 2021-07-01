import { Checkbox } from 'antd';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { sideColor3 } from '../../utils/colorsUtil';
import { styled } from '../../utils/css';

type IProps = {
  name: string;
};

const checkboxStyle = styled.cssClassName`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${sideColor3};
  }
`;

export const CheckboxField = ({ name }: IProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ value, onChange }) => (
        <Checkbox className={checkboxStyle} checked={value} onChange={(e) => onChange(e.target.checked)} />
      )}
    />
  );
};
