import { BigNumber } from '@ethersproject/bignumber';
import { SaleContract } from '@nodefactoryio/ryu-contracts/typechain/SaleContract';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useStatemintToken } from '../../hooks/polkadot/useStatemintToken';
import { getStatemintApi } from '../../services/polkadot';
import {
  notifyError,
  notifyTransactionConfirmation,
  updateNotifyError,
  updateNotifySuccess,
} from '../../utils/notifications';
import { formatWei } from '../../utils/numModifiyngFuncs';
import { AccountsDropdown } from '../AccountsDropdown';
import { MainButton } from '../gui/MainButton';
import { TextField } from '../gui/TextField';
import * as styles from './ClaimTokensModal.styles';
import { Modal } from './Modal';
import { modalTextStyle } from './Modal.styles';
interface IProps {
  closeModal: () => void;
  id: string;
  contract: SaleContract;
  userEthAddress: string;
  tokenId?: string;
}

export const ClaimTokensModal = ({ closeModal, contract, userEthAddress, tokenId }: IProps) => {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [isConnectedWallet, setIsConnectWallet] = useState(false);
  const [selectedDotAcc, setSelectedDotAcc] = useState<InjectedAccountWithMeta>();
  const [isTransactionInProggress, setIsTranasctionInProgress] = useState(false);
  const [amountOfClaimableTokens, setAmountOfClaimableTokens] = useState<string>();
  const { data: tokenData } = useStatemintToken(tokenId);

  const isSufficentBalance = async (): Promise<boolean | undefined> => {
    if (selectedDotAcc?.address) {
      const api = await getStatemintApi();
      const balance = await api.query.system.account(selectedDotAcc.address);
      return BigNumber.from(balance.data.free.toString()).lte(api.consts.balances.existentialDeposit.toString());
    }
  };

  useEffect(() => {
    const getClaimableTokens = async () => {
      try {
        if (userEthAddress) {
          const claimableBalance = await contract.getUserClaimableTokens(userEthAddress);
          const formattedClaimableBalance = formatWei(claimableBalance);
          setAmountOfClaimableTokens(formattedClaimableBalance);
        }
      } catch (error) {
        setAmountOfClaimableTokens('0');
      }
    };
    getClaimableTokens();

    if (selectedDotAcc) {
      methods.setValue('address', selectedDotAcc.address);
      isSufficentBalance() && notifyError('Insufficient funds! Minimum wallet balanc is 1 DOT.', 2500);
    }
  }, [accounts, selectedDotAcc, userEthAddress]);

  const methods = useForm({
    defaultValues: {
      address: '',
    },
    //resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async ({ address }: { address: string }) => {
    try {
      notifyTransactionConfirmation('Confirm Transaction...', 'claimingTokens');
      setIsTranasctionInProgress(true);

      await contract.claimVestedTokens(address, { gasLimit: 1000000 });
      setIsTranasctionInProgress(false);
      updateNotifySuccess('Claim Successful', 'claimingTokens', 2000);
      closeModal();
    } catch (e) {
      // show notification or error message
      console.log(e);
      updateNotifyError('Transaction Canceled.', 'claimingTokens');
      setIsTranasctionInProgress(false);
    }
  };

  const onPolkadotJsConnect = async () => {
    const extensions = await web3Enable('RYU network');
    if (extensions.length !== 0) {
      const allAccounts = await web3Accounts();
      setAccounts(allAccounts);
      setSelectedDotAcc(allAccounts[0]);
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

      <div style={styles.tknValueTextStyle}>
        {amountOfClaimableTokens} {tokenData ? tokenData.symbol : ''}
      </div>
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
                disabled={
                  !accounts.length ||
                  amountOfClaimableTokens === '0' ||
                  isTransactionInProggress ||
                  Boolean(isSufficentBalance())
                }
                title={isTransactionInProggress ? 'Waiting for Conformation' : 'Claim'}
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
