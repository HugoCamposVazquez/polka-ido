import ProgressBar from '@ramonak/react-progress-bar/dist';
import { useWeb3React } from '@web3-react/core';
import { format, fromUnixTime, getUnixTime } from 'date-fns';
import { BigNumber } from 'ethers';
import React, { useCallback, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import projectCardBackground from '../../assets/project_card_background.png';
import ImgLoading from '../../assets/ryu_logo_animation.gif';
import telegramIcon from '../../assets/telegram_icon.svg';
import twitterIcon from '../../assets/twitter_icon.svg';
import webIcon from '../../assets/web_icon.svg';
import { config } from '../../config';
import { useSingleProject } from '../../hooks/apollo/useSingleProject';
import { useReadIPFS } from '../../hooks/ipfs/useReadIPFS';
import { useStatemintToken } from '../../hooks/polkadot/useStatemintToken';
import { useSaleContract } from '../../hooks/web3/contract/useSaleContract';
import { MainButton } from '../../shared/gui/MainButton';
import { Footer } from '../../shared/insets/user/Footer';
import { openClaimTokensModal } from '../../shared/modals/modals';
import { ProjectDetailsSectionLoading } from '../../shared/ProjectDetailsSectionLoading';
import { ExternalLink } from '../../shared/wrappers/ExternalLink';
import { ProjectSaleStatus } from '../../types/enums/ProjectStatus';
import { ProjectMetadata } from '../../types/ProjectType';
import { sideColor3, sideColor6, sideColor8 } from '../../utils/colorsUtil';
import { cs } from '../../utils/css';
import { getIPFSResolvedLink, getPercentage, getTokenPrice } from '../../utils/data';
import { getTimeDiff } from '../../utils/date';
import { formatWei } from '../../utils/numModifiyngFuncs';
import { Allocations, TotalAllocation } from './Allocations';
import * as styles from './ProjectDetailsPage.styles';
import { TokenDetails } from './TokenDetails';

const iconMap = new Map([
  ['telegramLink', telegramIcon],
  ['twitterLink', twitterIcon],
  ['webLink', webIcon],
]);

export const ProjectDetailsPage = () => {
  const navigation = useHistory();
  const { id }: { id: string } = useParams();
  const saleContract = useSaleContract(id);
  const { account } = useWeb3React();

  const { data } = useSingleProject(id);
  const { data: metadata } = useReadIPFS<ProjectMetadata>(data?.metadataURI);
  const { data: tokenData } = useStatemintToken(data?.token.id);

  const projectStatus = useMemo((): string | undefined => {
    if (!data) {
      return;
    }

    const timeNow = getUnixTime(new Date());
    const upcomingDate = timeNow < +data?.startDate;
    if (upcomingDate) {
      return ProjectSaleStatus.UPCOMING;
    }

    const isCurrentDate = timeNow > +data?.startDate && timeNow < +data?.endDate;
    if (isCurrentDate) {
      const isCapReached = BigNumber.from(data?.currentDepositAmount).gte(data?.cap);
      if (isCapReached) {
        return ProjectSaleStatus.ENDED;
      }
      return ProjectSaleStatus.IN_PROGRESS;
    }

    const isFinishedDate = timeNow > +data?.endDate;
    if (isFinishedDate) {
      return ProjectSaleStatus.ENDED;
    }
  }, [data]);

  const filledAllocationPercentage = useMemo((): number => {
    if (data) {
      const { currentDepositAmount, cap } = data;
      return getPercentage(currentDepositAmount, cap);
    }
    return 0;
  }, [data]);

  const tokenPrice = useMemo((): string => {
    if (data && tokenData) {
      return getTokenPrice(data.salePrice, tokenData.decimals);
    }
    return '0';
  }, [data, tokenData]);

  const onClaimClick = useCallback((): void => {
    if (account && saleContract) {
      openClaimTokensModal(id, saleContract, account, data?.token.id);
    }
  }, [id, saleContract, account, data]);

  const vestingDuration = useMemo(() => {
    if (data) {
      const { vestingStartDate, vestingEndDate } = data;
      if (!vestingStartDate || !vestingEndDate) {
        return 'N/A';
      }
      return `${getTimeDiff(vestingEndDate, vestingStartDate)} days`;
    } else {
      return 'N/A';
    }
  }, [data]);

  return (
    <div>
      <div className={styles.imageParentContainerClassName}>
        <div className={styles.customTopRightObjectClassName} style={styles.topLeftBottomRightNotch} />
        <div className={styles.customBottomLeftObjectClassName} style={styles.topLeftBottomRightNotch} />
        <div className={styles.imageContainerClassName}>
          <img className={styles.imageStyle} src={projectCardBackground} />
        </div>

        <div className={styles.projectContainerStyle}>
          <div style={{ flex: 0.5 }}>
            <div className={styles.projectImageContainerClassName}>
              <div style={styles.topRightBottomLeftNotch} className={styles.projectImageBackgroundStyle}>
                <img
                  className={styles.projectIconClassName}
                  src={metadata?.imageUrl ? getIPFSResolvedLink(metadata.imageUrl) : ImgLoading}
                />
              </div>
              <div style={{ marginLeft: '1.5rem' }}>
                <div className={styles.projectStatusBackgroundStyle}>
                  <div style={styles.projectStatusTextStyle}>{projectStatus}</div>
                </div>
                <div className={styles.projectNameTextStyle}>{metadata?.title}</div>
              </div>
            </div>
            <div className={styles.shortDescriptionContainerClassName}>
              <div style={styles.shortDescriptionTextStyle}>Short description</div>
              <div className={styles.shortDescriptionTextClassName}>{metadata?.shortDescription}</div>
              <div style={{ marginTop: '2.25rem', display: 'flex' }}>
                {metadata &&
                  ['webLink', 'twitterLink', 'telegramLink'].map((name, index) => (
                    <ExternalLink href={metadata[name as keyof ProjectMetadata] || ''} key={name}>
                      <img
                        style={{ marginLeft: index === 0 ? '0' : '1rem', cursor: 'pointer' }}
                        src={iconMap.get(name) || ''}
                      />
                    </ExternalLink>
                  ))}
              </div>
            </div>
          </div>
          <div style={{ flex: 0.5 }}>
            <div className={styles.projectContainerRightStyle}>
              <div style={styles.descriptionParentStyle}>
                <div className={styles.descriptionTextStyle}>Starts</div>
                <div className={styles.contentTextStyle}>{data && format(fromUnixTime(+data?.startDate), 'PPpp')}</div>
              </div>
              <div style={styles.descriptionParentStyle}>
                <div className={styles.descriptionTextStyle}>Ends</div>
                <div className={styles.contentTextStyle}>{data && format(fromUnixTime(+data?.endDate), 'PPpp')}</div>
              </div>
              <div style={styles.descriptionParentStyle}>
                <div className={styles.descriptionTextStyle}>Access</div>
                <div className={styles.contentTextStyle}>{data && data?.whitelisted ? 'Whitelisted' : 'Public'}</div>
              </div>
              <div style={styles.descriptionParentStyle}>
                <div className={styles.descriptionTextStyle}>Allocation</div>
                <div className={styles.contentTextStyle}>{`${data && formatWei(data?.cap)} ${config.CURRENCY}`}</div>
              </div>
              <div style={styles.descriptionParentStyle}>
                <div className={styles.descriptionTextStyle}>Min. deposit</div>
                <div className={styles.contentTextStyle}>{`${data && formatWei(data?.minUserDepositAmount)} ${
                  config.CURRENCY
                }`}</div>
              </div>
              <div style={styles.descriptionParentStyle}>
                <div className={styles.descriptionTextStyle}>Max. deposit</div>
                <div className={styles.contentTextStyle}>{`${data && formatWei(data?.maxUserDepositAmount)} ${
                  config.CURRENCY
                }`}</div>
              </div>
              {account && data && (
                <TotalAllocation
                  account={account}
                  projectId={data?.id}
                  tokenPrice={tokenPrice}
                  tokenDecimals={tokenData?.decimals}
                />
              )}

              <div style={{ marginTop: '2.25rem' }}>
                <div className={styles.valueDescTextStyle}>
                  {data && `${formatWei(data?.currentDepositAmount)}/${formatWei(data?.cap)} ${config.CURRENCY}`}
                </div>
                <div style={{ marginTop: '0.75rem' }}>
                  <ProgressBar
                    completed={filledAllocationPercentage}
                    isLabelVisible={false}
                    height={'0.38rem'}
                    bgColor={sideColor3}
                    baseBgColor={sideColor6}
                    borderRadius={'0rem'}
                  />
                </div>
                <div style={styles.smallTextStyle}>
                  1 {tokenData?.symbol || 'token'} = {tokenPrice} {config.CURRENCY}
                </div>
              </div>
            </div>

            <div className={styles.projectDetailsBtnsParentStyle}>
              <MainButton title="CLAIM TOKENS" type={'bordered'} onClick={onClaimClick} />
              <MainButton
                title="JOIN"
                type={'fill'}
                onClick={() => navigation.push(`/project/${id}/join`)}
                disabled={projectStatus === 'Ended' || projectStatus === 'Upcoming'}
              />
            </div>
          </div>
        </div>
      </div>
      {account && data && (
        <Allocations
          account={account}
          projectId={data?.id}
          tokenPrice={tokenPrice}
          tokenDecimals={tokenData?.decimals}
        />
      )}
      <div className={styles.projectDetailsRootContainerClassName}>
        <div className={styles.subtitleStyle}>Project details</div>
        <div className={styles.projectDetailsContainerClassName}>
          <div
            style={cs(
              { flex: 0.5, margin: '0 1.5rem', backgroundColor: `${sideColor8}` },
              styles.topRightBottomLeftNotch,
            )}>
            <div style={{ padding: '1.5rem' }}>
              <div style={styles.projectDetailsSubtitleStyle}>RELEASE SCHEDULE</div>
              <div style={{ marginTop: '2.25rem' }}>
                <div style={styles.projectDetailsItemStyle}>
                  <div className={styles.descriptionTextStyle}>Vesting start time</div>
                  <div className={styles.content3TextStyle}>
                    {data ? format(fromUnixTime(+data?.vestingStartDate), 'PPpp') : 'N/A'}
                  </div>
                </div>
                <div style={styles.projectDetailsItemStyle}>
                  <div className={styles.descriptionTextStyle}>Vesting duration</div>
                  <div className={styles.content3TextStyle}>{vestingDuration}</div>
                </div>
              </div>
            </div>
          </div>

          {data?.token.id ? <TokenDetails assetId={data?.token.id} /> : <ProjectDetailsSectionLoading />}
        </div>
      </div>
      <div className={styles.aboutTheProjectContainerClassName}>
        <div className={styles.subtitleStyle}>About the project</div>
        <div style={styles.aboutTextStyle}>{metadata?.description}</div>
      </div>
      <Footer />
    </div>
  );
};
