import { sideColor3, sideColor5 } from '../../utils/colorsUtil';
import { styled } from '../../utils/css';

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
