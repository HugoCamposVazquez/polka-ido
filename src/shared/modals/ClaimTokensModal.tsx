import SaleContract from '@nodefactoryio/ryu-contracts/artifacts/contracts/SaleContract.sol/SaleContract.json';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useContract } from '../../hooks/web3/contract/useContract';
import { useSaleContract } from '../../hooks/web3/contract/useSaleContract';
import { AccountsDropdown } from '../../shared/AccountsDropdown';
import { MainButton } from '../../shared/gui/MainButton';
import { TextField } from '../gui/TextField';
import * as styles from './ClaimTokensModal.styles';
import { Modal } from './Modal';
import { modalTextStyle } from './Modal.styles';

interface IProps {
  closeModal: () => void;
  message: string;
  id: string;
}

export const ClaimTokensModal = ({ closeModal, id }: IProps) => {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [isConnectedWallet, setIsConnectWallet] = useState(false);
  const [selectedAccountIndex, setSelectedAccountIndex] = useState<number>(0);

  useEffect(() => {
    if (accounts.length) {
      methods.control.setValue('address', accounts[selectedAccountIndex].address);
    }
  }, [accounts, selectedAccountIndex]);

  const methods = useForm({
    defaultValues: {
      address: '',
    },
    //resolver: yupResolver(loginValidationSchema),
  });
  const contract = useSaleContract(id);

  const onSubmit = async ({ address }: any) => {
    try {
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  const onPolkadotJsConnect = async () => {
    const extensions = await web3Enable('RYU network');
    if (extensions.length !== 0) {
      const allAccounts = await web3Accounts();
      setAccounts(allAccounts);
      setIsConnectWallet(true);
    }
  };

  return (
    <Modal title="CLAIM TOKEN" closeModal={closeModal}>
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
            <AccountsDropdown
              options={accounts}
              initialAccount={accounts[0]}
              setSelectedAccountIndex={setSelectedAccountIndex}
            />
          </>
        )}
      </div>

      <div style={styles.tknValueTextStyle}>349857 TKN</div>
      <div style={modalTextStyle}>Enter an address to trigger a claim.</div>
      <FormProvider {...methods}>
        <form>
          <div>
            <div style={styles.addressInputContainerStyle}>
              <div style={styles.recipientTextStyle}>Recipient</div>
              <TextField
                name={'address'}
                type={'none'}
                placeholder={'Address'}
                mode={'dark'}
                style={{ fontSize: '1.25rem' }}
              />
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <MainButton
                title={'Claim'}
                onClick={methods.handleSubmit(onSubmit)}
                type={'fill'}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};
