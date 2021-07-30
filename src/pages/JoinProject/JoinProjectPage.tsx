import { isWeb3Injected, web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import backToProject from '../../assets/back_to_project.svg';
import { AccountsDropdown } from '../../shared/AccountsDropdown';
import { MainButton } from '../../shared/gui/MainButton';
import { Footer } from '../../shared/insets/user/Footer';
import { JoinProjectForm } from './JoinProjectForm';
import * as styles from './JoinProjectPage.styles';

export const JoinProjectPage = () => {
  const navigation = useHistory();
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [isConnectedWallet, setIsConnectWallet] = useState(false);

  const onPolkadotJsConnect = async () => {
    const extensions = await web3Enable('RYU network');
    if (extensions.length !== 0) {
      const allAccounts = await web3Accounts();
      setAccounts(allAccounts);
      setIsConnectWallet(true);
    }
  };

  return (
    <>
      <div style={styles.titleContainerStyle}>
        <div
          className={styles.backToProjectContainerStyle}
          onClick={() => {
            navigation.push(`/project/1`);
          }}>
          <img src={backToProject} />
          <div style={styles.backToProjectsTextStyle}>Back to project</div>
        </div>
        <div style={styles.projectTitleStyle}>My project 1</div>
      </div>
      <div style={styles.formContainerStyle}>
        <div style={styles.topLeftBottomRightNotch} className={styles.cardStyle}>
          <div style={styles.walletConnectContainer}>
            {!isConnectedWallet && (
              <>
                <div style={styles.subtitleTextStyle}>
                  Please connect your Polkadot.js wallet first. Choose the account that you wish to receive the project
                  tokens.
                </div>
                <MainButton title="CONNECT WALLET" type={'bordered'} onClick={onPolkadotJsConnect} />
              </>
            )}
            {isConnectedWallet && (
              <>
                <div style={styles.subtitleTextStyle}>Connected account (extension):</div>
                <AccountsDropdown options={accounts} initialAccount={accounts[0]} />
              </>
            )}
          </div>

          <JoinProjectForm />
        </div>
      </div>
      <Footer />
    </>
  );
};
