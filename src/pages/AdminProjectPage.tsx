import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import binImage from '../assets/bin_image.svg';
import { CheckboxField } from '../shared/gui/CheckboxField';
import { ImagePicker } from '../shared/gui/ImagePicker';
import { MainButton } from '../shared/gui/MainButton';
import { RadioGroup } from '../shared/gui/RadioGroup';
import { TextArea } from '../shared/gui/TextArea';
import { TextField } from '../shared/gui/TextField';
import { ProjectType } from '../types/ProjectType';
import { sideColor, sideColor2, sideColor3, sideColor12 } from '../utils/colorsUtil';
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

export const AdminProjectPage = (props: any) => {
  const navigation = useHistory();

  const defaultValues = props.location.state.defaultValues;

  const methods = useForm({
    defaultValues: {
      ...defaultValues,
      status: defaultValues?.status ? defaultValues?.status : 'upcoming',
      access: defaultValues?.access ? defaultValues?.access : 'whitelist',
    },
    //resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async (project: ProjectType) => {
    try {
      // const { token } = await generalHTTP.login(email, message);
      // localStorage.setItem('token', token);
      // window.location.reload();

      console.log(project);
    } catch (e) {
      console.log(e);
      // show notification or error message
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ margin: '100px 120px 0', display: 'flex' }}>
        <div style={{ fontStyle: 'Titillium Web', fontWeight: 700, fontSize: '24px', flex: 1 }}>My project 1</div>
        {defaultValues.id !== undefined && (
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <div style={{ minWidth: 'fit-content', marginRight: '6px', color: sideColor }}>Delete project</div>
            <img src={binImage} />
          </div>
        )}
      </div>
      <FormProvider {...methods}>
        <form>
          <div style={{ margin: '38px 120px 120px 120px' }}>
            <div style={titleSectionStyle}>General info</div>
            <div style={{ marginTop: '24px', display: 'flex' }}>
              <div style={{ flex: 0.4, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Project name</div>
                <TextField name={'title'} type={'bordered'} mode={'dark'} placeholder={'My project 1'} />
              </div>

              <div style={{ flex: 0.6, display: 'flex', marginRight: '12px' }}>
                <div style={{ flex: 0.45, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                  <div style={fieldSectionStyle}>Status</div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <RadioGroup
                      name={'status'}
                      color={sideColor12}
                      options={[
                        { value: 'upcoming', label: 'Upcoming' },
                        { value: 'ended', label: 'Ended' },
                      ]}
                    />
                  </div>
                </div>
                <div style={{ flex: 0.45, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                  <div style={fieldSectionStyle}>Access</div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <RadioGroup
                      name={'access'}
                      color={sideColor3}
                      options={[
                        { value: 'whitelist', label: 'Whitelist' },
                        { value: 'private', label: 'Private' },
                      ]}
                    />
                  </div>
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
                <TextField name={'starts'} type={'bordered'} mode={'dark'} placeholder={'4/4/18'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Ends</div>
                <TextField name={'ends'} type={'bordered'} mode={'dark'} placeholder={'3/4/19'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Raise amount</div>
                <TextField name={'raiseAmountTotal'} type={'bordered'} mode={'dark'} placeholder={'10,000,000'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Token price (ETH)</div>
                <TextField name={'tokenPrice'} type={'bordered'} mode={'dark'} placeholder={'0,022'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column' }}>
                <div style={fieldSectionStyle}>Token value (USDT)</div>
                <TextField name={'tokenValue'} type={'bordered'} mode={'dark'} placeholder={'0.00002'} />
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex' }}>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Project icon</div>
                <ImagePicker name={'iconUrl'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Etherscan</div>
                <div>
                  <TextField name={'etherScanLink'} type={'bordered'} mode={'dark'} placeholder={'Link'} />
                </div>
                <div style={{ flex: 1 }} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Web</div>
                <div>
                  <TextField name={'webLink'} type={'bordered'} mode={'dark'} placeholder={'Link'} />
                </div>
                <div style={{ flex: 1 }} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Twitter</div>
                <div>
                  <TextField name={'twitterLink'} type={'bordered'} mode={'dark'} placeholder={'Link'} />
                </div>
                <div style={{ flex: 1 }} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column' }}>
                <div style={fieldSectionStyle}>Telegram</div>
                <div>
                  <TextField name={'telegramLink'} type={'bordered'} mode={'dark'} placeholder={'Link'} />
                </div>
                <div style={{ flex: 1 }} />
              </div>
            </div>

            <div style={{ height: '1px', width: '100%', backgroundColor: sideColor, marginTop: '36px' }} />
            <div style={cs(titleSectionStyle, { marginTop: '24px' })}>Project details</div>

            <div style={{ marginTop: '24px', display: 'flex' }}>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Distribution date</div>
                <TextField name={'distributionDate'} type={'bordered'} mode={'dark'} placeholder={'4/4/18'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Min. allocation (ETH)</div>
                <TextField name={'minAllocation'} type={'bordered'} mode={'dark'} placeholder={'0'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Max. allocation (ETH)</div>
                <TextField name={'maxAllocation'} type={'bordered'} mode={'dark'} placeholder={'0.02'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Min. swap level</div>
                <TextField name={'minSwapLevel'} type={'bordered'} mode={'dark'} placeholder={'0.002'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column' }}>
                <div style={fieldSectionStyle}>Whitelist status</div>
                <TextField name={'whitelistStatus'} type={'bordered'} mode={'dark'} placeholder={'Whitelisted'} />
              </div>
            </div>

            <div style={{ height: '1px', width: '100%', backgroundColor: sideColor, marginTop: '36px' }} />
            <div style={cs(titleSectionStyle, { marginTop: '24px' })}>Token details</div>

            <div style={{ marginTop: '24px', display: 'flex' }}>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Name</div>
                <TextField name={'tokenName'} type={'bordered'} mode={'dark'} placeholder={'tokename'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Symbol</div>
                <TextField name={'symbol'} type={'bordered'} mode={'dark'} placeholder={'TKN'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Decimals</div>
                <TextField name={'decimals'} type={'bordered'} mode={'dark'} placeholder={'16'} />
              </div>
              <div style={{ flex: 0.2, display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                <div style={fieldSectionStyle}>Total supply</div>
                <TextField name={'totalSupply'} type={'bordered'} mode={'dark'} placeholder={'10,000,000'} />
              </div>
              <div style={{ flex: 0.2 }} />
            </div>

            <div style={{ height: '1px', width: '100%', backgroundColor: sideColor, marginTop: '36px' }} />
            <div style={cs(titleSectionStyle, { marginTop: '24px' })}>Project description</div>

            <div style={{ marginTop: '24px', display: 'flex' }}>
              <div style={{ flex: 1 }}>
                <div style={fieldSectionStyle}>Short description</div>
                <TextArea name={'shortDescription'} mode={'dark'} style={{ height: '100px' }} />
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex' }}>
              <div style={{ flex: 1 }}>
                <div style={fieldSectionStyle}>Description</div>
                <TextArea name={'description'} mode={'dark'} style={{ height: '250px' }} />
              </div>
            </div>

            <div style={{ marginTop: '36px', display: 'flex' }}>
              <MainButton
                title={defaultValues.id !== undefined ? 'UPDATE' : 'CREATE'}
                onClick={methods.handleSubmit(onSubmit)}
                type={'fill'}
                style={{ marginRight: '24px' }}
              />
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
