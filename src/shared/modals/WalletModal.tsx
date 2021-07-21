import React from 'react';

import copyAddress from '../../assets/copy_address.svg';
import viewInExplorer from '../../assets/view_in_explorer.svg';
import { Modal } from './Modal';
import * as styles from './WalletModal.styles';

interface IProps {
  closeModal: () => void;
  changeWallet: any;
}

export const WalletModal = ({ closeModal, changeWallet }: IProps) => {
  return (
    <Modal title="ACCOUNT" closeModal={closeModal}>
      <div style={styles.boxStyle}>
        <div style={styles.changeWalletParentStyle}>
          <div style={styles.connectedTextStyle}>Connected with MetaMask</div>
          <div
            style={styles.changeWalletBtnStyle}
            onClick={() => {
              closeModal();
              changeWallet();
            }}>
            CHANGE
          </div>
        </div>
        <div style={styles.addressTextStyle}>0xcF2C...c706</div>

        <div style={styles.btnsContainerStyle}>
          <div style={styles.copyAddressParentStyle}>
            <img src={copyAddress} />
            <div style={styles.copyAddressBtnStyle}>Copy Address</div>
          </div>
          <div style={styles.viewInExplorerParentStyle}>
            <img src={viewInExplorer} />
            <div style={styles.viewInExplorerBtnStyle}>View in Explorer</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
