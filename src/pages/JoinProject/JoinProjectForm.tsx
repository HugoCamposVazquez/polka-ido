import { yupResolver } from '@hookform/resolvers/yup';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, ethers } from 'ethers';
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
  // const { maxAllocation } = useJoinProject(address);
  const { data } = useSingleProject(address);
  const { balance } = useMoonbeanBalance();
  const saleContract = useSaleContract(address);

  const validationSchema = yup.object().shape({
    fromValue: yup.number().required().max(Number(maxAllocation)),
    toValue: yup
      .number()
      .required()
      .max(Number(maxAllocation) * Number(data?.sales[0].salePrice)),
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

  const onClickSetMaxAllocation = () => {
    if (balance && maxAllocation && balance < maxAllocation) {
      methods.setValue('fromValue', balance);
      methods.setValue('toValue', Number(balance) * Number(data?.sales[0].salePrice));
    } else {
      methods.setValue('fromValue', maxAllocation);
      methods.setValue('toValue', Number(maxAllocation) * Number(data?.sales[0].salePrice));
    }
  };
  const swapValues = methods.watch();

  useEffect(() => {
    if (swapValues.fromValue)
      methods.setValue('toValue', Number(swapValues.fromValue) * Number(data?.sales[0].salePrice));
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
                Remaining:{' '}
                {numberWithDots(
                  (Number(data?.sales[0].maxDepositAmount) - Number(data?.sales[0].currentDepositAmount)).toString(),
                )}
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
