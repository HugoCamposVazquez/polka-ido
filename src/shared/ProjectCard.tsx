import ProgressBar from '@ramonak/react-progress-bar/dist';
import { format, fromUnixTime, getUnixTime } from 'date-fns';
import React from 'react';
import { useHistory } from 'react-router-dom';

import ryuLogoAnimation from '../assets/ryu_logo_animation.gif';
import { ProjectData } from '../types/ProjectType';
import { sideColor3, sideColor4, sideColor6 } from '../utils/colorsUtil';
import { cs } from '../utils/css';
import { fixNums } from '../utils/getFixedNum';
import * as styles from './ProjectCard.styles';

type IProps = {
  direction: 'left' | 'right';
  project?: ProjectData;
};

export const ProjectCard = ({ direction, project }: IProps) => {
  const navigation = useHistory();
  const projectStartDate = project && format(fromUnixTime(+project.startDate), 'dd/MM/yy');
  const projectEndDate = project && format(fromUnixTime(+project.endDate), 'dd/MM/yy');

  const getProjectStatus = (upperLeftCorner?: boolean): string => {
    if (project && getUnixTime(new Date()) < +project.startDate) {
      if (upperLeftCorner) return 'Upcoming';

      return 'Starts';
    } else if (project && getUnixTime(new Date()) > +project.startDate && getUnixTime(new Date()) < +project.endDate) {
      if (upperLeftCorner) return 'in progress';

      return 'Ends';
    } else return 'Ended';
  };

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
                <img style={styles.projectCardHeaderIconStyle} src="" />
                {/* currently we dont't have data, but we will */}
              </div>
            </div>
            <div style={styles.projectCardStatusTextStyle}>{getProjectStatus(true)}</div>
          </div>
          <div style={styles.projectNameContainerStyle}>
            <div style={styles.projectNameStyle}>Data Goes Here</div>
            {/* currently we dont't have data, but we will */}
          </div>

          <div className={styles.projectDescriptionContainerStyle}>
            <div style={styles.projectDescriptionStyle}>Data Goes Here</div>
            {/* currently we dont't have data, but we will */}
          </div>
          <div style={styles.raiseAmountStyle}>Raise amount</div>

          <div style={styles.progressTextContainerStyle}>
            <div style={styles.progressTextPrefixStyle}>{project.currentDepositAmount}</div>
            <div style={styles.progressTextSufixStyle}>/{project.maxDepositAmount} USDT</div>
          </div>
          <div style={{ margin: '0.38rem 1rem' }}>
            <ProgressBar
              completed={
                project.currentDepositAmount ? (+project.currentDepositAmount / +project.maxDepositAmount) * 100 : 0
              }
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
                <div style={styles.detailsValueStyle}>{fixNums(+project.salePrice, 2)} USDT</div>
              </div>
              <div>
                <div style={styles.detailsTitleStyle}>{getProjectStatus()}</div>
                <div style={styles.detailsValueStyle}>
                  {getUnixTime(new Date()) < +project.startDate ? projectStartDate : projectEndDate}
                </div>
              </div>
              <div>
                <div style={styles.detailsTitleStyle}>Access</div>
                <div style={styles.detailsValueStyle}>{project.whitelisted ? 'whitelist' : 'private'}</div>
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
