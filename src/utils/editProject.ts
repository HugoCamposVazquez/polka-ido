import { SaleContract } from '@nodefactoryio/ryu-contracts/typechain/SaleContract';
import axios from 'axios';
import { ContractTransaction } from 'ethers';
import { formatEther, parseEther, parseUnits, formatUnits } from 'ethers/lib/utils';

import { getPinataApi, PinataResponse } from '../services/pinata';
import { ProjectStatus } from '../types/enums/ProjectStatus';
import { ProjectMetadata, ProjectType, SalesDto } from '../types/ProjectType';
import { convertDateFromUnixTime, convertDateToUnixtime } from './date';

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
type keyOfProjectType = keyof ProjectType;

const editTx = async <T extends Function>(
  contractMethod: T,
  contractMethodProps: ArgumentTypes<T>,
  { successMessage, errorMessage }: { successMessage: string; errorMessage: string },
  onSuccess: (message: string) => void,
  onFaliure: (message: string) => void,
) => {
  try {
    const tx: ContractTransaction = await contractMethod(...contractMethodProps);
    const contractReceipt = await tx.wait(1);
    if (contractReceipt) onSuccess(successMessage);
  } catch (err) {
    console.log(err);
    onFaliure(errorMessage);
  }
};

export const editProject = async (
  saleContract: SaleContract,
  defaultData: ProjectType,
  submitedData: ProjectType,
  onSuccess: (message: string) => void,
  onFaliure: (message: string) => void,
): Promise<void> => {
  //returns true if any of given properties are changed
  const isChanged = (propertyKeys: keyOfProjectType[]): boolean => {
    let isChanged = false;
    propertyKeys.forEach((key) => {
      isChanged = isChanged || defaultData[key] !== submitedData[key];
    });
    return isChanged;
  };

  //--------------------------Sale-information--------------------------
  //Access
  if (isChanged(['access'])) {
    await editTx(
      saleContract.setWhitelisting,
      [submitedData.access === 'whitelist'],
      { successMessage: 'Access successfuly updated.', errorMessage: 'Failed to update access.' },
      onSuccess,
      onFaliure,
    );
  }
  //Featured
  if (isChanged(['featured'])) {
    await editTx(
      saleContract.setFeatured,
      [submitedData.featured],
      { successMessage: 'Featured successfuly updated.', errorMessage: 'Failed to update featured.' },
      onSuccess,
      onFaliure,
    );
  }
  //Starts / Ends
  if (isChanged(['starts', 'ends'])) {
    await editTx(
      saleContract.setTimeDates,
      [convertDateToUnixtime(submitedData.starts), convertDateToUnixtime(submitedData.ends)],
      {
        successMessage: `${isChanged(['starts']) ? 'Starts successfuly updated.' : ''} 
        ${isChanged(['ends']) ? 'Ends successfuly updated.' : ''}`,
        errorMessage: `${isChanged(['starts']) ? 'Starts failed to update.' : ''} 
        ${isChanged(['ends']) ? 'Ends failed to update.' : ''}`,
      },
      onSuccess,
      onFaliure,
    );
  }
  //Raise mount
  if (isChanged(['cap'])) {
    console.log(parseEther(submitedData.cap));
    await editTx(
      saleContract.setCap,
      [parseEther(submitedData.cap)],
      {
        successMessage: `${isChanged(['cap']) ? 'Raise amount successfuly updated' : ''}`,
        errorMessage: `${isChanged(['cap']) ? 'Raise amount failed to update' : ''}`,
      },
      onSuccess,
      onFaliure,
    );
  }
  //Min. deposit / Max. deposit
  if (isChanged(['minUserDepositAmount', 'maxUserDepositAmount'])) {
    await editTx(
      saleContract.setLimits,
      [parseEther(submitedData.minUserDepositAmount), parseEther(submitedData.maxUserDepositAmount)],
      {
        successMessage: `${isChanged(['minUserDepositAmount']) ? 'Min. deposit successfuly updated.' : ''} 
        ${isChanged(['maxUserDepositAmount']) ? 'Max. deposit successfuly updated.' : ''}`,
        errorMessage: `${isChanged(['minUserDepositAmount']) ? 'Min. deposit failed to update.' : ''} 
        ${isChanged(['maxUserDepositAmount']) ? 'Max. deposit failed to updated.' : ''}`,
      },
      onSuccess,
      onFaliure,
    );
  }
  //Token price
  if (isChanged(['tokenPrice'])) {
    await editTx(
      saleContract.setSalePrice,
      [parseUnits(submitedData.tokenPrice.toString())],
      { successMessage: 'Token price successfuly updated.', errorMessage: 'Token price failed to update.' },
      onSuccess,
      onFaliure,
    );
  }

  //--------------------------Metadata--------------------------
  //Project name / Project icon / Web / Twitter / Telegram / Short description / Description
  if (isChanged(['title', 'imageUrl', 'webLink', 'twitterLink', 'telegramLink', 'shortDescription', 'description'])) {
    const { title, shortDescription, description, webLink, twitterLink, telegramLink, imageUrl } = submitedData;
    const IPFSResponse = await writeToIPFS(
      {
        title,
        shortDescription,
        description,
        webLink,
        twitterLink,
        telegramLink,
        imageUrl,
      },
      () => {},
      () => {},
    );
    if (IPFSResponse) {
      const newMetaDataURI = `ipfs://${IPFSResponse.IpfsHash}`;
      await editTx(
        saleContract.setMetadataURI,
        [newMetaDataURI],
        {
          successMessage: `
            ${isChanged(['title']) ? 'Title updated.' : ''}
            ${isChanged(['imageUrl']) ? 'Project icon updated.' : ''}
            ${isChanged(['webLink']) ? 'Web updated.' : ''}
            ${isChanged(['twitterLink']) ? 'Twitter updated.' : ''}
            ${isChanged(['telegramLink']) ? 'Telegram updated.' : ''}
            ${isChanged(['shortDescription']) ? 'Short description updated.' : ''}
            ${isChanged(['description']) ? 'Description updated.' : ''}
          `,
          errorMessage: `Failed to set new metadataURI`,
        },
        () => {},
        () => {},
      );
    } else {
      onFaliure(`Failed to write new IPFS: `);
    }

    if (IPFSResponse !== null) {
      onSuccess(
        `
        ${isChanged(['title']) ? 'Title updated.' : ''}
        ${isChanged(['imageUrl']) ? 'Project icon updated.' : ''}
        ${isChanged(['webLink']) ? 'Web updated.' : ''}
        ${isChanged(['twitterLink']) ? 'Twitter updated.' : ''}
        ${isChanged(['telegramLink']) ? 'Telegram updated.' : ''}
        ${isChanged(['shortDescription']) ? 'Short description updated.' : ''}
        ${isChanged(['description']) ? 'Description updated.' : ''}
        `,
      );
    }
  }
  //--------------------------Token-details--------------------------
  //Vesting start date / Vesting end date
  if (isChanged(['vestingStartDate', 'vestingEndDate'])) {
    await editTx(
      saleContract.updateVestingConfig,
      [
        {
          startTime: convertDateToUnixtime(submitedData.vestingStartDate),
          endTime: convertDateToUnixtime(submitedData.vestingEndDate),
        },
      ],
      {
        successMessage: `${isChanged(['minUserDepositAmount']) ? 'Min. vesting successfuly updated.' : ''}
        ${isChanged(['maxUserDepositAmount']) ? 'Max. vesting successfuly updated.' : ''}`,
        errorMessage: `${isChanged(['minUserDepositAmount']) ? 'Min. vesting failed to update.' : ''} 
        ${isChanged(['maxUserDepositAmount']) ? 'Max. vesting failed to updated.' : ''}`,
      },
      onSuccess,
      onFaliure,
    );
  }
  //Token ID / Decimals / Statemint address that holds tokens
  if (isChanged(['tokenId', 'decimals', 'walletAddress'])) {
    await editTx(
      saleContract.setToken,
      [{ tokenID: submitedData.tokenId, decimals: submitedData.decimals, walletAddress: submitedData.walletAddress }],
      {
        successMessage: `${isChanged(['tokenId']) ? 'Token ID successfuly updated.' : ''} 
        ${isChanged(['decimals']) ? 'Decimals successfuly updated.' : ''}
        ${isChanged(['walletAddress']) ? 'Address successfuly updated.' : ''}`,
        errorMessage: `${isChanged(['tokenId']) ? 'Token ID failed to update.' : ''} 
        ${isChanged(['decimals']) ? 'Decimals failed to updated.' : ''}
        ${isChanged(['walletAddress']) ? 'Address failed to update.' : ''}`,
      },
      onSuccess,
      onFaliure,
    );
  }

  if (!isChanged(editProjectFields)) {
    onFaliure('No changes were made');
  }
};

