import { sideColor5, sideColor8 } from '../../utils/colorsUtil';
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

export const closeIconParentStyle = styled.cssStyle`
  height: 1rem;
  width: 1rem;
  display: flex;
`;

export const closeIconStyle = styled.cssStyle`
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

export const titleParentStyle = styled.cssStyle`
  display: flex;
  align-items: center;
`;

export const titleTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.28125rem;
  flex: 1;
  color: ${sideColor5};
`;
