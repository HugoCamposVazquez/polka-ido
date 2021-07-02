import ProgressBar from '@ramonak/react-progress-bar/dist';
import React from 'react';
import { useHistory } from 'react-router-dom';

import ryuLogoAnimation from '../assets/ryu_logo_animation.gif';
import { ProjectType } from '../types/ProjectType';
import { sideColor3, sideColor4, sideColor6 } from '../utils/colorsUtil';
import { cs } from '../utils/css';
import * as styles from './ProjectCard.styles';

type IProps = {
  direction: 'left' | 'right';
  project?: ProjectType;
};

export const ProjectCard = ({ direction, project }: IProps) => {
  const navigation = useHistory();

  return (
    <div
      style={cs(
        styles.projectCardContainer,
        direction === 'left' ? styles.topLeftBottomRightNotch : styles.topRightBottomLeftNotch,
      )}
      onClick={() => {
        project && navigation.push(`/project/${project.id}`);
      }}>
      {project && (
        <div>
          <div style={styles.projectCardHeaderContainer}>
            <div style={{ flex: 1 }}>
              <div style={styles.projectCardHeaderIconContainer}>
                <img style={styles.projectCardHeaderIconStyle} src={project.iconUrl} />
              </div>
            </div>
            <div style={styles.projectCardStatusTextStyle}>{project.status}</div>
          </div>
          <div style={styles.projectNameContainerStyle}>
            <div style={styles.projectNameStyle}>{project.title}</div>
          </div>

          <div className={styles.projectDescriptionContainerStyle}>
            <div style={styles.projectDescriptionStyle}>{project.description}</div>
          </div>
          <div style={styles.raiseAmountStyle}>Raise amount</div>

          <div style={styles.progressTextContainerStyle}>
            <div style={styles.progressTextPrefixStyle}>{project.raiseAmountCurrent}</div>
            <div style={styles.progressTextSufixStyle}>/{project.raiseAmountTotal} USDT</div>
          </div>
          <div style={{ margin: '0.38rem 1rem' }}>
            <ProgressBar
              completed={project.raiseAmountCurrent ? (project.raiseAmountCurrent / project.raiseAmountTotal) * 100 : 0}
              isLabelVisible={false}
              height={'0.38rem'}
              bgColor={sideColor3}
              baseBgColor={sideColor6}
              borderRadius={'0rem'}
            />
          </div>
          <div
            style={
              direction === 'left'
                ? cs(
                    { margin: '1rem', backgroundColor: `${sideColor4}`, paddingLeft: '1rem' },
                    { marginLeft: 0, marginRight: '1rem' },
                    styles.bottomRightNotch,
                  )
                : cs(
                    { margin: '1rem', backgroundColor: `${sideColor4}`, paddingLeft: '1.5rem' },
                    { marginLeft: '1rem', marginRight: 0 },
                    styles.bottomLeftNotch,
                  )
            }>
            <div style={{ display: 'flex' }}>
              <div>
                <div style={styles.detailsTitleStyle}>Per token</div>
                <div style={styles.detailsValueStyle}>{project.tokenPrice.toFixed(2)} USDT</div>
              </div>
              <div>
                <div style={styles.detailsTitleStyle}>{project.status !== 'ended' ? 'Starts' : 'Ended'}</div>
                <div style={styles.detailsValueStyle}>{project.status !== 'ended' ? project.starts : project.ends}</div>
              </div>
              <div>
                <div style={styles.detailsTitleStyle}>Access</div>
                <div style={styles.detailsValueStyle}>{project.access}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!project && (
        <div style={{ height: '26.091875rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ margin: '7.75rem 3.4375rem' }}>
            <img style={{ width: '100%', height: '100%' }} src={ryuLogoAnimation} />
          </div>
        </div>
      )}
    </div>
  );
};
