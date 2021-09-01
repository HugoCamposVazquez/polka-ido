import { useWeb3React } from '@web3-react/core';
import { Spin } from 'antd';
import { utils } from 'ethers';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useWriteJSONToIPFS } from '../../hooks/ipfs/useWriteJSONToIPFS';
import { TokenMetadata } from '../../hooks/polkadot/useStatemintToken';
import { useSaleFactoryContract } from '../../hooks/web3/contract/useSaleFactoryContract';
import { getStatemintApi } from '../../services/polkadot';
import { CheckboxField } from '../../shared/gui/CheckboxField';
import { DateField } from '../../shared/gui/DateField';
import { ImagePicker } from '../../shared/gui/ImagePicker';
import { MainButton } from '../../shared/gui/MainButton';
import { RadioGroup } from '../../shared/gui/RadioGroup';
import { TextArea } from '../../shared/gui/TextArea';
import { TextField } from '../../shared/gui/TextField';
import { ProjectApiType, ProjectType } from '../../types/ProjectType';
import { sideColor3 } from '../../utils/colorsUtil';
import { cs } from '../../utils/css';
import { convertDateToUnixtime } from '../../utils/date';
import * as styles from './AdminProjectPage.styles';

interface IProps {
  isEdit: boolean;
  loadingProjectData: boolean;
  project?: ProjectApiType | { data: undefined };
}

export const ProjectForm = ({ loadingProjectData, project, isEdit }: IProps) => {
  const methods = useForm();
  const navigation = useHistory();
  const [imageUrl, setImageUrl] = useState('');
  const [isSavingData, setIsSavingData] = useState(false);
  const { account } = useWeb3React();

  // TODO: Add fields validation

  const contract = useSaleFactoryContract();
  // TODO: Watch for error
  const { writeData: writeDataToIPFS } = useWriteJSONToIPFS();

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

  const onSubmit = async (project: ProjectType) => {
    if (!account) return;
    setIsSavingData(true);

    const api = await getStatemintApi();
    const blockHash = await api.rpc.chain.getBlockHash();
    const tokenMetadata = (
      await api.query.assets.metadata.at(blockHash, project.tokenId)
    ).toJSON() as unknown as TokenMetadata;
    if (!tokenMetadata.name) {
      // TODO: Display error that token asset doesn't exist yet
    }

    try {
      // 1. Write metadata to IPFS to get hash (URI)
      const response = await writeDataToIPFS({
        title: project.title,
        shortDescription: project.shortDescription,
        description: project.description,
        etherscanLink: project.etherscanLink,
        webLink: project.webLink,
        twitterLink: project.twitterLink,
        telegramLink: project.telegramLink,
        imageUrl,
      });
      if (!response) {
        return;
      }

      // 2. Create new sale smart contract
      const tx = await contract?.createSaleContract(
        convertDateToUnixtime(project.starts),
        convertDateToUnixtime(project.ends),
        utils.parseEther(project.minUserDeposit),
        utils.parseEther(project.maxUserDeposit),
        project.raiseAmountTotal,
        utils.parseEther(project.tokenPrice.toString()), // should be token ratio?
        project.maxUserDeposit, //_totalDepositPerUser should be removed?
        {
          tokenID: project.tokenId,
          decimals: tokenMetadata.decimals,
          walletAddress: account,
        },
        {
          whitelist: project.access === 'whitelist',
          isFeatured: project.featured,
        },
        {
          startTime: convertDateToUnixtime(project.distributionDate),
          unlockInterval: 300, // unlockInterval should be removed?
          percentageToMint: 10, // should be replaced by distribution?
        },
        `ipfs://${response.IpfsHash}`,
      );
      if (tx) {
        tx.wait(1);
        navigation.push('/admin/project');
      }
      setIsSavingData(false);
    } catch (e) {
      console.log(e);
      // TODO: show notification or error message
      setIsSavingData(false);
    }
  };

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
              <ImagePicker name={'iconUrl'} onImageUpload={setImageUrl} />
            </div>
            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
              <div style={styles.fieldSectionStyle}>Etherscan</div>
              <div>
                <TextField name={'etherscanLink'} type={'bordered'} mode={'light'} placeholder={'Link'} />
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
              <TextField name={'unlockInterval'} type={'bordered'} mode={'light'} placeholder={'30'} />
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
            {isSavingData ? <Spin style={{ marginRight: '1.5rem' }} /> : null}
            <MainButton
              title={isEdit ? 'UPDATE' : 'CREATE'}
              onClick={methods.handleSubmit(onSubmit)}
              type={'fill'}
              style={{ marginRight: '1.5rem' }}
              disabled={isSavingData}
            />
            <MainButton title={'BACK'} onClick={() => navigation.goBack()} type={'bordered'} disabled={isSavingData} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
