import { Radio } from 'antd';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { sideColor, sideColor3, sideColor4, sideColor6 } from '../../utils/colorsUtil';
import { styled } from '../../utils/css';

type IProps = {
  name: string;
  style?: any;
  disabled?: boolean;
  options: { value: string; label: string }[];
  color: string;
};

const radioLabelStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-size: 16px;
`;

export const RadioGroup = ({ name, disabled, options, color, style }: IProps) => {
  const { control, watch } = useFormContext();

  const radioStyle = styled.cssClassName`
    .ant-radio-checked .ant-radio-inner {
      border-color: ${color};
    }

    .ant-radio-checked .ant-radio-inner:after {
      background-color: ${color};
    }
  `;

  const values = options.map((option) => (
    <Radio key={option.value} value={option.value}>
      <div
        className={radioLabelStyle}
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
          className={radioStyle}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}>
          {values}
        </Radio.Group>
      )}
    />
  );
};
