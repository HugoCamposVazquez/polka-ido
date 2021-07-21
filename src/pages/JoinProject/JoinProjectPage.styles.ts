import { sideColor, sideColor3, sideColor4, sideColor5, sideColor6, sideColor8 } from '../../utils/colorsUtil';
import { styled } from '../../utils/css';

export const cardStyle = styled.cssClassName`
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
  border: 0.0625rem solid ${sideColor6};
  padding: 0.25rem 0.5rem;
`;

export const subtitleTextStyle = styled.cssStyle`
  padding: 0.25rem 0.5rem 0rem 0.5rem;
  font-family: Titillium Web;
  color: ${sideColor};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.52125rem;
`;

export const suffixTextStyle = styled.cssStyle`
  padding: 0.5rem 0.5rem;
  font-family: Titillium Web;
  color: ${sideColor3};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.52125rem;
`;

export const projectTitleStyle = styled.cssStyle`
  font-family: Odibee Sans;
  color: ${sideColor5};
  font-size: 3rem;
  font-weight: 400;
  line-height: 3.32375rem;
  display: flex;
  justify-content: center;
`;

export const backToProjectsTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  color: ${sideColor};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.52125rem;
  margin-left: 0.75rem;
`;

export const maxAllocTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  color: ${sideColor};
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.52125rem;
  text-align: center;
  margin-top: 0.5rem;
`;

export const backToProjectContainerStyle = styled.cssClassName`
  position: absolute;
  margin: 0rem 7.5rem;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  align-items: center;
  cursor: pointer;

  @media (max-width: 51.875rem) {
    position: relative;
    margin: 0rem 1.5rem;
  }
`;

export const formContainerStyle = styled.cssStyle`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3.75rem;
`;

export const maxBtnStyle = styled.cssStyle`
  width: 3.375rem;
  height: 1.5625rem;
  background-color: ${sideColor5};
  color: ${sideColor4};
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const titleContainerStyle = styled.cssStyle`
  position: relative;
  margin-top: 11.25rem;
`;
export const arrowContainerStyle = styled.cssStyle`
  display: flex;
  justify-content: center;
  margin: 0.75rem 0rem;
`;
export const fieldContainerStyle = styled.cssStyle`
  display: flex;
  align-items: center;
`;
