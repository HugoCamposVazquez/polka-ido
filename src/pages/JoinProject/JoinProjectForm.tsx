import { yupResolver } from '@hookform/resolvers/yup';
import { BigNumber, BigNumberish, ethers } from 'ethers';
import React, { useEffect } from 'react';
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
import { numberWithDots, scientificToDecimal } from '../../utils/numModifiyngFuncs';
import * as styles from './JoinProjectPage.styles';

export const JoinProjectForm = () => {
  const { id: address }: { id: string } = useParams();
  const { data } = useSingleProject(address);
  const { balance } = useMoonbeanBalance();
  const saleContract = useSaleContract(address);
  const maxAllocation =
    data?.sales[0].maxDepositAmount && ethers.utils.formatEther(data?.sales[0].maxDepositAmount).toString();

  const validationSchema = yup.object().shape({
    fromValue: yup.number().required().max(Number(maxAllocation)),
    toValue: yup.number().required(),
  });

  const methods = useForm({
    defaultValues: {
      fromValue: '',
      toValue: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const isValidInput = (inputValue: string) => {
    try {
      ethers.utils.parseEther(inputValue);

      return true;
    } catch (e) {
      return false;
    }
  };

  const onSubmit = async ({ toValue }: { fromValue: string; toValue: string }): Promise<void> => {
    try {
      const validValue = isValidInput(scientificToDecimal(toValue));
      if (validValue) {
        saleContract?.buyTokens({
          value: ethers.utils.parseEther(scientificToDecimal(toValue)),
          gasLimit: 10000000,
        });
        methods.setValue('toValue', '');
        methods.setValue('fromValue', '');
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const setBuyTokens = (amountToSet: BigNumberish) => {
    methods.setValue('fromValue', amountToSet);
    calculateValue(amountToSet.toString());
  };

  const onClickSetMaxAllocation = () => {
    const minNum = Math.min(Number(balance), Number(maxAllocation));
    setBuyTokens(minNum.toString());
  };

  //Subscribe to input changes
  const swapValues = methods.watch();
  const calculateValue = React.useCallback(
    (value: string) => {
      const validValue = isValidInput(value);
      if (data && validValue) {
        return ethers.utils
          .formatEther(BigNumber.from(ethers.utils.parseEther(value)).mul(data?.sales[0].salePrice).toString())
          .replace(/\.0+$/, ''); // replace zeros
      } else {
        return '0';
      }
    },
    [data?.sales[0], swapValues.toValue],
  );

  const getRemainingTokens = React.useMemo(() => {
    const calculatedRemainingTokens =
      maxAllocation &&
      data &&
      ethers.utils
        .parseEther(maxAllocation)
        .sub(ethers.utils.parseEther(data?.sales[0].currentDepositAmount))
        .div(ethers.utils.parseEther(data?.sales[0].salePrice))
        .toString();
    const remainingTokens = calculatedRemainingTokens && numberWithDots(calculatedRemainingTokens);

    return remainingTokens;
  }, [data?.sales[0]]);

  useEffect(() => {
    if (data) {
      if (swapValues.fromValue && swapValues.toValue !== calculateValue(swapValues.fromValue))
        methods.setValue('toValue', calculateValue(swapValues.fromValue));
      if (!swapValues.fromValue) {
        methods.setValue('toValue', '');
        methods.setValue('fromValue', '');
      }
    }
  }, [swapValues.fromValue]);

  useEffect(() => {
    const calcTknToEth =
      isValidInput(swapValues.toValue) &&
      swapValues.toValue &&
      data &&
      ethers.utils
        .formatEther(ethers.utils.parseEther(swapValues.toValue).div(data?.sales[0].salePrice))
        .toString()
        .replace(/\.0+$/, ''); // remove trailing zeros

    if (data) {
      if (swapValues.toValue && swapValues.fromValue !== calcTknToEth) {
        methods.setValue('fromValue', calcTknToEth);
      }

      if (!swapValues.toValue) {
        methods.setValue('toValue', '');
        methods.setValue('fromValue', '');
      }
    }
  }, [swapValues.toValue]);

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
                styleType={'none'}
                placeholder={maxAllocation && maxAllocation}
                mode={'dark'}
                style={{ fontSize: '1.25rem' }}
                autoFocus={true}
                type="number"
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
                styleType={'none'}
                placeholder={
                  data &&
                  maxAllocation &&
                  ethers.utils.formatEther(
                    BigNumber.from(ethers.utils.parseEther(maxAllocation)).mul(data?.sales[0].salePrice).toString(),
                  )
                }
                mode={'dark'}
                style={{ fontSize: '1.25rem' }}
                type="number"
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
