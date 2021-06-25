import { sideColor3, sideColor9 } from '../utils/colorsUtil';
import { styled } from '../utils/css';

export const pageIntroContainerClassName = styled.cssClassName`
  display: block;
  @media (max-width: 51.875rem) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const mainImageContainerClassName = styled.cssClassName`
  position: absolute;
  height: 50rem;
  width: 57rem;
  top: 0;
  right: 0;

  @media (max-width: 51.875rem) {
    position: relative;
    height: auto;
    width: auto;
    margin-top: 1.25rem;
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

export const imageShadowStyle = styled.cssStyle`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;

  background: linear-gradient(180deg, rgba(1, 1, 1, 0) 91.75%, ${sideColor9} 100%, ${sideColor9} 100%),
    linear-gradient(70.6deg, ${sideColor9} 13.02%, rgba(1, 1, 1, 0) 86.98%);
`;

export const titleContainerParentStyle = styled.cssClassName`
  position: relative;
  display: flex;
  padding: 0 7.5rem;

  @media (max-width: 51.875rem) {
    padding: 0 1.5rem;
  }
`;

export const titleContainerClassName = styled.cssClassName`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 51.875rem) {
    flex: 1;
  }
`;

export const titleStyle = styled.cssClassName`
  font-weight: 400;
  font-size: 4rem;
  line-height: 4.5rem;
  font-family: Odibee Sans;
  margin-top: 13.75rem;

  @media (max-width: 51.875rem) {
    font-size: 2.63rem;

    line-height: 2.9rem;
  }
`;

export const subTitleStyle = styled.cssClassName`
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.75rem;
  margin-top: 0.94rem;
  font-family: Titillium Web;

  @media (max-width: 51.875rem) {
    font-size: 0.88rem;
    line-height: 1.23rem;
  }
`;

export const featuredProjectsTitleStyle = styled.cssClassName`
  font-weight: 600;
  font-size: 2.25rem;
  line-height: 3.4rem;
  font-family: Titillium Web;
  margin-bottom: 0.63rem;

  @media (max-width: 51.875rem) {
    font-size: 1.63rem;
    line-height: 2.37rem;
  }
`;

export const featuredProjectsContainerClassName = styled.cssClassName`
  margin-top: 13.75rem;
  margin-bottom: 10rem;
  position: relative;
  padding: 0 7.5rem;

  @media (max-width: 51.875rem) {
    margin-top: 2.2rem;
    margin-bottom: 5rem;
    padding: 0 1.5rem;
  }
`;

export const featuredProjectsCardsContainerClassName = styled.cssClassName`
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

export const mainImage2ContainerClassName = styled.cssClassName`
  position: absolute;
  height: 32.9rem;
  width: 49.5rem;
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

export const mainImage2Style = styled.cssClassName`
  position: absolute;
  height: 100%;
  width: 100%;

  @media (max-width: 51.875rem) {
    position: relative;
  }
`;

export const bottomImageContainerClassName = styled.cssClassName`
  display: flex;
  flex-direction: column;
  height: 34.1rem;
  position: relative;
  padding: 0 7.5rem;

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

export const tellUsAboutYourProjectParentClassName = styled.cssClassName`
  min-width: 21.9rem;
  max-width: 40%;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 51.875rem) {
    padding: 0 1.5rem;
    max-width: initial;
    margin-bottom: 2.5rem;
  }
`;

export const tellUsAboutYourProjectTextClassName = styled.cssClassName`
  font-weight: 600;
  font-size: 2.25rem;
  line-height: 3.4rem;
  font-family: Titillium Web;
  width: 60%;

  @media (max-width: 89.375rem) {
    width: 75%;
  }

  @media (max-width: 51.875rem) {
    width: 100%;
    font-size: 1.63rem;
    line-height: 2.47rem;
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

export const viewAllProjectsStyle = styled.cssStyle`
  font-weight: 600;
  margin-right: 0.63rem;
  font-size: 0.94rem;
  font-family: Titillium Web;
  color: ${sideColor3};
  cursor: pointer;
`;

export const textFieldContainerStyle = styled.cssStyle`
  margin: 2.25rem 0;
`;
