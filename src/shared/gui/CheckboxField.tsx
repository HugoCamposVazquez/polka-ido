import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type IProps = {
  name: string;
  label: string;
};

export const CheckboxField = ({ name }: IProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ value, onChange }) => (
        <input type={'checkbox'} checked={value} onChange={(e) => onChange(e.target.checked)} />
      )}
    />
  );
};
