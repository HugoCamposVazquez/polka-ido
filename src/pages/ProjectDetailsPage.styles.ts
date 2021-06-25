import { sideColor, sideColor3, sideColor4, sideColor5, sideColor6, sideColor7 } from '../utils/colorsUtil';
import { styled } from '../utils/css';

export const imageParentContainerClassName = styled.cssClassName`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 7.5rem;
  margin-right: 7.5rem;
  margin-top: 11.25rem;

  @media (max-width: 51.875rem) {
    margin-left: 0rem;
    margin-right: 0rem;
  }
`;
export const customTopRightObjectClassName = styled.cssClassName`
  position: absolute;
  height: 7.5rem;
  width: 7.5rem;
  background-color: ${sideColor3};
  top: 0;
  right: 0;

  @media (max-width: 51.875rem) {
    display: none;
  }
`;

export const customBottomLeftObjectClassName = styled.cssClassName`
  position: absolute;
  height: 7.5rem;
  width: 7.5rem;
  background-color: ${sideColor3};
  bottom: 0;
  left: 0;

  @media (max-width: 51.875rem) {
    display: none;
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
export const imageContainerClassName = styled.cssClassName`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  left: 1.25rem;
  bottom: 1.25rem;

  @media (max-width: 51.875rem) {
    top: 0rem;
    right: 0rem;
    left: 0rem;
    bottom: 0rem;
  }
`;
export const imageStyle = styled.cssClassName`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export const projectStatusTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 0.88rem;
  color: ${sideColor4};
`;

export const projectNameTextStyle = styled.cssClassName`
  font-family: Odibee Sans;
  font-weight: 400;
  font-size: 4rem;
  margin-top: 0.75rem;

  @media (max-width: 51.875rem) {
    font-size: 2.25rem;
  }
`;

export const shortDescriptionTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 1rem;
  color: ${sideColor3};
`;

export const descriptionTextStyle = styled.cssClassName`
  flex: 1;
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 1rem;
  color: ${sideColor};

  @media (max-width: 51.875rem) {
    font-size: 0.75rem;
  }
`;

export const description2TextStyle = styled.cssClassName`
  flex: 1;
  font-family: Titillium Web;
  font-weight: 600;
  font-size: 1rem;
  color: ${sideColor5};

  @media (max-width: 51.875rem) {
    font-size: 0.75rem;
  }
`;

export const contentTextStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 1.25rem;
  color: ${sideColor3};

  @media (max-width: 51.875rem) {
    font-size: 0.88rem;
  }
`;

export const content2TextStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 1.25rem;
  color: ${sideColor5};

  @media (max-width: 51.875rem) {
    font-size: 0.88rem;
  }
`;

export const content3TextStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-weight: 600;
  font-size: 1rem;
  color: ${sideColor3};

  @media (max-width: 51.875rem) {
    font-size: 0.88rem;
  }
`;

export const projectContainerStyle = styled.cssClassName`
  height: 100%;
  margin: 1.25rem;
  z-index: 1000;
  display: flex;

  @media (max-width: 75rem) {
    flex-direction: column;
  }

  @media (max-width: 51.875rem) {
    margin: 0rem;
  }
`;

export const descriptionParentStyle = styled.cssStyle`
  border-bottom: 0.06rem solid ${sideColor6};
  padding-bottom: 0.5rem;
  display: flex;
  margin-top: 0.5rem;
  align-items: center;
`;

export const smallTextStyle = styled.cssStyle`
  margin-top: 0.25rem;
  font-size: 0.88rem;
  color: ${sideColor6};
  font-family: Titillium Web;
  font-weight: 400;
`;

export const valueDescTextStyle = styled.cssClassName`
  font-family: Odibee Sans;
  font-weight: 400;
  font-size: 2.25rem;
  color: ${sideColor3};

  @media (max-width: 51.875rem) {
    font-size: 1.63rem;
  }
`;
export const projectImageBackgroundStyle = styled.cssClassName`
  height: 7.5rem;
  width: 7.5rem;
  background-color: ${sideColor4};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 51.875rem) {
    height: 5rem;
    width: 5rem;
  }
`;

export const projectStatusBackgroundStyle = styled.cssClassName`
  height: 1.75rem;
  width: 6.75rem;
  background-color: ${sideColor7};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 51.875rem) {
    height: 1.56rem;
    width: 6.13rem;
  }
