import ProgressBar from '@ramonak/react-progress-bar/dist';
import { format, fromUnixTime, getUnixTime } from 'date-fns';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import projectCardBackground from '../assets/project_card_background.png';
import telegramIcon from '../assets/telegram_icon.svg';
import twitterIcon from '../assets/twitter_icon.svg';
import webIcon from '../assets/web_icon.svg';
import { useSingleProject } from '../hooks/apollo/useSingleProject';
import { MainButton } from '../shared/gui/MainButton';
import { Footer } from '../shared/insets/user/Footer';
import { LoadingData } from '../shared/LoadingData';
import { openClaimTokensModal } from '../shared/modals/modals';
import { sideColor3, sideColor6, sideColor8 } from '../utils/colorsUtil';
import { cs } from '../utils/css';
import { numberWithDots } from '../utils/numModifiyngFuncs';
import * as styles from './ProjectDetailsPage.styles';

export const ProjectDetailsPage = () => {
  const navigation = useHistory();
  const { id }: { id: string } = useParams();

  const { data, loading } = useSingleProject(id);

  const projectStatus = (): string => {
    if (data?.sales[0] && getUnixTime(new Date()) < +data?.sales[0].startDate) {
      return 'Starts';
    } else if (
      data?.sales[0] &&
      getUnixTime(new Date()) > +data?.sales[0].startDate &&
      getUnixTime(new Date()) < +data?.sales[0].endDate
    ) {
      return 'In Progress';
    } else return 'Ended';
  };

  if (loading) {
    return <LoadingData />;
  }

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
                <img className={styles.projectIconClassName} src="" /> {/* data dosen't exist yet */}
              </div>
              <div style={{ marginLeft: '1.5rem' }}>
                <div className={styles.projectStatusBackgroundStyle}>
                  <div style={styles.projectStatusTextStyle}>{projectStatus()}</div>
                </div>
                <div className={styles.projectNameTextStyle}>ProjectName Data</div>
              </div>
            </div>
            <div className={styles.shortDescriptionContainerClassName}>
              <div style={styles.shortDescriptionTextStyle}>Short description</div>
              <div className={styles.shortDescriptionTextClassName}>description data</div>
              <div style={{ marginTop: '2.25rem', display: 'flex' }}>
                <div style={styles.etherScanBtnStyle}>Etherscan</div>

                <img style={{ marginLeft: '1.5rem', cursor: 'pointer' }} src={webIcon} />
                <img style={{ marginLeft: '1rem', cursor: 'pointer' }} src={twitterIcon} />
                <img style={{ marginLeft: '1rem', cursor: 'pointer' }} src={telegramIcon} />
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
                <div className={styles.descriptionTextStyle}>Allocation</div>
                <div className={styles.contentTextStyle}>{`${
                  data?.sales[0] && numberWithDots(data?.sales[0].maxDepositAmount)
                } ETH`}</div>
              </div>
              <div style={styles.descriptionParentStyle}>
                <div className={styles.descriptionTextStyle}>Access</div>
                <div className={styles.contentTextStyle}>
                  {data?.sales[0] && data?.sales[0].whitelisted ? 'Whitelisted' : 'Private'}
                </div>
              </div>
              <div style={styles.descriptionParentStyle}>
                <div className={styles.descriptionTextStyle}>Token price</div>
                <div className={styles.contentTextStyle}>{`${data?.sales[0] && data?.sales[0].salePrice} ETH`}</div>
              </div>
              <div style={styles.descriptionParentStyle}>
                <div className={styles.description2TextStyle}>Your allocation</div>
                <div className={styles.content2TextStyle}>{'0.02 ETH > 349857 TKN'}</div>
              </div>

              <div style={{ marginTop: '2.25rem' }}>
                <div className={styles.valueDescTextStyle}>
                  {data?.sales[0] && `${data?.sales[0].currentDepositAmount}/${data?.sales[0].maxDepositAmount} USDT`}
                </div>
                <div style={{ marginTop: '0.75rem' }}>
                  <ProgressBar
                    completed={
                      (Number(data?.sales[0] && data?.sales[0].currentDepositAmount) /
                        Number(data?.sales[0] && data?.sales[0].maxDepositAmount)) *
                      100
                    }
                    isLabelVisible={false}
                    height={'0.38rem'}
                    bgColor={sideColor3}
                    baseBgColor={sideColor6}
                    borderRadius={'0rem'}
                  />
                </div>
                <div style={styles.smallTextStyle}>1 TKN = 0.0002 USDT</div>
              </div>
            </div>

            <div className={styles.projectDetailsBtnsParentStyle}>
              <MainButton
                title="CLAIM TOKENS"
                type={'bordered'}
                onClick={() => {
                  openClaimTokensModal('test');
                }}
              />
              <MainButton
                title="JOIN"
                type={'fill'}
                onClick={() => {
                  navigation.push(`/project/${id}/join`);
                }}
              />
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
              <div style={styles.projectDetailsSubtitleStyle}>PROJECT</div>
              <div style={{ marginTop: '2.25rem' }}>
                <div style={styles.projectDetailsItemStyle}>
                  <div className={styles.descriptionTextStyle}>Token distribution</div>
                  <div className={styles.content3TextStyle}>June 21, 2021 4:00 PM</div>
                </div>
                <div style={styles.projectDetailsItemStyle}>
                  <div className={styles.descriptionTextStyle}>Min. Allocation</div>
                  <div className={styles.content3TextStyle}>0</div>
                </div>
                <div style={styles.projectDetailsItemStyle}>
                  <div className={styles.descriptionTextStyle}>Max. Allocation</div>
                  <div className={styles.content3TextStyle}>0.02 ETH</div>
                </div>
                <div style={styles.projectDetailsItemStyle}>
                  <div className={styles.descriptionTextStyle}>Min. swap level</div>
                  <div className={styles.content3TextStyle}>2 ETH</div>
                </div>
                <div style={{ display: 'flex', padding: '0.75rem 0' }}>
                  <div className={styles.descriptionTextStyle}>Whitelist status</div>
                  <div className={styles.content3TextStyle}>Whitelisted</div>
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
                  <div className={styles.descriptionTextStyle}>Decimals</div>
                  <div className={styles.content3TextStyle}>24</div>
                </div>
                <div style={styles.projectDetailsItemStyle}>
                  <div className={styles.descriptionTextStyle}>Address</div>
                  <div className={styles.content3TextStyle}>0x19273h348fo837ffo38974fh</div>
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
        <div style={styles.aboutTextStyle}>
          Physiological respiration involves the mechanisms that ensure that the composition of the functional residual
          capacity is kept constant, and equilibrates with the gases dissolved in the pulmonary capillary blood, and
          thus throughout the body. Thus, in precise usage, the words breathing and ventilation are hyponyms, not
          synonyms, of respiration; but this prescription is not consistently followed, even by most health care
          providers, because the term respiratory rate (RR) is a well-established term in health care, even though it
          would need to be consistently replaced with ventilation rate if the precise usage were to be followed.
        </div>
      </div>
      <Footer />
    </div>
  );
};
