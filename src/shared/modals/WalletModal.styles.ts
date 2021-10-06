import { sideColor, sideColor3, sideColor5 } from '../../utils/colorsUtil';
import { styled } from '../../utils/css';

export const changeWalletBtnStyle = styled.cssStyle`
  border: 0.0625rem solid ${sideColor3};
  color: ${sideColor3};
  padding: 0.5rem 1.5rem;
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 0.75rem;
  cursor: pointer;
`;
export const addressTextStyle = styled.cssStyle`
  margin: 0 1.5rem;
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 1.25rem;
  margin-top: 0.75rem;
  color: ${sideColor5};
`;

export const copyAddressBtnStyle = styled.cssStyle`
  margin-left: 0.8125rem;
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 1rem;
  color: ${sideColor};
`;

export const viewInExplorerBtnStyle = styled.cssStyle`
  display: flex;
  margin-left: 0.8125rem;
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 1rem;
  color: ${sideColor};
`;

export const viewInExplorerParentStyle = styled.cssStyle`
  display: flex;
  margin-left: 1.625rem;
  cursor: pointer;
`;

export const copyAddressParentStyle = styled.cssStyle`
  display: flex;
  cursor: pointer;
`;

export const btnsContainerStyle = styled.cssStyle`
  display: flex;
  margin: 1.5rem 1.5rem 1.875rem 1.5rem;
`;
export const connectedTextStyle = styled.cssStyle`
  displa: flex;
  flex: 1;
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 1rem;
  color: ${sideColor};
`;
export const changeWalletParentStyle = styled.cssStyle`
  display: flex;
  margin: 1.5rem 1.5rem 0;
  align-items: center;
`;
export const accountParentStyle = styled.cssStyle`
  display: flex;
  align-items: center;
`;
export const boxStyle = styled.cssStyle`
  border: 0.0625rem solid #ccc;
  margin-top: 0.625rem;
`;

export const link = styled.cssStyle`
  text-decoration: none;
  display: flex;
`;
