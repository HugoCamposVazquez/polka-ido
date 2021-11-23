import { useWeb3React } from '@web3-react/core';
import React from 'react';

import { switchToNetwork } from '../../services/network';
import { MainButton } from '../gui/MainButton';
import { Modal } from './Modal';
import { modalTextStyle } from './Modal.styles';

interface IProps {
  closeModal: (declined: boolean) => void;
}

export const UnsupportedNetwork = ({ closeModal }: IProps) => {
  const { library } = useWeb3React();

  const onSwitchNetwork = async () => {
    // @ts-ignore
    await switchToNetwork(library || window.ethereum);
    closeModal(false);
  };

  const handleClose = () => {
    closeModal(true);
  };

  return (
    <Modal title="Unsupported network" closeModal={handleClose}>
      <div style={modalTextStyle}>
        It seems like your wallet is currently connected to an unsupported network. Do you want to switch it to{' '}
        <b>Moonbase Alpha</b>?
      </div>
      <MainButton
        title="SWITCH NETWORK"
        type={'fill'}
        onClick={onSwitchNetwork}
        style={{ marginTop: '1rem', width: '100%' }}
      />
    </Modal>
  );
};
