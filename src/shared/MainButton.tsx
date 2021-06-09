import React from 'react';

import { styled } from '../utils/css';

const buttonStyle = styled.cssStyle`
  width: 196px;
  height: 48px;
  background-color: #d2307a;
  border: 0;
  font-family: Titillium Web;
  color: white;
  text-transform: uppercase;
  font-weight: 700;
  text-size: 16px;
  line-height: 24.34px;
`;

type IProps = {
  title: string;
  onClick: () => void;
};

export const MainButton = ({ title, onClick }: IProps) => {
  return (
    <button onClick={onClick} style={buttonStyle}>
      {title}
    </button>
  );
};
