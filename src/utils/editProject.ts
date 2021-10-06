import { SaleContract } from '@nodefactoryio/ryu-contracts/typechain/SaleContract';

import { ProjectSaleStatus, ProjectStatus } from '../types/enums/ProjectStatus';
import { ProjectSales, ProjectType } from '../types/ProjectType';

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
    const tx = await contractMethod(contractMethodProps);
    if (tx) tx.wait(1);
    onSuccess(successMessage);
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
  //Project name
  if (isChanged(['title'])) {
    //?? - not sure which contract method is this
    console.log('title changed');
  }
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
      [submitedData.featured === true],
      { successMessage: 'Featured successfuly updated.', errorMessage: 'Failed to update featured.' },
      onSuccess,
      onFaliure,
    );
  }
  //Starts / Ends
  if (isChanged(['starts', 'ends'])) {
    await editTx(
      saleContract.setTimeDates,
      [submitedData.starts.valueOf(), submitedData.ends.valueOf()],
      {
        successMessage: `${isChanged(['starts']) && 'Starts successfuly updated.'} 
        ${isChanged(['ends']) && 'Ends successfuly updated.'}`,
        errorMessage: `${isChanged(['starts']) && 'Starts failed to update.'} 
        ${isChanged(['ends']) && 'Ends failed to update.'}`,
      },
      onSuccess,
      onFaliure,
    );
  }
  //Raise mount
  if (isChanged(['raiseAmountTotal'])) {
    console.log('raiseAmountTotal changed');
    //?? - not sure which contract method is this
  }
  //Min. deposit / Max. deposit
  if (isChanged(['minUserDepositAmount', 'maxUserDepositAmount'])) {
    await editTx(
      saleContract.setLimits,
      [submitedData.minUserDepositAmount, submitedData.maxUserDepositAmount],
      {
        successMessage: `${isChanged(['minUserDepositAmount']) && 'Min. deposit successfuly updated.'} 
        ${isChanged(['maxUserDepositAmount']) && 'Max. deposit successfuly updated.'}`,
        errorMessage: `${isChanged(['minUserDepositAmount']) && 'Min. deposit failed to update.'} 
        ${isChanged(['maxUserDepositAmount']) && 'Max. deposit failed to updated.'}`,
      },
      onSuccess,
      onFaliure,
    );
  }
  //Token price
  if (isChanged(['tokenPrice'])) {
    await editTx(
      saleContract.setSalePrice,
      [submitedData.tokenPrice],
      { successMessage: 'Token price successfuly updated.', errorMessage: 'Token price failed to update.' },
      onSuccess,
      onFaliure,
    );
  }

  //--------------------------Project-details--------------------------
  //Project icon
  if (isChanged(['imageUrl'])) {
    //?? - not sure which contract method is this
    console.log('image changed');
  }
  //Web
  if (isChanged(['webLink'])) {
    //?? - not sure which contract method is this
    console.log('web changed');
  }
  //Twitter
  if (isChanged(['twitterLink'])) {
    //?? - not sure which contract method is this
    console.log('twitter changed');
  }
  //Telegram
  if (isChanged(['telegramLink'])) {
    //?? - not sure which contract method is this
    console.log('telegram changed');
  }

  //--------------------------Token-details--------------------------
  //Vesting start date / Vesting end date
  if (isChanged(['vestingStartDate', 'vestingEndDate'])) {
    await editTx(
      saleContract.updateVestingConfig,
      [{ startTime: submitedData.vestingStartDate.valueOf(), endTime: submitedData.vestingEndDate.valueOf() }],
      {
        successMessage: `${isChanged(['minUserDepositAmount']) && 'Min. vesting successfuly updated.'} 
        ${isChanged(['maxUserDepositAmount']) && 'Max. vesting successfuly updated.'}`,
        errorMessage: `${isChanged(['minUserDepositAmount']) && 'Min. vesting failed to update.'} 
        ${isChanged(['maxUserDepositAmount']) && 'Max. vesting failed to updated.'}`,
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
        successMessage: `${isChanged(['tokenId']) && 'Token ID successfuly updated.'} 
        ${isChanged(['decimals']) && 'Decimals successfuly updated.'}
        ${isChanged(['walletAddress']) && 'Address successfuly updated.'}`,
        errorMessage: `${isChanged(['tokenId']) && 'Token ID failed to update.'} 
        ${isChanged(['decimals']) && 'Decimals failed to updated.'}
        ${isChanged(['walletAddress']) && 'Address successfuly updated.'}`,
      },
      onSuccess,
      onFaliure,
    );
  }

  //--------------------------Project description--------------------------
  //Short description
  if (isChanged(['shortDescription'])) {
    //?? - not sure which contract method is this
    console.log('short description changed');
  }
  //Description
  if (isChanged(['description'])) {
    //?? - not sure which contract method is this
    console.log('description changed');
  }
};

export const convertToProjectType = (project?: ProjectSales): ProjectType | undefined => {
  if (project?.sales[0]) {
    const {
      id,
      salePrice,
      startDate,
      endDate,
      whitelisted,
      featured,
      metadataURI,
      minUserDepositAmount,
      maxUserDepositAmount,
      totalDepositAmount,
      currentDepositAmount,
      vestingStartDate,
      vestingEndDate,
    } = project.sales[0];
    return {
      id: parseInt(id),
      status: getStatus(startDate, endDate),
      access: whitelisted ? 'whitelist' : 'public',
      featured,
      starts: new Date(parseInt(startDate)),
      ends: new Date(parseInt(endDate)),
      minUserDepositAmount,
      maxUserDepositAmount,
      //TODO-form
      raiseAmountTotal: '10000',
      tokenPrice: salePrice,
      //TODO-form
      tokenValue: 100,
      vestingStartDate: new Date(parseInt(vestingStartDate)),
      vestingEndDate: new Date(parseInt(vestingEndDate)),
      //TODO-?
      minSwapLevel: 1,
      //TODO-form
      tokenId: 505,
      //TODO-form
      walletAddress: 'placeholder',
      //TODO-form
      decimals: 18,
      //TODO-metadata fields
      title: 'placeholder',
      webLink: 'placeholder',
      twitterLink: 'placeholder',
      telegramLink: 'placeholder',
      shortDescription: 'placeholder',
      description: 'placeholder',
      imageUrl: undefined,
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
