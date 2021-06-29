import React from 'react';

import closeIcon from '../../assets/close_icon.svg';
import copyAddress from '../../assets/copy_address.svg';
import viewInExplorer from '../../assets/view_in_explorer.svg';
import { sideColor, sideColor3, sideColor5, sideColor8 } from '../../utils/colorsUtil';
import { styled } from '../../utils/css';

interface IProps {
  closeModal: any;
  changeWallet: any;
}

export const modalContainerStyle = styled.cssStyle`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(1, 1, 1, 0.75);
`;

export const modalStyle = styled.cssClassName`
  padding: 24px;
  background-color: ${sideColor8};
  margin: 0px;
  width: 65%;
  max-width: 550px;

  @media (max-width: 51.875rem) {
    margin: 0px 24px;
    width: 100%;
  }
`;

export const topRightBottomLeftNotch = styled.cssStyle`
  --notchSize: 1.63rem;

  clip-path: polygon(
    0% 0%,
    var(--notchSize) 0%,
    calc(100% - var(--notchSize)) 0%,
    100% var(--notchSize),
    100% calc(100%),
    calc(100% - var(--notchSize)) 100%,
    var(--notchSize) 100%,
    0% calc(100% - var(--notchSize))
  );
`;

export const accountTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 24px;
  line-height: 36.5px;
  flex: 1;
  color: ${sideColor5};
`;
export const tknValueTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 20px;
  line-height: 30.42px;
  color: ${sideColor3};
  margin-top: 8px;
`;
export const enterAddressTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 16px;
  line-height: 24.34px;
  color: ${sideColor};
  margin-top: 18px;
`;

export const WalletModal = ({ closeModal, changeWallet }: IProps) => {
  return (
    <div style={modalContainerStyle}>
      <div style={topRightBottomLeftNotch} className={modalStyle}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={accountTextStyle}>ACCOUNT</div>
          <div style={{ height: '16px', width: '16px', display: 'flex' }}>
            <img src={closeIcon} style={{ height: '100%', width: '100%', cursor: 'pointer' }} onClick={closeModal} />
          </div>
        </div>
        <div style={{ border: '1px solid #ccc', marginTop: '10px' }}>
          <div style={{ display: 'flex', margin: '24px 24px 0', alignItems: 'center' }}>
            <div style={{ flex: 1, fontFamily: 'Titillium Web', fontWeight: 400, fontSize: '16px' }}>
              Connected with MetaMask
            </div>
            <div
              style={{
                border: `1px solid ${sideColor3}`,
                color: `${sideColor3}`,
                padding: '8px 24px',
                fontFamily: 'Titillium Web',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
              }}
              onClick={() => {
                closeModal();
                changeWallet();
              }}>
              CHANGE
            </div>
          </div>
          <div
            style={{
              margin: '0 24px',

              marginTop: '12px',
            }}>
            0xcF2C...c706
          </div>

          <div style={{ display: 'flex', margin: '24px 24px 30px 24px' }}>
            <div style={{ display: 'flex', cursor: 'pointer' }}>
              <img src={copyAddress} />
              <div style={{ marginLeft: '13px', fontFamily: 'Titillium Web', fontWeight: 400, fontSize: '16px' }}>
                Copy Address
              </div>
            </div>
            <div style={{ display: 'flex', marginLeft: '26px', cursor: 'pointer' }}>
              <img src={viewInExplorer} />
              <div style={{ marginLeft: '13px', fontFamily: 'Titillium Web', fontWeight: 400, fontSize: '16px' }}>
                View in Explorer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
