import { yupResolver } from '@hookform/resolvers/yup';
import SaleContract from '@nodefactoryio/ryu-contracts/artifacts/contracts/SaleContract.sol/SaleContract.json';
import { SaleContract as SaleContractTypes } from '@nodefactoryio/ryu-contracts/typechain/SaleContract';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, ethers } from 'ethers';
import { __Field } from 'graphql';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { isMethodSignature } from 'typescript';
import * as yup from 'yup';

import arrowDown from '../assets/arrow_down.svg';
import backToProject from '../assets/back_to_project.svg';
import { useSingleProject } from '../hooks/apollo/useSingleProject';
import { useJoinProject } from '../hooks/useJoinProject';
import { MainButton } from '../shared/gui/MainButton';
import { TextField } from '../shared/gui/TextField';
import { Footer } from '../shared/insets/user/Footer';
import { cs } from '../utils/css';
import { numberWithDots } from '../utils/numModifiyngFuncs';
import * as styles from './JoinProjectPage.styles';

export const JoinProjectPage = () => {
  const { id }: { id: string } = useParams();
  const { balance, maxAllocation } = useJoinProject(id);
  const { data } = useSingleProject(id);
  const validationSchema = yup.object().shape({
    fromValue: yup.number().required().max(Number(maxAllocation)),
    toValue: yup
      .number()
      .required()
      .max(Number(maxAllocation) * Number(data?.sales[0].salePrice)),
  });

  const navigation = useHistory();
  const methods = useForm({
    defaultValues: {
      fromValue: '',
      toValue: '',
    },
    resolver: yupResolver(validationSchema),
  });
  const { library } = useWeb3React();

  const onSubmit = ({ fromValue, toValue }: { fromValue: string; toValue: string }): void => {
    try {
      const signer = library.getSigner();
      const contract = new ethers.Contract(id, SaleContract.abi, signer);
      contract.buyTokens({ value: BigNumber.from(fromValue), gasLimit: 5000000 });
    } catch (e) {
      console.error(e.message);
    }
  };

  const onClickSetMaxValues = () => {
    if (balance < maxAllocation) {
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
  }, [swapValues.fromValue, swapValues.toValue]);

  return (
    <div>
      <div style={styles.titleContainerStyle}>
        <div
          className={styles.backToProjectContainerStyle}
          onClick={() => {
            navigation.push(`/project/${id}`);
          }}>
          <img src={backToProject} />
          <div style={styles.backToProjectsTextStyle}>Back to project</div>
        </div>
        <div style={styles.projectTitleStyle}>My project 1</div>
      </div>
      <div style={styles.formContainerStyle}>
        <div style={styles.topLeftBottomRightNotch} className={styles.cardStyle}>
          <FormProvider {...methods}>
            <form>
              <div>
                <div style={styles.boxContainerStyle}>
                  <div style={{ display: 'flex' }}>
                    <div style={cs(styles.subtitleTextStyle, { flex: 1 })}>From</div>
                    <div style={styles.subtitleTextStyle}>Balance: {balance} ETH</div>
                  </div>
                  <div style={styles.fieldContainerStyle}>
                    <TextField
                      name={'fromValue'}
                      type={'none'}
                      placeholder={maxAllocation}
                      mode={'dark'}
                      style={{ fontSize: '1.25rem' }}
                      autoFocus={true}
                    />
                    <div style={styles.maxBtnStyle} onClick={onClickSetMaxValues}>
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
                        (
                          Number(data?.sales[0].maxDepositAmount) - Number(data?.sales[0].currentDepositAmount)
                        ).toString(),
                      )}
                    </div>
                  </div>
                  <div style={styles.fieldContainerStyle}>
                    <TextField
                      name={'toValue'}
                      type={'none'}
                      placeholder={(Number(maxAllocation) * Number(data?.sales[0].salePrice)).toString()}
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
        </div>
      </div>
      <Footer />
    </div>
  );
};