`;

export const projectDetailsBtnsParentStyle = styled.cssClassName`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  margin-right: 2.25rem;
  margin-left: 2.25rem;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 51.875rem) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

export const allocationsTitleStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 1.25rem;
  color: ${sideColor5};

  @media (max-width: 51.875rem) {
    font-size: 0.88rem;
  }
`;

export const allocationsItemNormalStyle = styled.cssClassName`
  font-familiy: Titillium Web;
  font-weight: 400;
  font-size: 1rem;
  color: ${sideColor};

  @media (max-width: 51.875rem) {
    font-size: 0.75rem;
  }
`;

export const allocationsItemBoldStyle = styled.cssClassName`
  font-familiy: Titillium Web;
  font-weight: 700;
  font-size: 1rem;
  color: ${sideColor5};

  @media (max-width: 51.875rem) {
    font-size: 0.75rem;
  }
`;

export const allocationsTotalTextStyle = styled.cssClassName`
  font-familiy: Titillium Web;
  font-weight: 400;
  font-size: 1.5rem;
  color: ${sideColor};

  @media (max-width: 51.875rem) {
    font-size: 0.88rem;
  }
`;
export const subtitleStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-weight: 600;
  font-size: 2.25rem;

  @media (max-width: 51.875rem) {
    font-size: 1.63rem;
  }
`;

export const projectDetailsSubtitleStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 1.5rem;
`;

export const projectDetailsItemStyle = styled.cssStyle`
  display: flex;
  padding: 0.75rem 0;
  border-bottom: 0.06rem solid ${sideColor};
`;

export const etherScanBtnStyle = styled.cssStyle`
  padding: 0.25rem 1.5rem;
  border: 0.06rem solid ${sideColor5};
  cursor: pointer;
`;

export const aboutTextStyle = styled.cssStyle`
  margin-top: 1.5rem;
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 1rem;
  color: ${sideColor};
`;

export const projectContainerRightStyle = styled.cssClassName`
  margin-top: 1.75rem;
  margin-right: 2.25rem;

  @media (max-width: 75rem) {
    margin-left: 2.25rem;
  }

  @media (max-width: 51.875rem) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

export const shortDescriptionTextClassName = styled.cssClassName`
  margin-top: 0.75rem;
  max-width: 25rem;

  font-family: Titillium Web;
  font-weight: 400;
  font-size: 1rem;
  color: ${sideColor};

  @media (max-width: 75rem) {
    max-width: initial;
  }
`;

export const projectDetailsContainerClassName = styled.cssClassName`
  display: flex;
  margin: 0 -1.5rem;
  margin-top: 2.25rem;

  @media (max-width: 75rem) {
    flex-direction: column;
  }
`;

export const projectDetailsTokenClassName = styled.cssClassName`
  margin-top: 0rem !important;

  @media (max-width: 75rem) {
    margin-top: 2.25rem !important;
  }
`;

export const projectImageContainerClassName = styled.cssClassName`
  margin-top: 2.25rem;
  margin-left: 2.25rem;
  margin-right: 2.25rem;
  display: flex;

  @media (max-width: 51.875rem) {
    margin-top: 1.5rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

export const shortDescriptionContainerClassName = styled.cssClassName`
  margin-top: 3.25rem;
  margin-left: 2.25rem;
  margin-right: 2.25rem;

  @media (max-width: 51.875rem) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-top: 2.25rem;
  }
`;

export const projectIconClassName = styled.cssClassName`
  height: 4.5rem;
  width: 4.5rem;

  @media (max-width: 51.875rem) {
    height: 3rem;
    width: 3rem;
  }
`;

export const allocationsContainerClassName = styled.cssClassName`
  margin: 7.5rem;
  max-width: 43.75rem;

  @media (max-width: 51.875rem) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-top: 4.5rem;
    margin-bottom: 4.5rem;
  }
`;

export const projectDetailsRootContainerClassName = styled.cssClassName`
  margin: 7.5rem;

  @media (max-width: 51.875rem) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-top: 4.5rem;
    margin-bottom: 4.5rem;
  }
`;

export const aboutTheProjectContainerClassName = styled.cssClassName`
  margin: 7.5rem;
  margin-bottom: 0rem;

  @media (max-width: 51.875rem) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-top: 4.5rem;
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
