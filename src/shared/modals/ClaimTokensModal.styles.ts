import { sideColor, sideColor3, sideColor5, sideColor6, sideColor8 } from '../../utils/colorsUtil';
import { styled } from '../../utils/css';

export const modalContainerStyle = styled.cssStyle`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(1, 1, 1, 0.75);
`;

export const modalStyle = styled.cssClassName`
  padding: 24px;
  background-color: ${sideColor8};
  margin: 0px;
  width: 65%;
  max-width: 550px;

  @media (max-width: 51.875rem) {
    margin: 0px 24px;
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

export const claimTokenTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 24px;
  line-height: 36.5px;
  flex: 1;
  color: ${sideColor5};
`;
export const tknValueTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 20px;
  line-height: 30.42px;
  color: ${sideColor3};
  margin-top: 8px;
`;
export const enterAddressTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 16px;
  line-height: 24.34px;
  color: ${sideColor};
  margin-top: 18px;
`;

export const addressInputContainerStyle = styled.cssStyle`
  border: 1px solid ${sideColor6};
  padding: 4px 8px;
  margin-top: 30px;
`;

export const recipientTextStyle = styled.cssStyle`
  padding: 4px 8px 0px 8px;
  font-family: Titillium Web;
  color: ${sideColor};
  font-size: 16px;
  font-weight: 400;
  line-height: 24.34px;
`;

export const closeIconParentStyle = styled.cssStyle`
  height: 16px;
  width: 16px;
  display: flex;
`;

export const closeIconStyle = styled.cssStyle`
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

export const claimTokenParentStyle = styled.cssStyle`
  display: flex;
  align-items: center;
`;
