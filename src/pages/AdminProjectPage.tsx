import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import binImage from '../assets/bin_image.svg';
import horseImage from '../assets/horse_image.png';
import removeIcon from '../assets/remove_icon.svg';
import { CheckboxField } from '../shared/gui/CheckboxField';
import { MainButton } from '../shared/gui/MainButton';
import { TextArea } from '../shared/gui/TextArea';
import { TextField } from '../shared/gui/TextField';
import { sideColor, sideColor2 } from '../utils/colorsUtil';
import { cs, styled } from '../utils/css';

export const titleSectionStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 18px;
  color: ${sideColor2};
`;

export const fieldSectionStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 600;
  font-size: 16px;
  margin-left: 16px;
  margin-bottom: 12px;
  color: ${sideColor};
`;

export const AdminProjectPage = () => {
  const navigation = useHistory();

  const methods = useForm({
    defaultValues: {
      email: '',
      message: '',
    },
    //resolver: yupResolver(loginValidationSchema),
  });

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ margin: '100px 120px 0', display: 'flex' }}>
        <div style={{ fontStyle: 'Titillium Web', fontWeight: 700, fontSize: '24px', flex: 1 }}>My project 1</div>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <div style={{ minWidth: 'fit-content', marginRight: '6px', color: sideColor }}>Delete project</div>
          <img src={binImage} />
        </div>
      </div>
      <FormProvider {...methods}>
        <form>
          <div style={{ margin: '38px 120px 120px 120px' }}>
            <div style={titleSectionStyle}>General info</div>
            <div style={{ marginTop: '24px', display: 'flex' }}>
              <div style={{ flex: 0.4, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Project name</div>
                <TextField name={'projectName'} type={'bordered'} mode={'light'} placeholder={'My project 1'} />
              </div>

              <div style={{ flex: 0.6, display: 'flex', marginRight: '12px' }}>
                <div style={{ flex: 0.45, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                  <div style={fieldSectionStyle}>Status</div>
                  <div style={{ backgroundColor: 'red', flex: 1 }}></div>
                </div>
                <div style={{ flex: 0.45, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                  <div style={fieldSectionStyle}>Access</div>
                  <div style={{ backgroundColor: 'yellow', flex: 1 }}></div>
                </div>
                <div style={{ flex: 0.1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={fieldSectionStyle}>Featured</div>
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: '16px',
                    }}>
                    <CheckboxField name={'featured'} />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex' }}>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Starts</div>
                <TextField name={'starts'} type={'bordered'} mode={'light'} placeholder={'4/4/18'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Ends</div>
                <TextField name={'ends'} type={'bordered'} mode={'light'} placeholder={'3/4/19'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Raise amount</div>
                <TextField name={'raiseAmount'} type={'bordered'} mode={'light'} placeholder={'10,000,000'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Token price (ETH)</div>
                <TextField name={'tokenPrice'} type={'bordered'} mode={'light'} placeholder={'0,022'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column' }}>
                <div style={fieldSectionStyle}>Token value (USDT)</div>
                <TextField name={'tokenValue'} type={'bordered'} mode={'light'} placeholder={'0.00002'} />
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex' }}>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Project icon</div>
                <div style={{ display: 'flex', marginLeft: '16px' }}>
                  <div style={{ position: 'relative' }}>
                    <img
                      style={{
                        height: '48px',
                        width: '48px',
                        marginRight: '6px',
                        marginTop: '6px',
                        objectFit: 'cover',
                      }}
                      src={horseImage}
                    />
                    <img style={{ position: 'absolute', top: 0, right: 0 }} src={removeIcon} />
                  </div>
                </div>
                <MainButton
                  title={'Upload image'}
                  onClick={() => {}}
                  type={'bordered'}
                  style={{
                    marginTop: '24px',
                    marginLeft: '16px',
                    color: sideColor,
                    borderColor: sideColor,
                    fontSize: '12px',
                    width: '102px',
                    height: '34px',
                  }}
                />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Etherscan</div>
                <div>
                  <TextField name={'ends'} type={'bordered'} mode={'light'} placeholder={'Link'} />
                </div>
                <div style={{ flex: 1 }} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Web</div>
                <div>
                  <TextField name={'raiseAmount'} type={'bordered'} mode={'light'} placeholder={'Link'} />
                </div>
                <div style={{ flex: 1 }} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Twitter</div>
                <div>
                  <TextField name={'tokenPrice'} type={'bordered'} mode={'light'} placeholder={'Link'} />
                </div>
                <div style={{ flex: 1 }} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column' }}>
                <div style={fieldSectionStyle}>Telegram</div>
                <div>
                  <TextField name={'tokenValue'} type={'bordered'} mode={'light'} placeholder={'Link'} />
                </div>
                <div style={{ flex: 1 }} />
              </div>
            </div>

            <div style={{ height: '1px', width: '100%', backgroundColor: sideColor, marginTop: '36px' }} />
            <div style={cs(titleSectionStyle, { marginTop: '24px' })}>Project details</div>

            <div style={{ marginTop: '24px', display: 'flex' }}>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Distribution date</div>
                <TextField name={'starts'} type={'bordered'} mode={'light'} placeholder={'4/4/18'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Min. allocation (ETH)</div>
                <TextField name={'ends'} type={'bordered'} mode={'light'} placeholder={'0'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Max. allocation (ETH)</div>
                <TextField name={'raiseAmount'} type={'bordered'} mode={'light'} placeholder={'0.02'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Min. swap level</div>
                <TextField name={'tokenPrice'} type={'bordered'} mode={'light'} placeholder={'0.002'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column' }}>
                <div style={fieldSectionStyle}>Whitelist status</div>
                <TextField name={'tokenValue'} type={'bordered'} mode={'light'} placeholder={'Whitelisted'} />
              </div>
            </div>

            <div style={{ height: '1px', width: '100%', backgroundColor: sideColor, marginTop: '36px' }} />
            <div style={cs(titleSectionStyle, { marginTop: '24px' })}>Token details</div>

            <div style={{ marginTop: '24px', display: 'flex' }}>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Name</div>
                <TextField name={'starts'} type={'bordered'} mode={'light'} placeholder={'tokename'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Symbol</div>
                <TextField name={'ends'} type={'bordered'} mode={'light'} placeholder={'TKN'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Decimals</div>
                <TextField name={'raiseAmount'} type={'bordered'} mode={'light'} placeholder={'16'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Total supply</div>
                <TextField name={'tokenPrice'} type={'bordered'} mode={'light'} placeholder={'10,000,000'} />
              </div>
              <div style={{ flex: 0.2 }} />
            </div>

            <div style={{ height: '1px', width: '100%', backgroundColor: sideColor, marginTop: '36px' }} />
            <div style={cs(titleSectionStyle, { marginTop: '24px' })}>Project description</div>

            <div style={{ marginTop: '24px', display: 'flex' }}>
              <div style={{ flex: 1 }}>
                <div style={fieldSectionStyle}>Description</div>
                <TextArea name={'starts'} mode={'light'} style={{ height: '200px' }} />
              </div>
            </div>

            <div style={{ marginTop: '36px', display: 'flex' }}>
              <MainButton title={'SAVE'} onClick={() => {}} type={'fill'} style={{ marginRight: '24px' }} />
              <MainButton
                title={'BACK'}
                onClick={() => {
                  navigation.push('/admin');
                }}
                type={'bordered'}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
