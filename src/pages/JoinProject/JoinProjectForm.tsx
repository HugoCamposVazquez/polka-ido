import { yupResolver } from '@hookform/resolvers/yup';
import { BigNumber, ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import arrowDown from '../../assets/arrow_down.svg';
import { config } from '../../config';
import { useSingleProject } from '../../hooks/apollo/useSingleProject';
import { useStatemintToken } from '../../hooks/polkadot/useStatemintToken';
import { useSaleContract } from '../../hooks/web3/contract/useSaleContract';
import { useMoonbeanBalance } from '../../hooks/web3/useMoonbeamBalance';
import { MainButton } from '../../shared/gui/MainButton';
import { TextField } from '../../shared/gui/TextField';
import { cs } from '../../utils/css';
import { getTokenPrice } from '../../utils/data';
import { notifyTransactionConfirmation, updateNotifyError, updateNotifySuccess } from '../../utils/notifications';
import { formatWei } from '../../utils/numModifiyngFuncs';
import * as styles from './JoinProjectPage.styles';

export const JoinProjectForm = () => {
  const [isTransactionInProgress, setIsTransactionInProgress] = useState(false);
  const { id: address }: { id: string } = useParams();
  const { data } = useSingleProject(address);
  const { data: tokenData } = useStatemintToken(data?.token.id);

  const { balance } = useMoonbeanBalance();
  const saleContract = useSaleContract(address);
  const maxUserAllocation = BigNumber.from(data?.maxUserDepositAmount || '0');
  const formattedmaxUserAllocation = React.useMemo(() => formatWei(maxUserAllocation), [maxUserAllocation]);

  const validationSchema = yup.object().shape({
    fromValue: yup
      .string()
      .required('Required input')
      .max(Number(formattedmaxUserAllocation))
      .matches(/^[0-9]*[.,]?[0-9]*$/, 'Invalid format'),
  });

  const methods = useForm({
    defaultValues: {
      fromValue: '',
      toValue: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ fromValue }: { fromValue: string }): Promise<void> => {
    try {
      notifyTransactionConfirmation('Confirm Transaction...', 'buyingTokens');
      setIsTransactionInProgress(true);
      await saleContract?.buyTokens({
        value: ethers.utils.parseEther(fromValue),
        gasLimit: 10000000,
      });

      updateNotifySuccess(<div>Success! Thank you for joining</div>, 'buyingTokens', 10000);

      methods.setValue('toValue', '');
      methods.setValue('fromValue', '');
      setIsTransactionInProgress(false);
    } catch (e) {
      console.error(e.message);
      updateNotifyError('Transaction Cancelled', 'buyingTokens');

      methods.setValue('toValue', '');
      methods.setValue('fromValue', '');
      setIsTransactionInProgress(false);
    }
  };

  const onClickSetmaxUserAllocation = () => {
    const maxPossible = balance.gt(maxUserAllocation) ? maxUserAllocation : balance;
    const formattedMaxPossible = formatWei(maxPossible);
    methods.setValue('fromValue', formattedMaxPossible);
    const toValue = calculateToValue(formattedMaxPossible);
    methods.setValue('toValue', toValue);
  };

  const swapValues = methods.watch();

  // Calculates output value (how many token should get)
  const calculateToValue = React.useCallback(
    (value: string): string => {
      try {
        return formatWei(ethers.utils.parseEther(value).mul(getTokenPrice(data?.salePrice || '0')));
      } catch (e) {
        console.error(`Error while calculating output value: ${e.message}`);
      }
      return '0';
    },
    [data],
  );

  const calculateFromValue = React.useCallback(
    (value: string): string => {
      try {
        return formatWei(ethers.utils.parseEther(value).div(getTokenPrice(data?.salePrice || '0')));
      } catch (e) {
        console.error(`Error while calculating output value: ${e.message}`);
      }
      return '0';
    },
    [data],
  );

  const getSubmitButttonText = (): string => {
    if (saleContract && isTransactionInProgress) return 'Waiting for confirmation...';
    if (saleContract) return 'JOIN PROJECT';
    return 'CONNECT WALLET FIRST';
  };

  // Total number of tokens left for sale
  // Note: Not taking into account calculation for user based on user's current deposits
  const remainingTokens = React.useMemo((): string => {
    if (data) {
      const calculatedRemainingTokens = BigNumber.from(data?.cap)
        .sub(BigNumber.from(data?.currentDepositAmount))
        .mul(BigNumber.from(data?.salePrice))
        .div(ethers.utils.parseEther('1'));

      return formatWei(calculatedRemainingTokens);
    }
    return '0';
  }, [data]);

  // Setting opposite output swapping value on change
  useEffect(() => {
    if (data && swapValues.fromValue) {
      // If not infinite loop, set the other value
      const nextSwapValue = calculateToValue(swapValues.fromValue);
      if (swapValues.fromValue && swapValues.toValue !== nextSwapValue) {
        methods.setValue('toValue', nextSwapValue);
      }
    } else if (swapValues.toValue && !swapValues.fromValue) {
      // Reset field when empty
      methods.setValue('toValue', '');
    }
  }, [swapValues.fromValue, data]);

  useEffect(() => {
    if (data && swapValues.toValue) {
      const nextSwapValue = calculateFromValue(swapValues.toValue);
      if (swapValues.toValue && swapValues.fromValue !== nextSwapValue) {
        methods.setValue('fromValue', nextSwapValue);
      }
    } else if (swapValues.fromValue && !swapValues.toValue) {
      methods.setValue('fromValue', '');
    }
  }, [swapValues.toValue, data]);

  return (
    <FormProvider {...methods}>
      <form>
        <div>
          <div style={styles.boxContainerStyle}>
            <div style={{ display: 'flex' }}>
              <div style={cs(styles.subtitleTextStyle, { flex: 1 })}>From</div>
              <div style={styles.subtitleTextStyle}>Balance: {formatWei(balance)}</div>
            </div>
            <div style={styles.fieldContainerStyle}>
              <TextField
                name={'fromValue'}
                styleType={'none'}
                mode={'dark'}
                style={{ fontSize: '1.25rem' }}
                autoFocus={true}
                type="numerical"
              />
              <div style={styles.maxBtnStyle} onClick={onClickSetmaxUserAllocation}>
                Max
              </div>
              <div style={styles.suffixTextStyle}>{config.CURRENCY}</div>
            </div>
          </div>

          {methods.errors.fromValue ? <span>{methods.errors.fromValue.message}</span> : null}

          <div style={styles.arrowContainerStyle}>
            <img src={arrowDown} />
          </div>
          <div style={cs(styles.boxContainerStyle)}>
            <div style={{ display: 'flex' }}>
              <div style={cs(styles.subtitleTextStyle, { flex: 1 })}>To</div>
              <div style={styles.subtitleTextStyle}>
                Remaining:&nbsp;
                {remainingTokens}
              </div>
            </div>
            <div style={styles.fieldContainerStyle}>
              <TextField
                name={'toValue'}
                styleType={'none'}
                type="numerical"
                mode={'dark'}
                style={{ fontSize: '1.25rem' }}
              />
              <div style={styles.suffixTextStyle}>{tokenData ? tokenData.symbol : ''}</div>
            </div>
          </div>

          {methods.errors.toValue ? <span>{methods.errors.toValue.message}</span> : null}

          <div style={styles.maxAllocTextStyle}>
            Max. allocation is {formattedmaxUserAllocation} {config.CURRENCY}
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <MainButton
              title={getSubmitButttonText()}
              onClick={methods.handleSubmit(onSubmit)}
              type={'fill'}
              disabled={!saleContract || isTransactionInProgress}
              style={{ width: '100%' }}></MainButton>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
