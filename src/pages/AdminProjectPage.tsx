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
import { sideColor3, sideColor12 } from '../utils/colorsUtil';
import { cs } from '../utils/css';
import * as styles from './AdminProjectPage.styles';

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
    <div style={styles.adminProjectPageContainerStyle}>
      <div style={styles.titleContainerStyle}>
        <div style={styles.titleStyle}>My project 1</div>
        {defaultValues.id !== undefined && (
          <div style={styles.deleteProjectParentStyle}>
            <div style={styles.deleteProjectTextStyle}>Delete project</div>
            <img src={binImage} />
          </div>
        )}
      </div>
      <FormProvider {...methods}>
        <form>
          <div style={styles.formContainerStyle}>
            <div style={styles.titleSectionStyle}>General info</div>
            <div style={styles.sectionContainerStyle}>
              <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.4 })}>
                <div style={styles.fieldSectionStyle}>Project name</div>
                <TextField name={'title'} type={'bordered'} mode={'light'} placeholder={'My project 1'} />
              </div>

              <div style={styles.radioContainerStyle}>
                <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.45 })}>
                  <div style={styles.fieldSectionStyle}>Status</div>
                  <div style={styles.radioParentStyle}>
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
                <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.45 })}>
                  <div style={styles.fieldSectionStyle}>Access</div>
                  <div style={styles.radioParentStyle}>
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
                <div style={styles.checkBoxContainerStyle}>
                  <div style={styles.fieldSectionStyle}>Featured</div>
                  <div style={styles.checkBoxParentStyle}>
                    <CheckboxField name={'featured'} />
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.sectionContainerStyle}>
              <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Starts</div>
                <TextField name={'starts'} type={'bordered'} mode={'light'} placeholder={'4/4/18'} />
              </div>
              <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Ends</div>
                <TextField name={'ends'} type={'bordered'} mode={'light'} placeholder={'3/4/19'} />
              </div>
              <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Raise amount</div>
                <TextField name={'raiseAmountTotal'} type={'bordered'} mode={'light'} placeholder={'10,000,000'} />
              </div>
              <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Token price (ETH)</div>
                <TextField name={'tokenPrice'} type={'bordered'} mode={'light'} placeholder={'0,022'} />
              </div>
              <div style={cs(styles.fieldTitleNoMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Token value (USDT)</div>
                <TextField name={'tokenValue'} type={'bordered'} mode={'light'} placeholder={'0.00002'} />
              </div>
            </div>

            <div style={styles.sectionContainerStyle}>
              <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Project icon</div>
                <ImagePicker name={'iconUrl'} />
              </div>
              <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Etherscan</div>
                <div>
                  <TextField name={'etherScanLink'} type={'bordered'} mode={'light'} placeholder={'Link'} />
                </div>
                <div style={{ flex: 1 }} />
              </div>
              <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Web</div>
                <div>
                  <TextField name={'webLink'} type={'bordered'} mode={'light'} placeholder={'Link'} />
                </div>
                <div style={{ flex: 1 }} />
              </div>
              <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Twitter</div>
                <div>
                  <TextField name={'twitterLink'} type={'bordered'} mode={'light'} placeholder={'Link'} />
                </div>
                <div style={{ flex: 1 }} />
              </div>
              <div style={cs(styles.fieldTitleNoMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Telegram</div>
                <div>
                  <TextField name={'telegramLink'} type={'bordered'} mode={'light'} placeholder={'Link'} />
                </div>
                <div style={{ flex: 1 }} />
              </div>
            </div>

            <div style={styles.lineStyle} />
            <div style={cs(styles.titleSectionStyle, { marginTop: '24px' })}>Project details</div>

            <div style={styles.sectionContainerStyle}>
              <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Distribution date</div>
                <TextField name={'distributionDate'} type={'bordered'} mode={'light'} placeholder={'4/4/18'} />
              </div>
              <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Min. allocation (ETH)</div>
                <TextField name={'minAllocation'} type={'bordered'} mode={'light'} placeholder={'0'} />
              </div>
              <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Max. allocation (ETH)</div>
                <TextField name={'maxAllocation'} type={'bordered'} mode={'light'} placeholder={'0.02'} />
              </div>
              <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Min. swap level</div>
                <TextField name={'minSwapLevel'} type={'bordered'} mode={'light'} placeholder={'0.002'} />
              </div>
              <div style={cs(styles.fieldTitleNoMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Whitelist status</div>
                <TextField name={'whitelistStatus'} type={'bordered'} mode={'light'} placeholder={'Whitelisted'} />
              </div>
            </div>

            <div style={styles.lineStyle} />
            <div style={cs(styles.titleSectionStyle, { marginTop: '24px' })}>Token details</div>

            <div style={styles.sectionContainerStyle}>
              <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Name</div>
                <TextField name={'tokenName'} type={'bordered'} mode={'light'} placeholder={'tokename'} />
              </div>
              <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Symbol</div>
                <TextField name={'symbol'} type={'bordered'} mode={'light'} placeholder={'TKN'} />
              </div>
              <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Decimals</div>
                <TextField name={'decimals'} type={'bordered'} mode={'light'} placeholder={'16'} />
              </div>
              <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
                <div style={styles.fieldSectionStyle}>Total supply</div>
                <TextField name={'totalSupply'} type={'bordered'} mode={'light'} placeholder={'10,000,000'} />
              </div>
              <div style={{ flex: 0.2 }} />
            </div>

            <div style={styles.lineStyle} />
            <div style={cs(styles.titleSectionStyle, { marginTop: '24px' })}>Project description</div>

            <div style={styles.sectionContainerStyle}>
              <div style={{ flex: 1 }}>
                <div style={styles.fieldSectionStyle}>Short description</div>
                <TextArea
                  name={'shortDescription'}
                  mode={'light'}
                  placeholder={'Short description text here'}
                  style={{ height: '100px' }}
                />
              </div>
            </div>

            <div style={styles.sectionContainerStyle}>
              <div style={{ flex: 1 }}>
                <div style={styles.fieldSectionStyle}>Description</div>
                <TextArea
                  name={'description'}
                  mode={'light'}
                  placeholder={'Description text here'}
                  style={{ height: '250px' }}
                />
              </div>
            </div>

            <div style={styles.sectionContainerStyle}>
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
