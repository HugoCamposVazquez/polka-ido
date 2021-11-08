import { useWeb3React } from '@web3-react/core';
import { Spin } from 'antd';
import { utils } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { config } from '../../config';
import { useWriteJSONToIPFS } from '../../hooks/ipfs/useWriteJSONToIPFS';
import { useStatemintToken } from '../../hooks/polkadot/useStatemintToken';
import { useSaleContract } from '../../hooks/web3/contract/useSaleContract';
import { useSaleFactoryContract } from '../../hooks/web3/contract/useSaleFactoryContract';
import { CheckboxField } from '../../shared/gui/CheckboxField';
import { DateField } from '../../shared/gui/DateField';
import { ImagePicker } from '../../shared/gui/ImagePicker';
import { MainButton } from '../../shared/gui/MainButton';
import { RadioGroup } from '../../shared/gui/RadioGroup';
import { TextArea } from '../../shared/gui/TextArea';
import { TextField } from '../../shared/gui/TextField';
import { ProjectType } from '../../types/ProjectType';
import { sideColor3 } from '../../utils/colorsUtil';
import { cs } from '../../utils/css';
import { convertDateToUnixtime } from '../../utils/date';
import { editProject } from '../../utils/editProject';
import { notifyError, notifySuccess } from '../../utils/notifications';
import * as styles from './AdminProjectPage.styles';

interface IProps {
  projectId?: string;
  loadingProjectData: boolean;
  defaultProjectData?: ProjectType;
}

