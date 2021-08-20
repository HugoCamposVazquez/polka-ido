import { yupResolver } from '@hookform/resolvers/yup';
import { BigNumber, BigNumberish, ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import arrowDown from '../../assets/arrow_down.svg';
import { useSingleProject } from '../../hooks/apollo/useSingleProject';
import { useMoonbeanBalance } from '../../hooks/useMoonbeamBalance';
import { useSaleContract } from '../../hooks/web3/contract/useSaleContract';
import { MainButton } from '../../shared/gui/MainButton';
import { TextField } from '../../shared/gui/TextField';
import { cs } from '../../utils/css';
import { numberWithDots } from '../../utils/numModifiyngFuncs';
import * as styles from './JoinProjectPage.styles';

export const JoinProjectForm = () => {
  const [maxAllocation, setMaxAllocation] = useState('0');

  const { id: address }: { id: string } = useParams();
  const { data } = useSingleProject(address);
  const { balance } = useMoonbeanBalance();
  const saleContract = useSaleContract(address);

  const setTokenValue = (value: string) => {
    return Number(value) * Number(data?.sales[0].salePrice);
  };

  const validationSchema = yup.object().shape({
    fromValue: yup.number().required().max(Number(maxAllocation)),
    toValue: yup.number().required().max(setTokenValue(maxAllocation)),
  });

  const methods = useForm({
    defaultValues: {
      fromValue: '',
      toValue: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ fromValue }: { fromValue: string; toValue: string }): Promise<void> => {
    try {
      saleContract?.buyTokens({ value: BigNumber.from(fromValue), gasLimit: 10000000 });
    } catch (e) {
      console.error(e.message);
    }
  };

  const getBuyTokens = (amountToSet: BigNumberish) => {
    methods.setValue('fromValue', amountToSet);
    methods.setValue('toValue', Number(amountToSet) * Number(data?.sales[0].salePrice));
  };

  const onClickSetMaxAllocation = () => {
    if (balance && maxAllocation && balance < maxAllocation) {
      getBuyTokens(balance);
    } else {
      getBuyTokens(maxAllocation);
    }
  };

  const getRemainingTokens = React.useMemo(() => {
    const calculatedRemainingTokens = (
      (Number(data?.sales[0].maxDepositAmount) - Number(data?.sales[0].currentDepositAmount)) /
      Number(data?.sales[0].salePrice)
    ).toString();
    const remainingTokens = numberWithDots(calculatedRemainingTokens);

    return remainingTokens;
  }, [data?.sales[0]]);

  //Subscribe to input changes
  const swapValues = methods.watch();

  useEffect(() => {
    if (swapValues.fromValue) methods.setValue('toValue', setTokenValue(swapValues.fromValue));
    if (!swapValues.fromValue) {
      methods.setValue('toValue', '');
      methods.setValue('fromValue', '');
    }

    saleContract?.maxDepositAmount().then(ethers.utils.formatEther).then(setMaxAllocation);
  }, [swapValues.fromValue, swapValues.toValue, saleContract]);

  return (
    <FormProvider {...methods}>
      <form>
        <div>
          <div style={styles.boxContainerStyle}>
            <div style={{ display: 'flex' }}>
              <div style={cs(styles.subtitleTextStyle, { flex: 1 })}>From</div>
              <div style={styles.subtitleTextStyle}>Balance: {balance}</div>
            </div>
            <div style={styles.fieldContainerStyle}>
              <TextField
                name={'fromValue'}
                type={'none'}
                placeholder={maxAllocation && maxAllocation}
                mode={'dark'}
                style={{ fontSize: '1.25rem' }}
                autoFocus={true}
              />
              <div style={styles.maxBtnStyle} onClick={onClickSetMaxAllocation}>
                Max
              </div>
              <div style={styles.suffixTextStyle}>ETH</div>
            </div>
          </div>
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
                type={'none'}
                placeholder={data && (Number(maxAllocation) * Number(data?.sales[0].salePrice)).toString()}
                mode={'dark'}
                style={{ fontSize: '1.25rem' }}
              />
              <div style={styles.suffixTextStyle}>TKN</div>
            </div>
          </div>

          <div style={styles.maxAllocTextStyle}>Max. allocation is {maxAllocation} ETH</div>

          <div style={{ marginTop: '1.5rem' }}>
            <MainButton
              title={'JOIN PROJECT'}
              onClick={methods.handleSubmit(onSubmit)}
              type={'fill'}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
