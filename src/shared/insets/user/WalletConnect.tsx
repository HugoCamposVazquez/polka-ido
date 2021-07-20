import { useWeb3React } from '@web3-react/core';
import React from 'react';

import { injected } from '../../../hooks/web3/connectors';
import { onLogin } from '../../../hooks/web3/useEagerConnect';
import { cs } from '../../../utils/css';
import { MainButton } from '../../gui/MainButton';
import { openWalletModal } from '../../modals/modals';
import * as styles from './WalletConnect.styles';

interface WalletConnectProps {
  isMobile?: boolean;
}

export const WalletConnect = ({ isMobile }: WalletConnectProps) => {
  const { account, activate } = useWeb3React();

  const onWalletChange = () => {
    alert('Not sure yet what this should do');
  };

  const onConnect = async () => {
    await activate(injected);
    onLogin();
  };

  console.log('account: ', account);

  return (
    <>
      {!account && (
        <MainButton
          title={'CONNECT WALLET'}
          type={'fill'}
          onClick={onConnect}
          style={isMobile ? {} : { marginLeft: '0.375rem' }}
        />
      )}
      {account && (
        <div
          style={cs(styles.connectWalletContainerStyle, isMobile ? { marginLeft: 0 } : {})}
          onClick={() => {
            openWalletModal(onWalletChange);
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
