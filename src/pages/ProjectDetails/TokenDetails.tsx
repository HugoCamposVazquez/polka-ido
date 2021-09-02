import React from 'react';

import { useStatemintToken } from '../../hooks/polkadot/useStatemintToken';
import { sideColor8 } from '../../utils/colorsUtil';
import { cs } from '../../utils/css';
import * as styles from './ProjectDetailsPage.styles';

interface IProps {
  assetId: string;
}

export const TokenDetails = ({ assetId }: IProps) => {
  const { data } = useStatemintToken(assetId);

  return (
    <div
      style={cs({ flex: 0.5, margin: '0 1.5rem', backgroundColor: `${sideColor8}` }, styles.topLeftBottomRightNotch)}
      className={styles.projectDetailsTokenClassName}>
      <div style={{ padding: '1.5rem' }}>
        <div style={styles.projectDetailsSubtitleStyle}>TOKEN</div>
        <div style={{ marginTop: '2.25rem' }}>
          <div style={styles.projectDetailsItemStyle}>
            <div className={styles.descriptionTextStyle}>Name</div>
            <div className={styles.content3TextStyle}>{data?.name}</div>
          </div>
          <div style={styles.projectDetailsItemStyle}>
            <div className={styles.descriptionTextStyle}>Symbol</div>
            <div className={styles.content3TextStyle}>{data?.symbol}</div>
          </div>
          <div style={styles.projectDetailsItemStyle}>
            <div className={styles.descriptionTextStyle}>Statemint ID</div>
            <div className={styles.content3TextStyle}>{assetId}</div>
          </div>
          <div style={{ display: 'flex', padding: '0.75rem 0' }}>
            <div className={styles.descriptionTextStyle}>Total supply</div>
            <div className={styles.content3TextStyle}>10,000,000</div>
          </div>
        </div>
      </div>
    </div>
  );
};
