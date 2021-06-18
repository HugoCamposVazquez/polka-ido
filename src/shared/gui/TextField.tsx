import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { cs, styled } from '../../utils/css';

const inputParentStyle = styled.cssStyle`
  display: flex;
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
  border-color: #b8b8b8;
  color: #b8b8b8;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 4px;
  padding-top: 4px;
  font-family: Titillium Web;
  font-size: 16px;
  line-height: 24px;
  border-style: solid;
`;

type IProps = {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  style?: any;
  type: 'bordered' | 'underlined';
};

export const TextField = ({ name, placeholder, disabled, style, type }: IProps) => {
  const { control } = useFormContext();

  return (
    <div style={inputParentStyle}>
      <Controller
        name={name}
        control={control}
        render={({ onChange, value }) => {
          return (
            <input
              className={inputClassName}
              style={cs(inputStyle, style, type === 'bordered' ? { borderWidth: '1px' } : { borderWidth: '0 0 1px' })}
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
