import FormData from 'form-data';
import React, { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useWriteFileToIPFS } from '../../hooks/ipfs/useWriteFileToIPFS';
import { CheckboxField } from '../../shared/gui/CheckboxField';
import { DateField } from '../../shared/gui/DateField';
import { ImagePicker } from '../../shared/gui/ImagePicker';
import { MainButton } from '../../shared/gui/MainButton';
import { RadioGroup } from '../../shared/gui/RadioGroup';
import { TextArea } from '../../shared/gui/TextArea';
import { TextField } from '../../shared/gui/TextField';
import { ProjectType } from '../../types/ProjectType';
import { sideColor3, sideColor12 } from '../../utils/colorsUtil';
import { cs } from '../../utils/css';
import * as styles from './AdminProjectPage.styles';

interface IProps {
  isEdit: boolean;
  loadingProjectData: boolean;
  project: any; // :(
}

export const ProjectForm = ({ loadingProjectData, project, isEdit }: IProps) => {
  const methods = useForm();
  const navigation = useHistory();

  const onSubmit = async (project: ProjectType) => {
    try {
      console.log('project submitted: ', project);
    } catch (e) {
      console.log(e);
      // show notification or error message
    }
  };

  useEffect(() => {
    if (!loadingProjectData) {
      if (project?.data === undefined) {
        // Creating new project
        methods.reset({
          access: 'whitelist',
        });
      } else {
        // Editing project
        methods.reset({
          ...project?.data,
          access: project?.data?.access,
        });
      }
    }
  }, [loadingProjectData, project]);

  return (
    <FormProvider {...methods}>
      <form>
        <div style={styles.formContainerStyle}>
          <div style={styles.titleSectionStyle}>Sale information</div>
          <div style={styles.sectionContainerStyle}>
            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.4 })}>
              <div style={styles.fieldSectionStyle}>Project name</div>
              <TextField name={'title'} type={'bordered'} mode={'light'} placeholder={'My project 1'} />
            </div>

            <div style={styles.radioContainerStyle}>
              <div style={cs(styles.fieldTitleWithMarginStyle)}>
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
            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.25 })}>
              <div style={styles.fieldSectionStyle}>Starts</div>
              <DateField name={'starts'} mode={'light'} placeholder="Select start time" />
            </div>
            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.25 })}>
              <div style={styles.fieldSectionStyle}>Ends</div>
              <DateField name={'ends'} mode={'light'} placeholder="Select end time" />
            </div>
            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
              <div style={styles.fieldSectionStyle}>Raise amount</div>
              <TextField name={'raiseAmountTotal'} type={'bordered'} mode={'light'} placeholder={'10,000,000'} />
            </div>
          </div>

          <div style={styles.sectionContainerStyle}>
            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.25 })}>
              <div style={styles.fieldSectionStyle}>Min. deposit ()</div>
              <TextField name={'minUserDeposit'} type={'bordered'} mode={'light'} placeholder={'0'} />
            </div>
            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.25 })}>
              <div style={styles.fieldSectionStyle}>Max. deposit ()</div>
              <TextField name={'maxUserDeposit'} type={'bordered'} mode={'light'} placeholder={'0.02'} />
            </div>
            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
              <div style={styles.fieldSectionStyle}>Token price</div>
              <TextField name={'tokenPrice'} type={'bordered'} mode={'light'} placeholder={'0,022'} />
            </div>
          </div>

          <div style={styles.lineStyle} />
          <div style={cs(styles.titleSectionStyle, { marginTop: '1.5rem' })}>Project details</div>

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
          <div style={cs(styles.titleSectionStyle, { marginTop: '1.5rem' })}>Token details</div>

          <div style={styles.sectionContainerStyle}>
            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.25 })}>
              <div style={styles.fieldSectionStyle}>Distribution date</div>
              <DateField name={'distributionDate'} mode={'light'} placeholder={'Select vesting start date'} />
            </div>

            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
              <div style={styles.fieldSectionStyle}>Unlock interval (days)</div>
              <TextField name={'tokenId'} type={'bordered'} mode={'light'} placeholder={'30'} />
            </div>

            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.25 })}>
              <div style={styles.fieldSectionStyle}>Token ID</div>
              <TextField name={'tokenId'} type={'bordered'} mode={'light'} placeholder={'Statemint token ID'} />
            </div>
            <div style={{ flex: 0.2 }} />
          </div>

          <div style={styles.lineStyle} />
          <div style={cs(styles.titleSectionStyle, { marginTop: '1.5rem' })}>Project description</div>

          <div style={styles.sectionContainerStyle}>
            <div style={{ flex: 1 }}>
              <div style={styles.fieldSectionStyle}>Short description</div>
              <TextArea
                name={'shortDescription'}
                mode={'light'}
                placeholder={'Short description text here'}
                style={{ height: '6.25rem' }}
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
                style={{ height: '15.625rem' }}
              />
            </div>
          </div>

          <div style={styles.sectionContainerStyle}>
            <MainButton
              title={isEdit ? 'UPDATE' : 'CREATE'}
              onClick={methods.handleSubmit(onSubmit)}
              type={'fill'}
              style={{ marginRight: '1.5rem' }}
            />
            <MainButton title={'BACK'} onClick={() => navigation.goBack()} type={'bordered'} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
