import React from 'react';

import closeIcon from '../../assets/close_icon.svg';
import copyAddress from '../../assets/copy_address.svg';
import viewInExplorer from '../../assets/view_in_explorer.svg';
import * as styles from './WalletModal.styles';

interface IProps {
  closeModal: any;
  changeWallet: any;
}

export const WalletModal = ({ closeModal, changeWallet }: IProps) => {
  return (
    <div style={styles.modalContainerStyle}>
      <div style={styles.topRightBottomLeftNotch} className={styles.modalStyle}>
        <div style={styles.accountParentStyle}>
          <div style={styles.accountTextStyle}>ACCOUNT</div>
          <div style={styles.closeIconParentStyle}>
            <img src={closeIcon} style={styles.closeIconStyle} onClick={closeModal} />
          </div>
        </div>
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
      </div>
    </div>
  );
};
