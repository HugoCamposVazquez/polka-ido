import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import arrowDown from '../assets/arrow_down.svg';
import backToProject from '../assets/back_to_project.svg';
import { MainButton } from '../shared/gui/MainButton';
import { TextField } from '../shared/gui/TextField';
import { Footer } from '../shared/insets/user/Footer';
import { cs } from '../utils/css';
import * as styles from './JoinProjectPage.styles';

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
      <div style={styles.titleContainerStyle}>
        <div
          className={styles.backToProjectContainerStyle}
          onClick={() => {
            navigation.push(`/project/1`);
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
                    <div style={styles.subtitleTextStyle}>Balance: 0.34 ETH</div>
                  </div>
                  <div style={styles.fieldContainerStyle}>
                    <TextField
                      name={'fromValue'}
                      type={'none'}
                      placeholder={'0.02'}
                      mode={'dark'}
                      style={{ fontSize: '1.25rem' }}
                      autoFocus={true}
                    />
                    <div style={styles.maxBtnStyle}>Max</div>
                    <div style={styles.suffixTextStyle}>ETH</div>
                  </div>
                </div>
                <div style={styles.arrowContainerStyle}>
                  <img src={arrowDown} />
                </div>
                <div style={cs(styles.boxContainerStyle)}>
                  <div style={{ display: 'flex' }}>
                    <div style={cs(styles.subtitleTextStyle, { flex: 1 })}>To</div>
                    <div style={styles.subtitleTextStyle}>Remaining: 239485.32</div>
                  </div>
                  <div style={styles.fieldContainerStyle}>
                    <TextField
                      name={'toValue'}
                      type={'none'}
                      placeholder={'349857'}
                      mode={'dark'}
                      style={{ fontSize: '1.25rem' }}
                    />
                    <div style={styles.suffixTextStyle}>TKN</div>
                  </div>
                </div>

                <div style={styles.maxAllocTextStyle}>Max. allocation is 0.02 ETH</div>

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
