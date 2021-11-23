import { yupResolver } from '@hookform/resolvers/yup';
import { BigNumber, ethers } from 'ethers';
import React, { useEffect, useRef, useState } from 'react';
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
import { notifyTransactionConfirmation, updateNotifyError, updateNotifySuccess } from '../../utils/notifications';
import { formatWei, removeExcessDecimal } from '../../utils/numModifiyngFuncs';
import * as styles from './JoinProjectPage.styles';

enum ActiveInput {
  None,
  From,
  To,
}

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
      .typeError('Required input')
      .required('Required input')
      .test('maxValue', `Maximum allocation is ${formattedmaxUserAllocation} MOVR`, (value) =>
        ethers.utils.parseEther(formattedmaxUserAllocation).gte(ethers.utils.parseEther(value || '0')),
      ),
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

      const dotIndex = fromValue.indexOf('.');
      const fixedValue = fromValue.substring(0, dotIndex === -1 ? undefined : dotIndex + 19);

      const tx = await saleContract?.buyTokens({
        value: ethers.utils.parseEther(fixedValue),
        gasLimit: 10000000,
      });
      if (tx) {
        const contractReceipt = await tx.wait(1);
        if (contractReceipt) {
          updateNotifySuccess(<div>Success! Thank you for joining</div>, 'buyingTokens', 10000);
          methods.setValue('toValue', '');
          methods.setValue('fromValue', '');
          setIsTransactionInProgress(false);
        }
      }
    } catch (e: any) {
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
  };

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

  const fromInputValue = methods.watch('fromValue', '0');
  const toInputValue = methods.watch('toValue', '0');

  const selectedInput = useRef(ActiveInput.None);
  const isSelectedInput = (type: ActiveInput): boolean =>
    selectedInput.current === ActiveInput.None || selectedInput.current === type;

  useEffect(() => {
    if (isSelectedInput(ActiveInput.From)) {
      selectedInput.current = ActiveInput.From;
      if (!data?.token.decimals) return;
      try {
        const wei = ethers.utils.parseEther(fromInputValue);
        const token = wei.mul(BigNumber.from(data?.salePrice)).div(ethers.utils.parseEther('1'));
        methods.setValue('toValue', removeExcessDecimal(formatWei(token), data.token.decimals));
      } catch (e: any) {
        methods.setValue('toValue', '');
        console.error(`Error while calculating output value: ${e.message}`);
      }
    } else {
      selectedInput.current = ActiveInput.None;
    }
  }, [fromInputValue]);

  useEffect(() => {
    if (isSelectedInput(ActiveInput.To)) {
      selectedInput.current = ActiveInput.To;
      if (!data?.token.decimals) return;
      try {
        const wei = ethers.utils.parseEther(removeExcessDecimal(toInputValue, data.token.decimals));
        const token = wei.mul(ethers.utils.parseEther('1')).div(BigNumber.from(data?.salePrice));
        console.warn(formatWei(token), formatWei(wei));
        methods.setValue('fromValue', formatWei(token));
      } catch (e: any) {
        methods.setValue('fromValue', '');
        console.error(`Error while calculating output value: ${e.message}`);
      }
    } else {
      selectedInput.current = ActiveInput.None;
    }
  }, [toInputValue]);

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
                name="fromValue"
                styleType="none"
                mode="dark"
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
              <TextField name="toValue" styleType="none" type="numerical" mode="dark" style={{ fontSize: '1.25rem' }} />
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
              type="fill"
              disabled={!saleContract || isTransactionInProgress}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
