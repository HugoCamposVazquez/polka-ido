import { SaleContract } from '@nodefactoryio/ryu-contracts/typechain/SaleContract';
import ProgressBar from '@ramonak/react-progress-bar/dist';
import { useWeb3React } from '@web3-react/core';
import { format, fromUnixTime, getUnixTime } from 'date-fns';
import React, { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import projectCardBackground from '../assets/project_card_background.png';
import telegramIcon from '../assets/telegram_icon.svg';
import twitterIcon from '../assets/twitter_icon.svg';
import webIcon from '../assets/web_icon.svg';
import { useSingleProject } from '../hooks/apollo/useSingleProject';
import { useReadIPFS } from '../hooks/ipfs/useReadIPFS';
import { useSaleContract } from '../hooks/web3/contract/useSaleContract';
import { MainButton } from '../shared/gui/MainButton';
import { Footer } from '../shared/insets/user/Footer';
import { openClaimTokensModal } from '../shared/modals/modals';
import { ExternalLink } from '../shared/wrappers/ExternalLink';
import { ProjectMetadata } from '../types/ProjectType';
import { sideColor3, sideColor6, sideColor8 } from '../utils/colorsUtil';
import { cs } from '../utils/css';
import { getIPFSResolvedLink, getPercentage, getTokenPrice } from '../utils/data';
import { formatWei } from '../utils/numModifiyngFuncs';
import * as styles from './ProjectDetailsPage.styles';

export const ProjectDetailsPage = () => {
  const navigation = useHistory();
  const { id }: { id: string } = useParams();
  const saleContract = useSaleContract(id);
  const { account } = useWeb3React();

  const { data } = useSingleProject(id);
  const { data: metadata } = useReadIPFS<ProjectMetadata>(data?.sales[0].metadataURI);

  const projectStatus = useMemo((): string => {
    if (data?.sales[0] && getUnixTime(new Date()) < +data?.sales[0].startDate) {
      return 'Upcoming';
    } else if (
      data?.sales[0] &&
      getUnixTime(new Date()) > +data?.sales[0].startDate &&
      getUnixTime(new Date()) < +data?.sales[0].endDate
    ) {
      return 'In Progress';
    } else return 'Ended';
  }, [data?.sales]);

  const filledAllocationPercentage = useMemo((): string => {
    if (data?.sales[0]) {
      // TODO: should be totalDeposit instead of maxDepositAmount but not on subgraph
      const { currentDepositAmount, maxDepositAmount } = data.sales[0];
      return getPercentage(currentDepositAmount, maxDepositAmount);
    }
    return '0';
  }, [data?.sales[0]]);

  const tokenPrice = useMemo((): string => {
    if (data?.sales[0]) {
      return getTokenPrice(data.sales[0].salePrice);
    }
    return '0';
  }, [data?.sales[0]]);

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
                  src={metadata ? getIPFSResolvedLink(metadata?.imageUrl) : ''}
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
                {metadata?.etherscanLink && (
                  <ExternalLink href={metadata?.etherscanLink}>
                    <div style={styles.etherScanBtnStyle}>Etherscan</div>
                  </ExternalLink>
                )}

                {metadata?.webLink && (
                  <ExternalLink href={metadata?.webLink}>
                    <img style={{ marginLeft: '1.5rem', cursor: 'pointer' }} src={webIcon} />
                  </ExternalLink>
                )}

                {metadata?.twitterLink && (
                  <ExternalLink href={metadata?.twitterLink}>
                    <img style={{ marginLeft: '1rem', cursor: 'pointer' }} src={twitterIcon} />
                  </ExternalLink>
                )}
                {metadata?.telegramLink && (
                  <ExternalLink href={metadata?.telegramLink}>
                    <img style={{ marginLeft: '1rem', cursor: 'pointer' }} src={telegramIcon} />
                  </ExternalLink>
                )}
              </div>
            </div>
          </div>
          <div style={{ flex: 0.5 }}>
            <div className={styles.projectContainerRightStyle}>
              <div style={styles.descriptionParentStyle}>
                <div className={styles.descriptionTextStyle}>Starts</div>
                <div className={styles.contentTextStyle}>
                  {data?.sales[0] && format(fromUnixTime(+data?.sales[0].startDate), 'PPpp')}
                </div>
              </div>
              <div style={styles.descriptionParentStyle}>
                <div className={styles.descriptionTextStyle}>Ends</div>
                <div className={styles.contentTextStyle}>
                  {data?.sales[0] && format(fromUnixTime(+data?.sales[0].endDate), 'PPpp')}
                </div>
              </div>
              <div style={styles.descriptionParentStyle}>
                <div className={styles.descriptionTextStyle}>Access</div>
                <div className={styles.contentTextStyle}>
                  {data?.sales[0] && data?.sales[0].whitelisted ? 'Whitelisted' : 'Private'}
                </div>
              </div>
              <div style={styles.descriptionParentStyle}>
                <div className={styles.descriptionTextStyle}>Allocation</div>
                <div className={styles.contentTextStyle}>TODO</div>
              </div>
              <div style={styles.descriptionParentStyle}>
                <div className={styles.descriptionTextStyle}>Min. deposit</div>
                <div className={styles.contentTextStyle}>TODO</div>
              </div>
              <div style={styles.descriptionParentStyle}>
                <div className={styles.descriptionTextStyle}>Max. deposit</div>
                <div className={styles.contentTextStyle}>{`${
                  data?.sales[0] && formatWei(data?.sales[0].maxDepositAmount)
                } ETH`}</div>
              </div>
              <div style={styles.descriptionParentStyle}>
                <div className={styles.description2TextStyle}>Your allocation</div>
                <div className={styles.content2TextStyle}>TODO</div>
              </div>

              <div style={{ marginTop: '2.25rem' }}>
                <div className={styles.valueDescTextStyle}>
                  {data?.sales[0] &&
                    `${formatWei(data?.sales[0].currentDepositAmount)}/${formatWei(
                      data?.sales[0].maxDepositAmount,
                    )} USD`}
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
                <div style={styles.smallTextStyle}>1 TKN = {tokenPrice} ETH</div>
              </div>
            </div>

            <div className={styles.projectDetailsBtnsParentStyle}>
              <MainButton
                title="CLAIM TOKENS"
                type={'bordered'}
                onClick={() => {
                  if (account && saleContract) openClaimTokensModal(id, saleContract, account);
                }}
              />
              <MainButton title="JOIN" type={'fill'} onClick={() => navigation.push(`/project/${id}/join`)} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.allocationsContainerClassName}>
        <div className={styles.subtitleStyle}>Allocations</div>
        <div style={{ marginTop: '1.5rem', display: 'flex' }}>
          <div style={{ flex: 0.25 }} className={styles.allocationsTitleStyle}>
            Purchased
          </div>
          <div style={{ flex: 0.25 }} className={styles.allocationsTitleStyle}>
            Amount
          </div>
          <div style={{ flex: 0.25 }} className={styles.allocationsTitleStyle}>
            Dollars
          </div>
          <div style={{ flex: 0.25 }} className={styles.allocationsTitleStyle}>
            Tokens
          </div>
        </div>
        <div style={styles.projectDetailsItemStyle}>
          <div style={{ flex: 0.25 }} className={styles.allocationsItemNormalStyle}>
            6/21/19
          </div>
          <div style={{ flex: 0.25 }} className={styles.allocationsItemNormalStyle}>
            0.28 ETH
          </div>
          <div style={{ flex: 0.25 }} className={styles.allocationsItemNormalStyle}>
            1,239 USDT
          </div>
          <div style={{ flex: 0.25 }} className={styles.allocationsItemNormalStyle}>
            304,985 TKN
          </div>
        </div>
        <div style={styles.projectDetailsItemStyle}>
          <div style={{ flex: 0.25 }} className={styles.allocationsItemNormalStyle}>
            6/21/19
          </div>
          <div style={{ flex: 0.25 }} className={styles.allocationsItemNormalStyle}>
            0.012 ETH
          </div>
          <div style={{ flex: 0.25 }} className={styles.allocationsItemNormalStyle}>
            190 USDT
          </div>
          <div style={{ flex: 0.25 }} className={styles.allocationsItemNormalStyle}>
            23,498 TKN
          </div>
        </div>
        <div style={{ padding: '1.5rem 0', alignItems: 'center', display: 'flex' }}>
          <div style={{ flex: 0.25 }} className={styles.allocationsTotalTextStyle}>
            Total
          </div>
          <div style={{ flex: 0.25 }} className={styles.allocationsItemBoldStyle}>
            0.292 ETH
          </div>
          <div style={{ flex: 0.25 }} className={styles.allocationsItemBoldStyle}>
            1,429 USDT
          </div>
          <div style={{ flex: 0.25 }} className={styles.allocationsItemBoldStyle}>
            328,483 TKN
          </div>
        </div>
      </div>
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
                  <div className={styles.descriptionTextStyle}>Vesting duration</div>
                  <div className={styles.content3TextStyle}>TODO</div>
                </div>
                <div style={styles.projectDetailsItemStyle}>
                  <div className={styles.descriptionTextStyle}>Vesting start time</div>
                  <div className={styles.content3TextStyle}>TODO</div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={cs(
              { flex: 0.5, margin: '0 1.5rem', backgroundColor: `${sideColor8}` },
              styles.topLeftBottomRightNotch,
            )}
            className={styles.projectDetailsTokenClassName}>
            <div style={{ padding: '1.5rem' }}>
              <div style={styles.projectDetailsSubtitleStyle}>TOKEN</div>
              <div style={{ marginTop: '2.25rem' }}>
                <div style={styles.projectDetailsItemStyle}>
                  <div className={styles.descriptionTextStyle}>Name</div>
                  <div className={styles.content3TextStyle}>takename</div>
                </div>
                <div style={styles.projectDetailsItemStyle}>
                  <div className={styles.descriptionTextStyle}>Symbol</div>
                  <div className={styles.content3TextStyle}>TKN</div>
                </div>
                <div style={styles.projectDetailsItemStyle}>
                  <div className={styles.descriptionTextStyle}>Statemint ID</div>
                  <div className={styles.content3TextStyle}>12390</div>
                </div>
                <div style={{ display: 'flex', padding: '0.75rem 0' }}>
                  <div className={styles.descriptionTextStyle}>Total supply</div>
                  <div className={styles.content3TextStyle}>10,000,000</div>
                </div>
              </div>
            </div>
          </div>
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
