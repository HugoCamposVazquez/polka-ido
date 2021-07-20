import React, { useState } from 'react';

import { sideColor3, sideColor4 } from '../../../utils/colorsUtil';
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
          <div
            style={{
              color: sideColor4,
              padding: '0.4375rem 0.5rem',
              fontWeight: 700,
              fontSize: '0.75rem',
              fontFamily: 'Titillium Web',
            }}>
            0.004233 ETH
          </div>
          <div
            style={{
              backgroundColor: sideColor3,
              margin: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '5.25rem',
            }}>
            <div
              style={{
                padding: '0.1875rem 0.5rem',
                fontFamily: 'Titillium Web',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}>
              0xF2C...x706
            </div>
          </div>
        </div>
      )}
    </>
  );
};
