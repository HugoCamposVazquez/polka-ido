import { sideColor, sideColor3, sideColor6 } from '../../utils/colorsUtil';
import { styled } from '../../utils/css';

export const tknValueTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.90125rem;
  color: ${sideColor3};
  margin-top: 0.5rem;
`;

export const addressInputContainerStyle = styled.cssStyle`
  border: 0.0625rem solid ${sideColor6};
  padding: 0.25rem 0.5rem;
  margin-top: 1.875rem;
`;

export const recipientTextStyle = styled.cssStyle`
  padding: 0.25rem 0.5rem 0rem 0.5rem;
  font-family: Titillium Web;
  color: ${sideColor};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.52125rem;
`;
