import ProgressBar from '@ramonak/react-progress-bar/dist';
import { format, fromUnixTime, getUnixTime } from 'date-fns';
import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { config } from '../config';
import { useReadIPFS } from '../hooks/ipfs/useReadIPFS';
import { useStatemintToken } from '../hooks/polkadot/useStatemintToken';
import { ProjectMetadata, SalesDto } from '../types/ProjectType';
import { sideColor3, sideColor6 } from '../utils/colorsUtil';
import { cs } from '../utils/css';
import { getIPFSResolvedLink, getPercentage, getTokenPrice } from '../utils/data';
import { formatWei } from '../utils/numModifiyngFuncs';
import * as styles from './ProjectCard.styles';

type IProps = {
  direction: 'left' | 'right';
  project: SalesDto;
};

export const ProjectCard = ({ direction, project }: IProps) => {
  const navigation = useHistory();
  const projectStartDate = format(fromUnixTime(+project.startDate), 'dd/MM/yy');
  const projectEndDate = format(fromUnixTime(+project.endDate), 'dd/MM/yy');
  const { data: metadata } = useReadIPFS<ProjectMetadata>(project.metadataURI);
  const { data: tokenData } = useStatemintToken(project.token.id);

  const getProjectStatus = useCallback(
    (upperLeftCorner?: boolean): string => {
      if (project && getUnixTime(new Date()) < +project.startDate) {
        if (upperLeftCorner) return 'Upcoming';

        return 'Starts';
      } else if (
        project &&
        getUnixTime(new Date()) > +project.startDate &&
        getUnixTime(new Date()) < +project.endDate
      ) {
        if (upperLeftCorner) return 'in progress';

        return 'Ends';
      } else return 'Ended';
    },
    [project],
  );

  const filledAllocationPercentage = useMemo((): string => {
    const { currentDepositAmount, totalDepositAmount } = project;
    return getPercentage(currentDepositAmount, totalDepositAmount);
  }, [project]);

  const tokenPrice = useMemo((): string => {
    return getTokenPrice(project.salePrice);
  }, [project]);

  return (
    <div
      style={cs(
        styles.projectCardContainer,
        direction === 'left' ? styles.topLeftBottomRightNotch : styles.topRightBottomLeftNotch,
      )}
      onClick={() => {
        project && navigation.push(`/project/${project.id}`);
      }}>
      <div>
        <div style={styles.projectCardHeaderContainer}>
          <div style={{ flex: 1 }}>
            <div style={styles.projectCardHeaderIconContainer}>
              <img
                style={styles.projectCardHeaderIconStyle}
                src={metadata ? getIPFSResolvedLink(metadata?.imageUrl) : ''}
              />
            </div>
          </div>
          <div style={styles.projectCardStatusTextStyle}>{getProjectStatus(true)}</div>
        </div>
        <div style={{ height: '7.2rem' }}>
          <div style={styles.projectNameContainerStyle}>
            <div style={styles.projectNameStyle}>{metadata?.title}</div>
          </div>
          <div className={styles.projectDescriptionContainerStyle}>
            <div style={styles.projectDescriptionStyle}>{metadata?.shortDescription}</div>
          </div>
        </div>
        <div style={styles.raiseAmountStyle}>Raise amount</div>

        <div style={styles.progressTextContainerStyle}>
          <div style={styles.progressTextPrefixStyle}>{formatWei(project.currentDepositAmount)}</div>
          <div style={styles.progressTextSufixStyle}>
            /{formatWei(project.totalDepositAmount)} {config.CURRENCY}
          </div>
        </div>
        <div style={{ margin: '0.38rem 1rem' }}>
          <ProgressBar
            completed={filledAllocationPercentage}
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
              ? cs(styles.statsNotchStyle, styles.statsNotchLeftStyle, styles.bottomRightNotch)
              : cs(styles.statsNotchStyle, styles.statsNotchRightStyle, styles.bottomLeftNotch)
          }>
          <div style={styles.statsContainerStyle}>
            <div>
              <div style={styles.detailsTitleStyle}>Per 1 {config.CURRENCY}</div>
              <div style={styles.detailsValueStyle}>
                {tokenPrice} {tokenData?.symbol || 'tokens'}
              </div>
            </div>
            <div>
              <div style={styles.detailsTitleStyle}>{getProjectStatus()}</div>
              <div style={styles.detailsValueStyle}>
                {getUnixTime(new Date()) < +project.startDate ? projectStartDate : projectEndDate}
              </div>
            </div>
            <div>
              <div style={styles.detailsTitleStyle}>Access</div>
              <div style={styles.detailsValueStyle}>{project.whitelisted ? 'whitelist' : 'public'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