export const convertToProjectType = (
  project?: SalesDto,
  metadata?: ProjectMetadata,
  id?: string,
): ProjectType | undefined => {
  if (project && metadata && id) {
    const {
      salePrice,
      startDate,
      endDate,
      whitelisted,
      featured,
      minUserDepositAmount,
      maxUserDepositAmount,
      cap,
      vestingStartDate,
      vestingEndDate,
      token,
    } = project;
    return {
      status: getStatus(startDate, endDate),
      access: whitelisted ? 'whitelist' : 'public',
      featured,
      starts: convertDateFromUnixTime(startDate),
      ends: convertDateFromUnixTime(endDate),
      minUserDepositAmount: formatEther(minUserDepositAmount),
      maxUserDepositAmount: formatEther(maxUserDepositAmount),
      cap: formatEther(cap),
      tokenPrice: formatUnits(salePrice, token.decimals),
      vestingStartDate: convertDateFromUnixTime(vestingStartDate),
      vestingEndDate: convertDateFromUnixTime(vestingEndDate),
      tokenId: parseInt(token.id),
      walletAddress: token.walletAddress,
      decimals: token.decimals,
      //metadata
      title: metadata.title,
      webLink: metadata.webLink,
      twitterLink: metadata.twitterLink,
      telegramLink: metadata.telegramLink,
      shortDescription: metadata.shortDescription,
      description: metadata.description,
      imageUrl: metadata.imageUrl,
    };
  } else return undefined;
};

