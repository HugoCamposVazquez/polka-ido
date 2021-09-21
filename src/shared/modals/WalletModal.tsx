import React from 'react';

import copyAddress from '../../assets/copy_address.svg';
import viewInExplorer from '../../assets/view_in_explorer.svg';
import { styled } from '../../utils/css';
import { notifySuccess } from '../../utils/notifications';
import { Modal } from './Modal';
import * as styles from './WalletModal.styles';

const ETHERSCAN_URL = process.env.REACT_APP_ETHERSCAN_URL;
interface IProps {
  closeModal: () => void;
  changeWallet: any;
  account: string;
}
export const WalletModal = ({ closeModal, changeWallet, account }: IProps) => {
  return (
    <Modal title="ACCOUNT" closeModal={closeModal}>
      <div style={styles.boxStyle}>
        <div style={styles.changeWalletParentStyle}>
          <div style={styles.connectedTextStyle}>Connected with MetaMask</div>
        </div>
        <div style={styles.addressTextStyle}>
          {account.slice(0, 6)}...{account.slice(-4)}
        </div>

        <div style={styles.btnsContainerStyle}>
          <div style={styles.copyAddressParentStyle}>
            <img src={copyAddress} />
            <div
              onClick={() => {
                navigator.clipboard.writeText(account);
                notifySuccess('Copied to Clipboard', 1250);
              }}
              style={styles.copyAddressBtnStyle}>
              Copy Address
            </div>
          </div>
          <a style={styles.link} href={`${ETHERSCAN_URL}/${account}`} target="_blank" rel="noreferrer">
            <div style={styles.viewInExplorerParentStyle}>
              <img src={viewInExplorer} />
              <div style={styles.viewInExplorerBtnStyle}>View in Explorer </div>
            </div>
          </a>
        </div>
      </div>
    </Modal>
  );
};
