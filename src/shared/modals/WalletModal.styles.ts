import { sideColor, sideColor3, sideColor5, sideColor8 } from '../../utils/colorsUtil';
import { styled } from '../../utils/css';

export const modalContainerStyle = styled.cssStyle`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(1, 1, 1, 0.75);
`;

export const modalStyle = styled.cssClassName`
  padding: 1.5rem;
  background-color: ${sideColor8};
  margin: 0rem;
  width: 65%;
  max-width: 34.375rem;

  @media (max-width: 51.875rem) {
    margin: 0rem 1.5rem;
    width: 100%;
  }
`;

export const topRightBottomLeftNotch = styled.cssStyle`
  --notchSize: 1.63rem;

  clip-path: polygon(
    0% 0%,
    var(--notchSize) 0%,
    calc(100% - var(--notchSize)) 0%,
    100% var(--notchSize),
    100% calc(100%),
    calc(100% - var(--notchSize)) 100%,
    var(--notchSize) 100%,
    0% calc(100% - var(--notchSize))
  );
`;

export const accountTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.28125rem;
  flex: 1;
  color: ${sideColor5};
`;
export const tknValueTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.90125rem;
  color: ${sideColor3};
  margin-top: 0.5rem;
`;
export const enterAddressTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.52125rem;
  color: ${sideColor};
  margin-top: 1.125rem;
`;
export const closeIconStyle = styled.cssStyle`
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

export const closeIconParentStyle = styled.cssStyle`
  height: 1rem;
  width: 1rem;
  display: flex;
`;

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
