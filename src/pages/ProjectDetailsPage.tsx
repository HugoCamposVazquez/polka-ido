import React from 'react';

import { styled } from '../utils/css';

const imageParentContainerClassName = styled.cssClassName`
  display: flex;
  flex-direction: column;
  height: 563px;
  position: relative;
  padding: 0 120px;
  margin-top: 180px;

  @media (max-width: 830px) {
    height: auto;
    padding: 0;
    display: flex;
    flex-direction: column-reverse;
  }
`;
const customTopRightObjectClassName = styled.cssClassName`
  position: absolute;
  height: 120px;
  width: 120px;
  background-color: #d2307a;
  top: 0;
  right: 0;
`;

const customBottomLeftObjectClassName = styled.cssClassName`
  position: absolute;
  height: 120px;
  width: 120px;
  background-color: #d2307a;
  top: 403px;
  left: 0;
`;

const imageShadowStyle = styled.cssStyle`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  background: linear-gradient(180deg, rgba(1, 1, 1, 0) 91.75%, #010101 100%, #010101 100%),
    linear-gradient(70.6deg, #010101 13.02%, rgba(1, 1, 1, 0) 86.98%);
`;
const topLeftBottomRightNotch = styled.cssStyle`
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
const imageContainerClassName = styled.cssClassName`
  position: absolute;
  height: 483px;

  top: 20px;
  right: 20px;
  left: 20px;

  @media (max-width: 830px) {
    position: relative;
    height: auto;
    width: auto;
    top: 0;
    right: 0;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }
`;
const imageStyle = styled.cssClassName`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;

  @media (max-width: 830px) {
    position: relative;
  }
`;
const launchpadParentClassName = styled.cssClassName`
  min-width: 300px;
  max-width: min-content;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 830px) {
    padding: 0 24px;
    margin-bottom: 40px;
    max-width: initial;
  }
`;

const launchpadTextClassName = styled.cssClassName`
  font-weight: 400;
  font-size: 4rem;
  line-height: 4.5rem;
  font-family: Odibee Sans;

  @media (max-width: 830px) {
    font-size: 42px;
  }
`;

export const ProjectDetailsPage = () => {
  return (
    <div>
      <div className={imageParentContainerClassName}>
        <div style={{ position: 'relative' }}>
          <div className={customTopRightObjectClassName} style={topLeftBottomRightNotch} />
          <div className={customBottomLeftObjectClassName} style={topLeftBottomRightNotch} />

          <div className={imageContainerClassName}>
            <img className={imageStyle} src={process.env.PUBLIC_URL + '/rectangle_image.png'} />
            <div style={imageShadowStyle} />
          </div>
        </div>
      </div>
    </div>
  );
};
