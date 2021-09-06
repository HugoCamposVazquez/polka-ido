import React from 'react';

import { useUserAllocations } from '../../hooks/apollo/useUserAllocations';
import * as styles from './ProjectDetailsPage.styles';

interface IProps {
  account: string;
  projectId: string;
}

export const Allocations = ({ account, projectId }: IProps) => {
  const { data } = useUserAllocations(projectId, account);

  return (
    <div className={styles.allocationsContainerClassName}>
      <div className={styles.subtitleStyle}>Allocations</div>
      <div style={{ marginTop: '1.5rem', display: 'flex' }}>
        <div style={{ flex: 0.25 }} className={styles.allocationsTitleStyle}>
          Purchased
        </div>
        <div style={{ flex: 0.25 }} className={styles.allocationsTitleStyle}>
          Amount
        </div>
        <div style={{ flex: 0.25 }} className={styles.allocationsTitleStyle}>
          Dollars
        </div>
        <div style={{ flex: 0.25 }} className={styles.allocationsTitleStyle}>
          Tokens
        </div>
      </div>
      <div style={styles.projectDetailsItemStyle}>
        <div style={{ flex: 0.25 }} className={styles.allocationsItemNormalStyle}>
          6/21/19
        </div>
        <div style={{ flex: 0.25 }} className={styles.allocationsItemNormalStyle}>
          0.28 ETH
        </div>
        <div style={{ flex: 0.25 }} className={styles.allocationsItemNormalStyle}>
          1,239 USDT
        </div>
        <div style={{ flex: 0.25 }} className={styles.allocationsItemNormalStyle}>
          304,985 TKN
        </div>
      </div>
      <div style={styles.projectDetailsItemStyle}>
        <div style={{ flex: 0.25 }} className={styles.allocationsItemNormalStyle}>
          6/21/19
        </div>
        <div style={{ flex: 0.25 }} className={styles.allocationsItemNormalStyle}>
          0.012 ETH
        </div>
        <div style={{ flex: 0.25 }} className={styles.allocationsItemNormalStyle}>
          190 USDT
        </div>
        <div style={{ flex: 0.25 }} className={styles.allocationsItemNormalStyle}>
          23,498 TKN
        </div>
      </div>
      <div style={{ padding: '1.5rem 0', alignItems: 'center', display: 'flex' }}>
        <div style={{ flex: 0.25 }} className={styles.allocationsTotalTextStyle}>
          Total
        </div>
        <div style={{ flex: 0.25 }} className={styles.allocationsItemBoldStyle}>
          0.292 ETH
        </div>
        <div style={{ flex: 0.25 }} className={styles.allocationsItemBoldStyle}>
          1,429 USDT
        </div>
        <div style={{ flex: 0.25 }} className={styles.allocationsItemBoldStyle}>
          328,483 TKN
        </div>
      </div>
    </div>
  );
};

export const TotalAllocation = ({ account, projectId }: IProps) => {
  const { data } = useUserAllocations(projectId, account);

  return (
    <div style={styles.descriptionParentStyle}>
      <div className={styles.description2TextStyle}>Your allocation</div>
      <div className={styles.content2TextStyle}>0 TKN</div>
    </div>
  );
};
