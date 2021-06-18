import ProgressBar from '@ramonak/react-progress-bar/dist';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { ProjectType } from '../types/ProjectType';
import { cs, styled } from '../utils/css';

const projectCardContainer = styled.cssStyle`
  background-color: #484848;
  cursor: pointer;
`;

const topRightBottomLeftNotch = styled.cssStyle`
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

const bottomRightNotch = styled.cssStyle`
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

const bottomLeftNotch = styled.cssStyle`
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

const projectCardHeaderContainer = styled.cssStyle`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  margin: 1.5rem 1rem 0;
`;

const projectCardHeaderIconContainer = styled.cssStyle`
  width: 3rem;
  height: 3rem;
  background-color: black;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const projectCardHeaderIconStyle = styled.cssStyle`
  height: 1.5rem;
  width: 1.5rem;
`;

const projectCardStatusTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 0.88rem;
  color: #27f0dc;
  line-height: 1.23rem;
  text-transform: capitalize;
`;

const projectNameContainerStyle = styled.cssStyle`
  margin: 0.63rem 1rem;
`;

const projectNameStyle = styled.cssStyle`
  font-family: Odibee Sans;
  font-weight: 400;
  font-size: 1.75rem;
  line-height: 1.94rem;
`;

const projectDescriptionContainerStyle = styled.cssClassName`
  margin: 0.63rem 1rem;
  height: 6.88rem;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(144, 139, 139, 0.35);
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const projectDescriptionStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4rem;
`;

const raiseAmountStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 1.23rem;
  margin: 2.63rem 1rem 0;
`;

const progressTextContainerStyle = styled.cssStyle`
  font-family: Odibee Sans;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.39rem;
  margin: 0.25rem 1rem 0;
  display: flex;
`;

const progressTextPrefixStyle = styled.cssStyle`
  color: #d2307a;
`;

const progressTextSufixStyle = styled.cssStyle`
  color: white;
`;

const detailsTitleStyle = styled.cssStyle`
  font-family: Titillium Web;
  padding: 0.25rem 0 0 0;
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 1.33rem;
`;

const detailsValueStyle = styled.cssStyle`
  font-family: Titillium Web;
  padding: 0 0 0.25rem 0;
  color: #d2307a;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.52rem;
  margin-right: 12px;
`;

type IProps = {
  direction: 'left' | 'right';
  project: ProjectType;
};

export const ProjectCard = ({ direction, project }: IProps) => {
  const navigation = useHistory();

  return (
    <div
      style={cs(projectCardContainer, direction === 'left' ? topLeftBottomRightNotch : topRightBottomLeftNotch)}
      onClick={() => {
        navigation.push(`/project/${project.id}`);
      }}>
      <div style={projectCardHeaderContainer}>
        <div style={{ flex: 1 }}>
          <div style={projectCardHeaderIconContainer}>
            <img style={projectCardHeaderIconStyle} src={project.iconUrl} />
          </div>
        </div>
        <div style={projectCardStatusTextStyle}>{project.status}</div>
      </div>
      <div style={projectNameContainerStyle}>
        <div style={projectNameStyle}>{project.title}</div>
      </div>

      <div className={projectDescriptionContainerStyle}>
        <div style={projectDescriptionStyle}>{project.description}</div>
      </div>
      <div style={raiseAmountStyle}>Raise amount</div>
      <div></div>
      <div style={progressTextContainerStyle}>
        <div style={progressTextPrefixStyle}>{project.raiseAmountCurrent}</div>
        <div style={progressTextSufixStyle}>/{project.raiseAmountTotal} USDT</div>
      </div>
      <div style={{ margin: '0.38rem 1rem' }}>
        <ProgressBar
          completed={(project.raiseAmountCurrent / project.raiseAmountTotal) * 100}
          isLabelVisible={false}
          height={'0.38rem'}
          bgColor={'#d2307a'}
          baseBgColor={'#7A7A7A'}
          borderRadius={'0rem'}
        />
      </div>
      <div
        style={
          direction === 'left'
            ? cs(
                { margin: '1rem', backgroundColor: 'black', paddingLeft: '1rem' },
                { marginLeft: 0, marginRight: '1rem' },
                bottomRightNotch,
              )
            : cs(
                { margin: '1rem', backgroundColor: 'black', paddingLeft: '1.5rem' },
                { marginLeft: '1rem', marginRight: 0 },
                bottomLeftNotch,
              )
        }>
        <div style={{ display: 'flex' }}>
          <div>
            <div style={detailsTitleStyle}>Per token</div>
            <div style={detailsValueStyle}>{project.perToken.toFixed(2)} USDT</div>
          </div>
          <div>
            <div style={detailsTitleStyle}>{project.status !== 'ended' ? 'Starts' : 'Ended'}</div>
            <div style={detailsValueStyle}>{project.status !== 'ended' ? project.startDate : project.endDate}</div>
          </div>
          <div>
            <div style={detailsTitleStyle}>Access</div>
            <div style={detailsValueStyle}>{project.access}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
