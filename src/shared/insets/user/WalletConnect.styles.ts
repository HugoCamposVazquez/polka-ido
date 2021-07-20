import { sideColor3, sideColor4, sideColor5 } from '../../../utils/colorsUtil';
import { styled } from '../../../utils/css';

export const connectWalletContainerStyle = styled.cssStyle`
  background-color: ${sideColor5};
  display: flex;
  margin-left: 1.4375rem;
  cursor: pointer;
`;

export const balanceStyle = styled.cssStyle`
  color: ${sideColor4};
  padding: 0.4375rem 0.5rem;
  font-weight: 700;
  font-size: 0.75rem;
  font-family: 'Titillium Web';
`;

export const addressContainerStyle = styled.cssStyle`
  background-color: ${sideColor3};
  margin: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 5.25rem;
`;

export const addressStyle = styled.cssStyle`
  padding: 0.1875rem 0.5rem;
  font-family: 'Titillium Web';
  font-size: 0.75rem;
  font-weight: 700;
`;
