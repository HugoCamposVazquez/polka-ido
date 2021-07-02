import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import closeIcon from '../../assets/close_icon.svg';
import { MainButton } from '../gui/MainButton';
import { TextField } from '../gui/TextField';
import * as styles from './ClaimTokensModal.styles';

interface IProps {
  closeModal: any;
  message: string;
}

export const ClaimTokensModal = ({ closeModal }: IProps) => {
  const methods = useForm({
    defaultValues: {
      address: '',
    },
    //resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async ({ address }: any) => {
    try {
      console.log('test', address);
      closeModal();
      // const { token } = await generalHTTP.login(email, message);
      // localStorage.setItem('token', token);
      // window.location.reload();
    } catch (e) {
      console.log(e);
      // show notification or error message
    }
  };

  return (
    <div style={styles.modalContainerStyle}>
      <div style={styles.topRightBottomLeftNotch} className={styles.modalStyle}>
        <div style={styles.claimTokenParentStyle}>
          <div style={styles.claimTokenTextStyle}>CLAIM TOKEN</div>
          <div style={styles.closeIconParentStyle}>
            <img src={closeIcon} style={styles.closeIconStyle} onClick={closeModal} />
          </div>
        </div>
        <div style={styles.tknValueTextStyle}>349857 TKN</div>
        <div style={styles.enterAddressTextStyle}>Enter an address to trigger a claim.</div>
        <FormProvider {...methods}>
          <form>
            <div>
              <div style={styles.addressInputContainerStyle}>
                <div style={styles.recipientTextStyle}>Recipient</div>
                <TextField
                  name={'address'}
                  type={'none'}
                  placeholder={'Address'}
                  mode={'dark'}
                  style={{ fontSize: '20px' }}
                />
              </div>

              <div style={{ marginTop: '24px' }}>
                <MainButton
                  title={'Claim'}
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
  );
};
