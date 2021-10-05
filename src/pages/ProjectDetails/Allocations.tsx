import { BigNumber } from 'ethers';
import React, { useCallback, useMemo } from 'react';

import { config } from '../../config';
import { useUserAllocations } from '../../hooks/apollo/useUserAllocations';
import { convertDateFromUnixtime } from '../../utils/date';
import { formatWei } from '../../utils/numModifiyngFuncs';
import * as styles from './ProjectDetailsPage.styles';

interface IProps {
  account: string;
  projectId: string;
  tokenPrice: string;
  tokenSymbol?: string;
}

export const Allocations = ({ account, projectId, tokenPrice, tokenSymbol }: IProps) => {
  const { data } = useUserAllocations(projectId, account.toLowerCase());

  const getNumberOfTokens = useCallback(
    (allocation: string) => formatWei(BigNumber.from(allocation).mul(BigNumber.from(tokenPrice))),
    [data],
  );

  return (
    <div className={styles.allocationsContainerClassName}>
      <div className={styles.subtitleStyle}>Allocations</div>
      <div style={{ marginTop: '1.5rem', display: 'flex' }}>
        <div style={{ flex: 0.25 }} className={styles.allocationsTitleStyle}>
          Purchased
        </div>
        <div style={{ flex: 0.35 }} className={styles.allocationsTitleStyle}>
          Amount
        </div>
        <div style={{ flex: 0.35 }} className={styles.allocationsTitleStyle}>
          Tokens
        </div>
      </div>
      {data?.allocations.map((sale) => (
        <div style={styles.projectDetailsItemStyle} key={sale.id}>
          <div style={{ flex: 0.25 }} className={styles.allocationsItemNormalStyle}>
            {convertDateFromUnixtime(parseInt(sale.timestamp))}
          </div>
          <div style={{ flex: 0.35 }} className={styles.allocationsItemNormalStyle}>
            {formatWei(sale.amount)} {config.CURRENCY}
          </div>
          <div style={{ flex: 0.35 }} className={styles.allocationsItemNormalStyle}>
            {getNumberOfTokens(sale.amount)} {tokenSymbol || 'tokens'}
          </div>
        </div>
      ))}

      <div style={{ padding: '1.5rem 0', alignItems: 'center', display: 'flex' }}>
        <div style={{ flex: 0.25 }} className={styles.allocationsTotalTextStyle}>
          Total
        </div>
        <div style={{ flex: 0.35 }} className={styles.allocationsItemBoldStyle}>
          {formatWei(data?.totalAllocation || '0')} {config.CURRENCY}
        </div>
        <div style={{ flex: 0.35 }} className={styles.allocationsItemBoldStyle}>
          {getNumberOfTokens(data?.totalAllocation || '0')} {tokenSymbol || 'tokens'}
        </div>
      </div>
    </div>
  );
};

export const TotalAllocation = ({ account, projectId, tokenPrice, tokenSymbol }: IProps) => {
  const { data } = useUserAllocations(projectId, account.toLowerCase());
  const totalAllocation = useMemo(
    () => formatWei(BigNumber.from(data?.totalAllocation || '0').mul(BigNumber.from(tokenPrice))),
    [data],
  );

  return (
    <div style={styles.descriptionParentStyle}>
      <div className={styles.description2TextStyle}>Your allocation x TKN ( Claimed : 25 )</div>
      <div className={styles.content2TextStyle}>
        {totalAllocation} {tokenSymbol || 'tokens'}
      </div>
    </div>
  );
};
