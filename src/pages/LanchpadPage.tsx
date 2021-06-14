import React from 'react';

import { ProjectCard } from '../shared/ProjectCard';
import { cs, styled } from '../utils/css';

const mainImageContainerClassName = styled.cssClassName`
  position: absolute;
  height: 457px;
  width: 690px;
  top: 20px;
  right: 20px;

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

const mainImageStyle = styled.cssClassName`
  position: absolute;
  height: 100%;
  width: 100%;

  @media (max-width: 830px) {
    position: relative;
  }
`;

const imageContainerClassName = styled.cssClassName`
  display: flex;
  flex-direction: column;
  height: 546px;
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

const customObjectClassName = styled.cssClassName`
  position: absolute;
  height: 120px;
  width: 120px;
  background-color: #d2307a;
  top: 0;
  right: 0;
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

const boldTextStyle = styled.cssStyle`
  font-weight: 700;
  font-size: 20px;
  line-height: 30.42px;
  font-family: Titillium Web;

  @media (max-width: 830px) {
    font-size: 14px;
  }
`;

const normalTextStyle = styled.cssStyle`
  font-weight: 400;
  font-size: 20px;
  line-height: 30.42px;
  font-family: Titillium Web;

  @media (max-width: 830px) {
    font-size: 14px;
  }
`;

const projectsCardsHeaderClassName = styled.cssClassName`
  padding: 0 120px;
  display: flex;
  border-bottom: 1px solid #292929;

  @media (max-width: 830px) {
    padding: 0 24px;
    margin-top: 40px;
  }
`;

const projectsCardsHeaderItemClassName = styled.cssClassName`
  margin-right: 36px;
  padding-bottom: 15px;

  @media (max-width: 830px) {
    margin-right: 24px;
  }
`;

const projectsCardsContainerParentClassName = styled.cssClassName`
  margin-top: 30px;
  margin-left: 120px;
  margin-right: 120px;

  @media (max-width: 830px) {
    margin-left: 24px;
    margin-right: 24px;
  }
`;

const searchIconClassName = styled.cssClassName`
  display: grid;

  @media (max-width: 830px) {
    display: none;
  }
`;

const projectsCardsContainerClassName = styled.cssClassName`
  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;

  @media (max-width: 1435px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 830px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

export const LaunchpadPage = () => {
  return (
    <div>
      <div className={imageContainerClassName}>
        <div style={{ position: 'relative' }}>
          <div className={customObjectClassName} style={topLeftBottomRightNotch} />

          <div className={mainImageContainerClassName}>
            <img className={mainImageStyle} src={process.env.PUBLIC_URL + '/ryu3.png'} />
            <div style={imageShadowStyle} />
          </div>
        </div>

        <div className={launchpadParentClassName}>
          <div className={launchpadTextClassName}>LAUNCHPAD</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', marginTop: '12px' }}>
              <div style={cs(boldTextStyle, { flex: 1, color: '#D2307A' })}>Projects launched</div>
              <div style={cs(boldTextStyle, { color: '#D2307A' })}>12</div>
            </div>
            <div style={{ display: 'flex', marginTop: '12px' }}>
              <div style={cs({ flex: 1 }, normalTextStyle)}>Funds raised</div>
              <div style={boldTextStyle}>238753 USDT</div>
            </div>
            <div style={{ display: 'flex', marginTop: '12px' }}>
              <div style={cs({ flex: 1 }, normalTextStyle)}>Users participated</div>
              <div style={boldTextStyle}>3494</div>
            </div>
          </div>
        </div>
      </div>
      <div className={projectsCardsHeaderClassName}>
        <div style={{ flex: 1, display: 'flex' }}>
          <div className={projectsCardsHeaderItemClassName} style={{ borderBottom: '4px solid #D2307A' }}>
            Upcoming
          </div>
          <div className={projectsCardsHeaderItemClassName}>Featured</div>
          <div className={projectsCardsHeaderItemClassName}>Joined</div>
          <div className={projectsCardsHeaderItemClassName}>All</div>
        </div>
        <div className={searchIconClassName}>
          <img src={process.env.PUBLIC_URL + '/search_icon.svg'} />
        </div>
      </div>
      <div className={projectsCardsContainerParentClassName}>
        <div className={projectsCardsContainerClassName}>
          <ProjectCard direction={'right'} />
          <ProjectCard direction={'left'} />
          <ProjectCard direction={'right'} />
          <ProjectCard direction={'left'} />
          <ProjectCard direction={'left'} />
          <ProjectCard direction={'right'} />
          <ProjectCard direction={'left'} />
          <ProjectCard direction={'right'} />
          <ProjectCard direction={'right'} />
          <ProjectCard direction={'left'} />
          <ProjectCard direction={'right'} />
          <ProjectCard direction={'left'} />
          <ProjectCard direction={'left'} />
          <ProjectCard direction={'right'} />
          <ProjectCard direction={'left'} />
          <ProjectCard direction={'right'} />
        </div>
      </div>
    </div>
  );
};
