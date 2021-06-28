import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import closeIcon from '../../assets/close_icon.svg';
import { sideColor, sideColor3, sideColor5, sideColor6, sideColor8 } from '../../utils/colorsUtil';
import { cs, styled } from '../../utils/css';
import { MainButton } from '../gui/MainButton';
import { TextField } from '../gui/TextField';

interface IProps {
  closeModal: any;
  message: string;
}

export const modalContainerStyle = styled.cssStyle`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(1, 1, 1, 0.75);
`;

export const modalStyle = styled.cssClassName`
  padding: 24px;
  background-color: ${sideColor8};
  margin: 0px;
  width: 65%;
  max-width: 550px;

  @media (max-width: 51.875rem) {
    margin: 0px 24px;
    width: 100%;
  }
`;

export const topRightBottomLeftNotch = styled.cssStyle`
  --notchSize: 1.63rem;

  clip-path: polygon(
    0% 0%,
    var(--notchSize) 0%,
    calc(100% - var(--notchSize)) 0%,
    100% var(--notchSize),
    100% calc(100%),
    calc(100% - var(--notchSize)) 100%,
    var(--notchSize) 100%,
    0% calc(100% - var(--notchSize))
  );
`;

export const claimTokenTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 24px;
  line-height: 36.5px;
  flex: 1;
  color: ${sideColor5};
`;
export const tknValueTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 20px;
  line-height: 30.42px;
  color: ${sideColor3};
  margin-top: 8px;
`;
export const enterAddressTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 16px;
  line-height: 24.34px;
  color: ${sideColor};
  margin-top: 18px;
`;

export const addressInputContainerStyle = styled.cssStyle`
  border: 1px solid ${sideColor6};
  padding: 4px 8px;
  margin-top: 30px;
`;

export const recipientTextStyle = styled.cssStyle`
  padding: 4px 8px 0px 8px;
  font-family: Titillium Web;
  color: ${sideColor};
  font-size: 16px;
  font-weight: 400;
  line-height: 24.34px;
`;

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
    <div style={modalContainerStyle}>
      <div style={topRightBottomLeftNotch} className={modalStyle}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={claimTokenTextStyle}>CLAIM TOKEN</div>
          <div style={{ height: '16px', width: '16px', display: 'flex' }}>
            <img src={closeIcon} style={{ height: '100%', width: '100%', cursor: 'pointer' }} onClick={closeModal} />
          </div>
        </div>
        <div style={tknValueTextStyle}>349857 TKN</div>
        <div style={enterAddressTextStyle}>Enter an address to trigger a claim.</div>
        <FormProvider {...methods}>
          <form>
            <div>
              <div style={addressInputContainerStyle}>
                <div style={recipientTextStyle}>Recipient</div>
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
