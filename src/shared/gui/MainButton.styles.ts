import { sideColor, sideColor2, sideColor3, sideColor5, sideColor8 } from '../../utils/colorsUtil';
import { cs, styled } from '../../utils/css';

export const fillButtonStyle = styled.cssStyle`
  height: 3rem;
  width: 12.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${sideColor3};
  font-size: 1rem;
  font-family: Titillium Web;
  font-weight: 700;
  border: 0.06rem solid ${sideColor3};
  color: ${sideColor5};
  cursor: pointer;
`;

export const fillButtonDisabledStyle = cs(
  fillButtonStyle,
  styled.cssStyle`
    background-color: ${sideColor};
    color: ${sideColor8};
    border-color: ${sideColor2};
    cursor: not-allowed;
  `,
);

export const borderedButtonStyle = styled.cssStyle`
  border: 0.06rem solid ${sideColor3};
  height: 3rem;
  width: 12.25rem;
  margin-right: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: ${sideColor3};
  font-size: 1rem;
  font-family: Titillium Web;
  font-weight: 700;
  cursor: pointer;
`;
