import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import backToProject from '../assets/back_to_project.svg';
import { MainButton } from '../shared/gui/MainButton';
import { TextField } from '../shared/gui/TextField';
import { Footer } from '../shared/insets/Footer';
import { sideColor, sideColor3, sideColor4, sideColor5, sideColor6, sideColor8 } from '../utils/colorsUtil';
import { cs, styled } from '../utils/css';
import * as styles from './LaunchpadPage.styles';

export const cardStyle = styled.cssClassName`
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

export const topLeftBottomRightNotch = styled.cssStyle`
  --notchSize: 1.63rem;

  clip-path: polygon(
    0% var(--notchSize),
    var(--notchSize) 0%,
    calc(100%) 0%,
    100% var(--notchSize),
    100% calc(100% - var(--notchSize)),
    calc(100% - var(--notchSize)) 100%,
    0% 100%,
    0% calc(100% - var(--notchSize))
  );
`;

const boxContainerStyle = styled.cssStyle`
  border: 1px solid ${sideColor6};
  padding: 4px 8px;
`;

const subtitleTextStyle = styled.cssStyle`
  padding: 4px 8px 0px 8px;
  font-family: Titillium Web;
  color: ${sideColor6};
  font-size: 16px;
  font-weight: 400;
  line-height: 24.34px;
`;

const suffixTextStyle = styled.cssStyle`
  padding: 8px 8px;
  font-family: Titillium Web;
  color: ${sideColor3};
  font-size: 16px;
  font-weight: 400;
  line-height: 24.34px;
`;

const projectTitleStyle = styled.cssStyle`
  font-family: Odibee Sans;
  color: ${sideColor5};
  font-size: 48px;
  font-weight: 400;
  line-height: 53.18px;
  margin-top: 180px;
  display: flex;
  justify-content: center;
`;

const backToProjectsTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  color: ${sideColor};
  font-size: 16px;
  font-weight: 400;
  line-height: 24.34px;
  margin-left: 12px;
`;

const maxAllocTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  color: ${sideColor};
  font-size: 14px;
  font-weight: 400;
  line-height: 24.34px;
  text-align: center;
  margin-top: 8px;
`;

export const JoinProjectPage = () => {
  const navigation = useHistory();
  const methods = useForm({
    defaultValues: {
      fromValue: '',
      toValue: '',
    },
    //resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async ({ fromValue, toValue }: any) => {
    try {
      console.log('test', fromValue, toValue);
      // const { token } = await generalHTTP.login(email, message);
      // localStorage.setItem('token', token);
      // window.location.reload();
    } catch (e) {
      console.log(e);
      // show notification or error message
    }
  };

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <div style={projectTitleStyle}>My project 1</div>
        <div
          style={{
            position: 'absolute',
            left: '120px',
            top: '50%',
            transform: 'translate(0,-50%)',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            navigation.push(`/project/1`);
          }}>
          <img src={backToProject} />
          <div style={backToProjectsTextStyle}>Back to project</div>
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
        <div style={topLeftBottomRightNotch} className={cardStyle}>
          <FormProvider {...methods}>
            <form>
              <div>
                <div style={boxContainerStyle}>
                  <div style={{ display: 'flex' }}>
                    <div style={cs(subtitleTextStyle, { flex: 1 })}>From</div>
                    <div style={subtitleTextStyle}>Balance: 0.34 ETH</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      name={'fromValue'}
                      type={'none'}
                      placeholder={'0.02'}
                      mode={'light'}
                      style={{ fontSize: '20px' }}
                    />
                    <div
                      style={{
                        width: '54px',
                        height: '25px',
                        backgroundColor: sideColor5,
                        color: sideColor4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      Max
                    </div>
                    <div style={suffixTextStyle}>ETH</div>
                  </div>
                </div>
                <div style={cs(boxContainerStyle, { marginTop: '30px' })}>
                  <div style={{ display: 'flex' }}>
                    <div style={cs(subtitleTextStyle, { flex: 1 })}>To</div>
                    <div style={subtitleTextStyle}>Remaining: 239485.32</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      name={'toValue'}
                      type={'none'}
                      placeholder={'349857'}
                      mode={'light'}
                      style={{ fontSize: '20px' }}
                    />
                    <div style={suffixTextStyle}>TKN</div>
                  </div>
                </div>

                <div style={maxAllocTextStyle}>Max. allocation is 0.02 ETH</div>

                <div style={{ marginTop: '24px' }}>
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
