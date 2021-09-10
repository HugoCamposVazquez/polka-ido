import { yupResolver } from '@hookform/resolvers/yup';
import { BigNumber, ethers } from 'ethers';
import React, { useEffect } from 'react';
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
import { formatWei, numberWithDots } from '../../utils/numModifiyngFuncs';
import * as styles from './JoinProjectPage.styles';

export const JoinProjectForm = () => {
  const { id: address }: { id: string } = useParams();
  const { data } = useSingleProject(address);
  const { data: tokenData } = useStatemintToken(address);

  const { balance } = useMoonbeanBalance();
  const saleContract = useSaleContract(address);
  const maxAllocation = BigNumber.from(data?.sales[0].maxUserDepositAmount || '0');
  const formattedMaxAllocation = React.useMemo(() => formatWei(maxAllocation), [maxAllocation]);

  const validationSchema = yup.object().shape({
    fromValue: yup
      .string()
      .required('Required input')
      .max(Number(formattedMaxAllocation))
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
      await saleContract?.buyTokens({
        value: ethers.utils.parseEther(fromValue),
      });
      methods.setValue('toValue', '');
      methods.setValue('fromValue', '');
    } catch (e) {
      console.error(e.message);
    }
  };

  const onClickSetMaxAllocation = () => {
    const maxPossible = balance.gt(maxAllocation) ? maxAllocation : balance;
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
        return formatWei(ethers.utils.parseEther(value).mul(getTokenPrice(data?.sales[0].salePrice || '0')));
      } catch (e) {
        console.error(`Error while calculating output value: ${e.message}`);
      }
      return '0';
    },
    [data?.sales[0]],
  );

  const calculateFromValue = React.useCallback(
    (value: string): string => {
      try {
        return formatWei(ethers.utils.parseEther(value).div(getTokenPrice(data?.sales[0].salePrice || '0')));
      } catch (e) {
        console.error(`Error while calculating output value: ${e.message}`);
      }
      return '0';
    },
    [data?.sales[0]],
  );

  const getRemainingTokens = React.useMemo(() => {
    const calculatedRemainingTokens =
      maxAllocation &&
      data &&
      maxAllocation
        .sub(ethers.utils.parseEther(data?.sales[0].currentDepositAmount))
        .div(ethers.utils.parseEther(data?.sales[0].salePrice))
        .toString();
    const remainingTokens = calculatedRemainingTokens && numberWithDots(calculatedRemainingTokens);

    return remainingTokens;
  }, [data?.sales[0]]);

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
              <div style={styles.maxBtnStyle} onClick={onClickSetMaxAllocation}>
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
                {data && getRemainingTokens}
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
            Max. allocation is {formattedMaxAllocation} {config.CURRENCY}
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <MainButton
              title={saleContract ? 'JOIN PROJECT' : 'CONNECT WALLET FIRST'}
              onClick={methods.handleSubmit(onSubmit)}
              type={'fill'}
              disabled={!saleContract}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