const getStatus = (startDate: string, endDate: string): ProjectStatus => {
  const timeNow = Date.now();
  const starts = new Date(parseInt(startDate));
  const ends = new Date(parseInt(endDate));

  if (ends.valueOf() < timeNow) {
    if (starts.valueOf() < timeNow) return 'inProgress';
    else return 'upcoming';
  } else return 'ended';
};

export const writeToIPFS = async (
  body: ProjectMetadata,
  setError: (e: string) => void,
  setLoading: (isLoading: boolean) => void,
): Promise<PinataResponse | null> => {
  try {
    const api = getPinataApi();
    const response = await api.post('/pinning/pinJSONToIPFS', body);
    if (response.data) {
      return response.data;
    }
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      setError(e.response?.data);
    } else {
      setError(`An unexpected error occurred: ${e.message}`);
    }
  }
  setLoading(false);
  return null;
};

const editProjectFields: keyOfProjectType[] = [
  'access',
  'decimals',
  'description',
  'ends',
  'featured',
  'imageUrl',
  'maxUserDepositAmount',
  'minUserDepositAmount',
  'cap',
  'shortDescription',
  'starts',
  'telegramLink',
  'title',
  'tokenId',
  'tokenPrice',
  'twitterLink',
  'vestingEndDate',
  'vestingStartDate',
  'walletAddress',
  'webLink',
];
