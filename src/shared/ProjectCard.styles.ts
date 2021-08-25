import { sideColor3, sideColor4, sideColor5, sideColor8, sideColor10 } from '../utils/colorsUtil';
import { styled } from '../utils/css';

export const projectCardContainer = styled.cssStyle`
  background-color: ${sideColor8};
  cursor: pointer;
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

export const bottomRightNotch = styled.cssStyle`
  --notchSize: 1.63rem;

  clip-path: polygon(
    0% 0%,
    var(--notchSize) 0%,
    calc(100%) 0%,
    100% var(--notchSize),
    100% calc(100% - var(--notchSize)),
    calc(100% - var(--notchSize)) 100%,
    0% 100%,
    0% calc(100% - var(--notchSize))
  );
`;

export const bottomLeftNotch = styled.cssStyle`
  --notchSize: 1.63rem;

  clip-path: polygon(
    0% 0%,
    var(--notchSize) 0%,
    calc(100%) 0%,
    100% var(--notchSize),
    100% calc(100% - var(--notchSize)),
    calc(100%) 100%,
    var(--notchSize) 100%,
    0% calc(100% - var(--notchSize))
  );
`;

export const projectCardHeaderContainer = styled.cssStyle`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  margin: 1.5rem 1rem 0;
`;

export const projectCardHeaderIconContainer = styled.cssStyle`
  width: 3rem;
  height: 3rem;
  background-color: ${sideColor4};
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const projectCardHeaderIconStyle = styled.cssStyle`
  height: 1.5rem;
  width: 1.5rem;
`;

export const projectCardStatusTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 0.88rem;
  color: ${sideColor10};
  line-height: 1.23rem;
  text-transform: capitalize;
`;

export const projectNameContainerStyle = styled.cssStyle`
  margin: 0.63rem 1rem;
`;

export const projectNameStyle = styled.cssStyle`
  font-family: Odibee Sans;
  font-weight: 400;
  font-size: 1.75rem;
  line-height: 1.94rem;
`;

export const projectDescriptionContainerStyle = styled.cssClassName`
  margin: 0.63rem 1rem;
  height: 6.88rem;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 0.38rem;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(144, 139, 139, 0.35);
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export const projectDescriptionStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4rem;
`;

export const raiseAmountStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 1.23rem;
  margin: 2.63rem 1rem 0;
`;

export const progressTextContainerStyle = styled.cssStyle`
  font-family: Odibee Sans;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.39rem;
  height: 2.78rem;
  margin: 0.25rem 1rem 0;
  display: flex;
`;

export const progressTextPrefixStyle = styled.cssStyle`
  color: ${sideColor3};
`;

export const progressTextSufixStyle = styled.cssStyle`
  color: ${sideColor5};
`;

export const detailsTitleStyle = styled.cssStyle`
  font-family: Titillium Web;
  padding: 0.25rem 0 0 0;
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 1.33rem;
`;

export const detailsValueStyle = styled.cssStyle`
  font-family: Titillium Web;
  padding: 0 0 0.25rem 0;
  color: ${sideColor3};
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.52rem;
  margin-right: 0.75rem;
`;
