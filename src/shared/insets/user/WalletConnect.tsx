import React, { useState } from 'react';

import { cs } from '../../../utils/css';
import { MainButton } from '../../gui/MainButton';
import { openWalletModal } from '../../modals/modals';
import * as styles from './WalletConnect.styles';

interface WalletConnectProps {
  isMobile?: boolean;
}

export const WalletConnect = ({ isMobile }: WalletConnectProps) => {
  const [walletConnected, setWalletConnected] = useState<boolean>(false);

  return (
    <>
      {!walletConnected && (
        <MainButton
          title={'CONNECT WALLET'}
          type={'fill'}
          onClick={() => {
            setWalletConnected(true);
          }}
          style={isMobile ? {} : { marginLeft: '0.375rem' }}
        />
      )}
      {walletConnected && (
        <div
          style={cs(styles.connectWalletContainerStyle, isMobile ? { marginLeft: 0 } : {})}
          onClick={() => {
            openWalletModal(setWalletConnected);
          }}>
          <div style={styles.balanceStyle}>0.004233 ETH</div>
          <div style={styles.addressContainerStyle}>
            <div style={styles.addressStyle}>0xF2C...x706</div>
          </div>
        </div>
      )}
    </>
  );
};
