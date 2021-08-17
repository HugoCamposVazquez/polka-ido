import { sideColor2, sideColor3, sideColor9 } from '../utils/colorsUtil';
import { styled } from '../utils/css';

export const mainImageContainerClassName = styled.cssClassName`
  position: absolute;
  height: 28.6rem;
  width: 43.1rem;
  top: 1.25rem;
  right: 1.25rem;

  @media (max-width: 51.875rem) {
    position: relative;
    height: auto;
    width: auto;
    top: 0;
    right: 0;
    margin-top: 1.25rem;
    margin-left: 1.25rem;
    margin-right: 1.25rem;
  }
`;

export const mainImageStyle = styled.cssClassName`
  position: absolute;
  height: 100%;
  width: 100%;

  @media (max-width: 51.875rem) {
    position: relative;
  }
`;

export const imageContainerClassName = styled.cssClassName`
  display: flex;
  flex-direction: column;
  height: 29.8rem;
  position: relative;
  padding: 0 7.5rem;
  margin-top: 11.25rem;

  @media (max-width: 51.875rem) {
    height: auto;
    padding: 0;
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const customObjectClassName = styled.cssClassName`
  position: absolute;
  height: 7.5rem;
  width: 7.5rem;
  background-color: ${sideColor3};
  top: 0;
  right: 0;
`;
export const imageShadowStyle = styled.cssStyle`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;

  background: linear-gradient(180deg, rgba(1, 1, 1, 0) 91.75%, ${sideColor9} 100%, ${sideColor9} 100%),
    linear-gradient(70.6deg, ${sideColor9} 13.02%, rgba(1, 1, 1, 0) 86.98%);
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

export const selectedTabStyle = styled.cssStyle`
  border-bottom: 0.25rem solid ${sideColor3};
`;

export const launchpadDetailsItemStyle = styled.cssStyle`
  display: flex;
  margin-top: 0.75rem;
`;

export const launchpadParentClassName = styled.cssClassName`
  min-width: 18.75rem;
  max-width: min-content;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 51.875rem) {
    padding: 0 1.5rem;
    margin-bottom: 2.5rem;
    max-width: initial;
  }
`;

export const launchpadTextClassName = styled.cssClassName`
  font-weight: 400;
  font-size: 4rem;
  line-height: 4.5rem;
  font-family: Odibee Sans;

  @media (max-width: 51.875rem) {
    font-size: 2.63rem;
    line-height: 2.9rem;
  }
`;

export const boldTextStyle = styled.cssClassName`
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.9rem;
  font-family: Titillium Web;
`;

export const normalTextStyle = styled.cssClassName`
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.9rem;
  font-family: Titillium Web;
`;

export const projectsCardsHeaderClassName = styled.cssClassName`
  padding: 0 7.5rem;
  display: flex;
  border-bottom: 0.06rem solid ${sideColor2};
  margin-top: 2.5rem;

  @media (max-width: 51.875rem) {
    padding: 0 1.5rem;
    margin-top: 2.5rem;
  }
`;

export const projectsCardsHeaderItemClassName = styled.cssClassName`
  margin-right: 2.25rem;
  padding-bottom: 0.94rem;
  padding-top: 0.94rem;
  padding-left: 0.31rem;
  padding-right: 0.31rem;
  cursor: pointer;

  @media (max-width: 51.875rem) {
    margin-right: 1.5rem;
  }
`;

export const projectsCardsContainerParentClassName = styled.cssClassName`
  margin-top: 1.88rem;
  margin-left: 7.5rem;
  margin-right: 7.5rem;

  @media (max-width: 51.875rem) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

export const projectsCardsContainerClassName = styled.cssClassName`
  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;

  @media (max-width: 89.6875rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 51.875rem) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;
