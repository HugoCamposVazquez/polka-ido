import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { sideColor } from '../../utils/colorsUtil';
import { cs, styled } from '../../utils/css';

const inputParentStyle = styled.cssStyle`
  display: flex;
  flex: 1;
`;

const inputClassName = styled.cssClassName`
  flex: 1;
  background-color: transparent;
  outline: 0;
  border-color: ${sideColor};
  color: ${sideColor};
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 0.25rem;
  padding-top: 0.25rem;
  font-family: Titillium Web;
  font-size: 1rem;
  line-height: 1.5rem;
  border-style: solid;

  ::-webkit-input-placeholder {
    /* Edge */
    color: ${sideColor};
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${sideColor};
  }

  ::placeholder {
    color: ${sideColor};
  }
`;

type IProps = {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  style?: any;
  type: 'bordered' | 'underlined' | 'none';
  autoFocus?: boolean;
};

export const TextField = ({ name, placeholder, disabled, style, type, autoFocus }: IProps) => {
  const { control } = useFormContext();

  let borderWidth = '';

  if (type === 'bordered') {
    borderWidth = '1px';
  } else if (type === 'underlined') {
    borderWidth = '0 0 0.06rem';
  } else {
    borderWidth = '0rem';
  }

  return (
    <div style={inputParentStyle}>
      <Controller
        name={name}
        control={control}
        render={({ onChange, value }) => {
          return (
            <input
              className={inputClassName}
              style={cs(style, { borderWidth: borderWidth })}
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
