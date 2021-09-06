import { SaleContract } from '@nodefactoryio/ryu-contracts/typechain/SaleContract';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { AccountsDropdown } from '../../shared/AccountsDropdown';
import { MainButton } from '../../shared/gui/MainButton';
import { TextField } from '../gui/TextField';
import * as styles from './ClaimTokensModal.styles';
import { Modal } from './Modal';
import { modalTextStyle } from './Modal.styles';

interface IProps {
  closeModal: () => void;
  id: string;
  contract: SaleContract;
  userEthAddress: string;
}

export const ClaimTokensModal = ({ closeModal, contract, userEthAddress }: IProps) => {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [isConnectedWallet, setIsConnectWallet] = useState(false);
  const [selectedDotAcc, setSelectedDotAcc] = useState<InjectedAccountWithMeta>(accounts[0]);
  const [amountOfClaimableTokens, setAmountOfClaimableTokens] = useState<Number>();

  useEffect(() => {
    const getClaimableTokens = async () => {
      try {
        const claimableBalance = await contract.getUserClaimableTokens(userEthAddress as string);
        setAmountOfClaimableTokens(Number(claimableBalance));
      } catch (error) {
        setAmountOfClaimableTokens(0);
      }
    };
    getClaimableTokens();

    if (accounts.length) methods.setValue('address', accounts[0].address);
    if (selectedDotAcc) methods.setValue('address', selectedDotAcc.address);
  }, [accounts, selectedDotAcc, userEthAddress]);

  const methods = useForm({
    defaultValues: {
      address: '',
    },
    //resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async ({ address }: { address: string }) => {
    try {
      await contract.claimVestedTokens(address, { gasLimit: 1000000 });
      closeModal();
    } catch (e) {
      // show notification or error message
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
            <AccountsDropdown options={accounts} initialAccount={accounts[0]} setSelectedDotAcc={setSelectedDotAcc} />
          </>
        )}
      </div>

      <div style={styles.tknValueTextStyle}>{amountOfClaimableTokens} TKN</div>
      <div style={modalTextStyle}>Enter an address to trigger a claim.</div>
      <FormProvider {...methods}>
        <form>
          <div>
            <div style={styles.addressInputContainerStyle}>
              <div style={styles.recipientTextStyle}>Recipient</div>
              <TextField
                name={'address'}
                styleType={'none'}
                placeholder={'Address'}
                mode={'dark'}
                style={{ fontSize: '1.25rem' }}
              />
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <MainButton
                disabled={!!(!accounts.length || amountOfClaimableTokens === 0)}
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
