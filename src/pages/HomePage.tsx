import React from 'react';

import { ProjectCard } from '../shared/ProjectCard';
import { cs, styled } from '../utils/css';

const mainImageStyle = styled.cssStyle`
  position: fixed;
  height: 50rem;
  width: 57rem;
  top: 0;
  right: 0;
`;

const mainImageShadowStyle = styled.cssStyle`
  background: linear-gradient(180deg, rgba(1, 1, 1, 0) 91.75%, #010101 100%, #010101 100%),
    linear-gradient(70.6deg, #010101 13.02%, rgba(1, 1, 1, 0) 86.98%);
`;

const titleContainerParentStyle = styled.cssStyle`
  height: 42.5rem;
  position: relative;
  display: flex;
  padding: 0 7.5rem;
`;

const titleContainerStyle = styled.cssStyle`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const titleStyle = styled.cssStyle`
  font-weight: 400;
  font-size: 4rem;
  line-height: 4.5rem;
  font-family: Odibee Sans;
`;

const subTitleStyle = styled.cssStyle`
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.75rem;
  margin-top: 0.94rem;
  font-family: Titillium Web;
`;

const featuredProjectsTitleStyle = styled.cssStyle`
  font-weight: 600;
  font-size: 2.25rem;
  line-height: 3.4rem;
  font-family: Titillium Web;
  margin-bottom: 0.63rem;
`;

const featuredProjectsContainerStyle = styled.cssStyle`
  height: 42.5rem;
  position: relative;
  padding: 0 7.5rem;
`;

const featuredProjectsCardsContainerStyle = styled.cssStyle`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  gap: 1.25rem;
`;

export const HomePage = () => {
  return (
    <div style={{ height: '100%' }}>
      <img style={mainImageStyle} src={process.env.PUBLIC_URL + '/ryu.png'} />
      <div style={cs(mainImageStyle, mainImageShadowStyle)}></div>
      <div style={titleContainerParentStyle}>
        <div style={titleContainerStyle}>
          <div style={titleStyle}>LOREM IPSUM DOLOR SIT AMET</div>
          <div style={subTitleStyle}>
            For athletes, high altitude produces two contradictory effects on performance. For explosive events (sprints
            up to 400 metres, long jump, triple jump)
          </div>
        </div>
      </div>
      <div style={featuredProjectsContainerStyle}>
        <div style={featuredProjectsTitleStyle}>Featured projects</div>
        <div style={featuredProjectsCardsContainerStyle}>
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </div>
  );
};
