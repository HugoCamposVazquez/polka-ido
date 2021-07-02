import { sideColor, sideColor3, sideColor4, sideColor5, sideColor6, sideColor8 } from '../utils/colorsUtil';
import { styled } from '../utils/css';

export const cardStyle = styled.cssClassName`
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

export const topLeftBottomRightNotch = styled.cssStyle`
  --notchSize: 1.63rem;

  clip-path: polygon(
    0% var(--notchSize),
    var(--notchSize) 0%,
    calc(100%) 0%,
    100% var(--notchSize),
    100% calc(100% - var(--notchSize)),
    calc(100% - var(--notchSize)) 100%,
    0% 100%,
    0% calc(100% - var(--notchSize))
  );
`;

export const boxContainerStyle = styled.cssStyle`
  border: 1px solid ${sideColor6};
  padding: 4px 8px;
`;

export const subtitleTextStyle = styled.cssStyle`
  padding: 4px 8px 0px 8px;
  font-family: Titillium Web;
  color: ${sideColor};
  font-size: 16px;
  font-weight: 400;
  line-height: 24.34px;
`;

export const suffixTextStyle = styled.cssStyle`
  padding: 8px 8px;
  font-family: Titillium Web;
  color: ${sideColor3};
  font-size: 16px;
  font-weight: 400;
  line-height: 24.34px;
`;

export const projectTitleStyle = styled.cssStyle`
  font-family: Odibee Sans;
  color: ${sideColor5};
  font-size: 48px;
  font-weight: 400;
  line-height: 53.18px;
  display: flex;
  justify-content: center;
`;

export const backToProjectsTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  color: ${sideColor};
  font-size: 16px;
  font-weight: 400;
  line-height: 24.34px;
  margin-left: 12px;
`;

export const maxAllocTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  color: ${sideColor};
  font-size: 14px;
  font-weight: 400;
  line-height: 24.34px;
  text-align: center;
  margin-top: 8px;
`;

export const backToProjectContainerStyle = styled.cssClassName`
  position: absolute;
  margin: 0px 120px;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  align-items: center;
  cursor: pointer;

  @media (max-width: 51.875rem) {
    position: relative;
    margin: 0px 24px;
  }
`;

export const formContainerStyle = styled.cssStyle`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;

export const maxBtnStyle = styled.cssStyle`
  width: 54px;
  height: 25px;
  background-color: ${sideColor5};
  color: ${sideColor4};
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const titleContainerStyle = styled.cssStyle`
  position: relative;
  margin-top: 180px;
`;
export const arrowContainerStyle = styled.cssStyle`
  display: flex;
  justify-content: center;
  margin: 12px 0px;
`;
export const fieldContainerStyle = styled.cssStyle`
  display: flex;
  align-items: center;
`;
