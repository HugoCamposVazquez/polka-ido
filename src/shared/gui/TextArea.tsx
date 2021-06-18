import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { styled } from '../../utils/css';

const inputParentStyle = styled.cssStyle`
  display: flex;
  flex: 1;
`;

const inputClassName = styled.cssClassName`
  flex: 1;
  background-color: transparent;
  outline: 0;
  border-width: 1px;
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
  resize: none;

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
    <div style={inputParentStyle}>
      <Controller
        name={name}
        control={control}
        render={({ onChange, value }) => {
          return (
            <textarea
              className={inputClassName}
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
