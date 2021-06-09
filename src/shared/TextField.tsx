import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { styled } from '../utils/css';

const inputParentStyle = styled.cssStyle`
  display: flex;
  margin: 36px 0;
`;

const inputClassName = styled.cssClassName`
  ::-webkit-input-placeholder {
    /* Edge */
    color: #b8b8b8;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #b8b8b8;
  }

  ::placeholder {
    color: #b8b8b8;
  }
`;

const inputStyle = styled.cssStyle`
  flex: 1;
  background-color: transparent;
  outline: 0;
  border-width: 0 0 1px;
  border-color: #b8b8b8;
  color: #b8b8b8;
  padding-left: 8px;
  padding-bottom: 4px;
  font-family: Titillium Web;
  font-size: 16px;
  line-height: 24px;
`;

type IProps = {
  name: string;
  placeholder?: string;
  disabled?: boolean;
};

export const TextField = ({ name, placeholder, disabled }: IProps) => {
  const { control, errors } = useFormContext();

  return (
    <div style={inputParentStyle}>
      <Controller
        name={name}
        control={control}
        render={({ onChange, value }) => {
          return (
            <input
              className={inputClassName}
              style={inputStyle}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              onChange={onChange}
            />
          );
        }}
      />
    </div>
  );
};