export const ProjectForm = ({ loadingProjectData, defaultProjectData, projectId }: IProps) => {
  const methods = useForm<ProjectType>();

  const navigation = useHistory();
  const [imageUrl, setImageUrl] = useState('');
  const [isSavingData, setIsSavingData] = useState(false);
  const { account } = useWeb3React();
  const notificationTimer = 10000;

  const [isTextareaDisplay, setIsTextareaDisplayed] = useState<boolean>(false);
  const [areAddressesValid, setAreAddressesValid] = useState<boolean>(false);
  const [whitelistedAddresses, setWhitelistedAddresses] = useState<string[]>([]);

  // TODO: Add fields validation

  const saleFactoryContract = useSaleFactoryContract();
  const saleContract = useSaleContract(projectId as string);
  const { writeData: writeDataToIPFS } = useWriteJSONToIPFS();
  const { fetchTokenData } = useStatemintToken();

  const onTokenIdBlur = useCallback(async (): Promise<void> => {
    // methods.setValue('decimals', 'Loading...');
    const tokenId = methods.getValues('tokenId');

    try {
      const tokenData = await fetchTokenData(tokenId.toString());
      if (tokenData) {
        methods.setValue('decimals', tokenData.decimals);
      }
    } catch (e) {
      return;
    }
  }, [methods, fetchTokenData]);

  useEffect(() => {
    if (!loadingProjectData) {
      if (defaultProjectData === undefined) {
        // Creating new project
        methods.reset({
          access: 'whitelist',
        });
      } else {
        // Editing project

        methods.reset(defaultProjectData);
      }
    }
  }, [loadingProjectData, defaultProjectData]);

  const onSubmit = async (projectSubmit: ProjectType) => {
    if (!account) return;
    setIsSavingData(true);

    //EDIT
    if (!!projectId && defaultProjectData && saleContract) {
      editProject(
        saleContract,
        defaultProjectData,
        projectSubmit,
        (successMessage) => {
          setIsSavingData(false);
          notifySuccess(successMessage, notificationTimer);
        },
        (faliureMessage) => {
          setIsSavingData(false);
          notifyError(faliureMessage, notificationTimer);
        },
      );

      //CREATE
    } else {
      try {
        // 1. Write metadata to IPFS to get hash (URI)

        const response = await writeDataToIPFS(
          {
            title: projectSubmit.title,
            shortDescription: projectSubmit.shortDescription,
            description: projectSubmit.description,
            webLink: projectSubmit.webLink,
            twitterLink: projectSubmit.twitterLink,
            telegramLink: projectSubmit.telegramLink,
            imageUrl,
          },
          (errorMessage) => notifyError(`Error writing to IPFS: ${errorMessage}`, notificationTimer),
          (isLoading) => setIsSavingData(isLoading),
        );
        if (!response) {
          return;
        }

        // 2. Create new sale smart contract
        const tx = await saleFactoryContract?.createSaleContract(
          convertDateToUnixtime(projectSubmit.starts),
          convertDateToUnixtime(projectSubmit.ends),
          utils.parseEther(projectSubmit.minUserDepositAmount),
          utils.parseEther(projectSubmit.maxUserDepositAmount),
          utils.parseEther(projectSubmit.cap),
          utils.parseEther(projectSubmit.tokenPrice.toString()), // should be token ratio?
          {
            tokenID: projectSubmit.tokenId,
            decimals: projectSubmit.decimals,
            walletAddress: projectSubmit.walletAddress,
          },
          {
            whitelist: projectSubmit.access === 'whitelist',
            isFeatured: projectSubmit.featured,
          },
          {
            startTime: convertDateToUnixtime(projectSubmit.vestingStartDate),
            endTime: convertDateToUnixtime(projectSubmit.vestingEndDate),
          },
          `ipfs://${response.IpfsHash}`,
        );
        if (tx) {
          const contractReceipt = await tx.wait(1);
          if(contractReceipt) {
            notifySuccess('Project successfuly created.', notificationTimer);
          } 
          
        }
        setIsSavingData(false);

        navigation.goBack();
      } catch (e) {
        console.log(e);
        setIsSavingData(false);
        notifyError('Error while creating project.', notificationTimer);
      }
    }
  };

  const whitelistedAddressesString = methods.watch('whitelistedAddresses') && methods.watch('whitelistedAddresses');

  useEffect(() => {
    const validateWhitelistedAddressesFormat = (): void => {
      if (whitelistedAddressesString) {
        const stringToDissasemble = whitelistedAddressesString as string;
        const userAddress = stringToDissasemble.split(',').map((address: string) => address.trim());
        setWhitelistedAddresses(userAddress);

        const verifieAddresses = userAddress.every((userAddress) => {
          return userAddress.match(/^0x[a-fA-F0-9]{40}$/)?.input;
        });
        setAreAddressesValid(verifieAddresses);
      }
    };
    validateWhitelistedAddressesFormat();
  }, [whitelistedAddressesString]);

  const onWhitelistAddresses = (): void => {
    try {
      saleContract?.addToWhitelist(whitelistedAddresses);
      notifySuccess('Addresses successfully whitelisted', 2000);
      methods.reset({ whitelistedAddresses: '' });
    } catch (error) {
      console.error(error);
      notifyError('Error while whitelisting addresses', 2000);
    }
  };

  const onDeleteWhitelistedAddress = (): void => {
    try {
      saleContract?.removeFromWhitelist(whitelistedAddresses);
      notifySuccess('Addresses succesfuly deleted', 2000);
      methods.reset({ whitelistedAddresses: '' });
    } catch (error) {
      notifyError('An error occured while deleting addresses', 2000);
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
              <TextField name={'title'} styleType={'bordered'} mode={'light'} placeholder={'My project 1'} />
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
                      { value: 'public', label: 'Public' },
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
              <TextField name={'cap'} styleType={'bordered'} mode={'light'} placeholder={'10,000,000'} />
            </div>
          </div>

          <div style={styles.sectionContainerStyle}>
            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.25 })}>
              <div style={styles.fieldSectionStyle}>Min. deposit ({config.CURRENCY})</div>
              <TextField name={'minUserDepositAmount'} styleType={'bordered'} mode={'light'} placeholder={'0'} />
            </div>
            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.25 })}>
              <div style={styles.fieldSectionStyle}>Max. deposit ({config.CURRENCY})</div>
              <TextField name={'maxUserDepositAmount'} styleType={'bordered'} mode={'light'} placeholder={'0.02'} />
            </div>
            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
              <div style={styles.fieldSectionStyle}>Token price</div>
              <TextField name={'tokenPrice'} styleType={'bordered'} mode={'light'} placeholder={'0,022'} />
            </div>
          </div>

          <div style={styles.lineStyle} />
          <div style={cs(styles.titleSectionStyle, { marginTop: '1.5rem' })}>Project details</div>

          <div style={styles.sectionContainerStyle}>
            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
              <div style={styles.fieldSectionStyle}>Project icon</div>
              <ImagePicker name={'imageUrl'} onImageUpload={setImageUrl} />
            </div>
            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
              <div style={styles.fieldSectionStyle}>Web</div>
              <div>
                <TextField name={'webLink'} styleType={'bordered'} mode={'light'} placeholder={'Link'} />
              </div>
              <div style={{ flex: 1 }} />
            </div>
            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.2 })}>
              <div style={styles.fieldSectionStyle}>Twitter</div>
              <div>
                <TextField name={'twitterLink'} styleType={'bordered'} mode={'light'} placeholder={'Link'} />
              </div>
              <div style={{ flex: 1 }} />
            </div>
            <div style={cs(styles.fieldTitleNoMarginStyle, { flex: 0.2 })}>
              <div style={styles.fieldSectionStyle}>Telegram</div>
              <div>
                <TextField name={'telegramLink'} styleType={'bordered'} mode={'light'} placeholder={'Link'} />
              </div>
              <div style={{ flex: 1 }} />
            </div>
          </div>

          <div style={styles.lineStyle} />
          <div style={cs(styles.titleSectionStyle, { marginTop: '1.5rem' })}>Token details</div>

          <div style={styles.sectionContainerStyle}>
            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.25 })}>
              <div style={styles.fieldSectionStyle}>Vesting start date</div>
              <DateField name={'vestingStartDate'} mode={'light'} placeholder={'Select vesting start date'} />
            </div>

            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.25 })}>
              <div style={styles.fieldSectionStyle}>Vesting end date</div>
              <DateField name={'vestingEndDate'} mode={'light'} placeholder={'Select vesting end date'} />
            </div>

            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.25 })}>
              <div style={styles.fieldSectionStyle}>Token ID</div>
              <TextField
                name={'tokenId'}
                styleType={'bordered'}
                mode={'light'}
                placeholder={'Statemint token ID'}
                {...methods.register('tokenId')}
                onBlur={onTokenIdBlur}
              />
            </div>

            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.25 })}>
              <div style={styles.fieldSectionStyle}>Token decimals</div>
              <TextField name={'decimals'} styleType={'bordered'} mode={'light'} placeholder={'18'} />
            </div>
          </div>

          <div style={styles.sectionContainerStyle}>
            <div style={cs(styles.fieldTitleWithMarginStyle, { flex: 0.4 })}>
              <div style={styles.fieldSectionStyle}>Statemint address that holds tokens</div>
              <TextField
                name={'walletAddress'}
                styleType={'bordered'}
                mode={'light'}
                placeholder={'5FTrdVXtzt25ewJ2ADMzX83yEPY2nrKJGezZGstVrF51BXLX'}
              />
            </div>
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
                maxLength={200}
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
              title={projectId ? 'UPDATE' : 'CREATE'}
              onClick={methods.handleSubmit(onSubmit)}
              type={'fill'}
              style={{ marginRight: '1.5rem' }}
              disabled={isSavingData}
            />
            <MainButton title={'BACK'} onClick={() => navigation.goBack()} type={'bordered'} disabled={isSavingData} />
          </div>

          <div style={styles.whitelistedAddressesContainerStyle}>
            {defaultProjectData?.access === 'whitelist' && (
              <p
                onClick={() => setIsTextareaDisplayed(!isTextareaDisplay)}
                style={styles.addWhitelisteAddressesTitleStyle}>
                + Whitelist/Delete whitelisted adresses
              </p>
            )}
            {isTextareaDisplay && (
              <div>
                <TextArea
                  name="whitelistedAddresses"
                  mode="light"
                  style={{ height: '15.625rem' }}
                  placeholder="Add addresses you wish to whitelist/delete, please use commas for seperateing addresses"
                />
                <div style={styles.whitelistingButtonsContainer}>
                  <MainButton
                    title="Whitelist addresses"
                    type={'fill'}
                    style={{ margin: '1.5rem 0' }}
                    disabled={!areAddressesValid || !whitelistedAddressesString}
                    onClick={onWhitelistAddresses}
                  />

                  <MainButton
                    title="Delete addresses"
                    type={'bordered'}
                    style={{ margin: '1.5rem 1.5rem' }}
                    disabled={!areAddressesValid || !whitelistedAddressesString}
                    onClick={onDeleteWhitelistedAddress}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
