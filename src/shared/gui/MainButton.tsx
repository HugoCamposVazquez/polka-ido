import React from 'react';

import { styled } from '../../utils/css';

const fillButtonStyle = styled.cssStyle`
  height: 48px;
  width: 196px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d2307a;
  font-size: 16px;
  font-family: Titillium Web;
  font-weight: 700;
  border: 1px solid #d2307a;
  color: white;
  cursor: pointer;
`;

const borderedButtonStyle = styled.cssStyle`
  border: 1px solid #d2307a;
  height: 48px;
  width: 196px;
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: #d2307a;
  font-size: 16px;
  font-family: Titillium Web;
  font-weight: 700;
  cursor: pointer;
`;

type IProps = {
  title: string;
  onClick: () => void;
  type: 'fill' | 'bordered';
};

export const MainButton = ({ title, onClick, type }: IProps) => {
  return (
    <button onClick={onClick} style={type === 'fill' ? fillButtonStyle : borderedButtonStyle}>
      {title}
    </button>
  );
};
