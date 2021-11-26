import { SaleContract } from '@nodefactoryio/ryu-contracts/typechain/SaleContract';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import React, { Fragment, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useStatemintToken } from '../../hooks/polkadot/useStatemintToken';
import { isAddressBalanceSufficient } from '../../services/isAddressBalanceSufficient';
import { notifyTransactionConfirmation, updateNotifyError, updateNotifySuccess } from '../../utils/notifications';
import { formatTokenAmount } from '../../utils/numModifiyngFuncs';
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
  const { data: tokenData } = useStatemintToken(tokenId);
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [selectedDotAcc, setSelectedDotAcc] = useState<InjectedAccountWithMeta>();
  const [isTransactionInProgress, setIsTransactionInProgress] = useState(false);
  const [amountOfClaimableTokens, setAmountOfClaimableTokens] = useState<string>();
  const [isSufficientPolkadotBalance, setIsSufficientPolkadotBalance] = useState<boolean>();
  const [tokenDataError, setTokenDataError] = useState(false);

  useEffect(() => {
    (async () => {
      if (!tokenData) {
        setTokenDataError(true);
        return;
      } else setTokenDataError(false);
      try {
        const claimableBalance = await contract.getUserClaimableTokens(userEthAddress);
        const formattedClaimableBalance = formatTokenAmount(claimableBalance, tokenData.decimals);
        setAmountOfClaimableTokens(formattedClaimableBalance);
      } catch (error) {
        setAmountOfClaimableTokens('0');
      }
    })();

    if (selectedDotAcc) {
      methods.setValue('address', selectedDotAcc.address);
    }
  }, [accounts, selectedDotAcc, userEthAddress, isSufficientPolkadotBalance, tokenData]);

  const methods = useForm({
    defaultValues: {
      address: '',
    },
    //resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async ({ address }: { address: string }) => {
    try {
      notifyTransactionConfirmation('Confirm Transaction...', 'claimingTokens');
      setIsTransactionInProgress(true);

      await contract.claimVestedTokens(address, { gasLimit: 1000000 });
      setIsTransactionInProgress(false);
      updateNotifySuccess('Claim Successful', 'claimingTokens', 2000);
      closeModal();
    } catch (e) {
      // show notification or error message
      console.log(e);
      updateNotifyError('Transaction Canceled.', 'claimingTokens');
      setIsTransactionInProgress(false);
    }
  };

  const onAccountChange = async (account: InjectedAccountWithMeta): Promise<void> => {
    setSelectedDotAcc(account);
    setIsSufficientPolkadotBalance(await isAddressBalanceSufficient(account.address));
  };

  useEffect(() => {
    const getAccounts = async () => {
      const extensions = await web3Enable('RYU network');
      if (extensions.length !== 0) {
        const allAccounts = await web3Accounts();
        setAccounts(allAccounts);
      }
    };
    getAccounts();
  }, []);

  if (!selectedDotAcc) {
    return (
      <Modal title="CLAIM TOKENS" closeModal={closeModal}>
        <div style={styles.walletConnectContainer}>
          <div style={styles.subtitleTextStyle}>
            Please select your Polkadot.js wallet first. Choose the account that you wish to receive the project tokens.
          </div>
          <AccountsDropdown options={accounts} initialAccount={undefined} onAccountChange={onAccountChange} />
        </div>
      </Modal>
    );
  }

  return (
    <Modal title="CLAIM TOKENS" closeModal={closeModal}>
      <div style={styles.walletConnectContainer}>
        <div style={styles.subtitleTextStyle}>Connected account (extension):</div>
        <AccountsDropdown options={accounts} initialAccount={selectedDotAcc} onAccountChange={onAccountChange} />
      </div>

      <div style={styles.tknValueTextStyle}>
        {amountOfClaimableTokens} {tokenData ? tokenData.symbol : ''}
      </div>

      {!isSufficientPolkadotBalance ? (
        <div style={modalTextStyle}>
          <b>
            Sorry, can't claim any tokens as your account doesn't have the existential deposit required on the network.
          </b>
        </div>
      ) : (
        <>
          <div style={modalTextStyle}>
            Enter an address to claim the tokens.
            {tokenDataError && (
              <Fragment>
                <br />
                <b>Error fetching token data.</b>
              </Fragment>
            )}
          </div>
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
                      isTransactionInProgress ||
                      !isSufficientPolkadotBalance
                    }
                    title={isTransactionInProgress ? 'Waiting for Conformation' : 'Claim'}
                    onClick={methods.handleSubmit(onSubmit)}
                    type={'fill'}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </form>
          </FormProvider>
        </>
      )}
    </Modal>
  );
};
