import ProgressBar from '@ramonak/react-progress-bar/dist';
import React from 'react';

import { MainButton } from '../shared/gui/MainButton';
import { sideColor, sideColor3, sideColor4, sideColor5, sideColor6, sideColor7, sideColor8 } from '../utils/colorsUtil';
import { cs, styled } from '../utils/css';

const imageParentContainerClassName = styled.cssClassName`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 7.5rem;
  margin-right: 7.5rem;
  margin-top: 11.25rem;

  @media (max-width: 830px) {
    margin-left: 0rem;
    margin-right: 0rem;
  }
`;
const customTopRightObjectClassName = styled.cssClassName`
  position: absolute;
  height: 7.5rem;
  width: 7.5rem;
  background-color: ${sideColor3};
  top: 0;
  right: 0;

  @media (max-width: 830px) {
    display: none;
  }
`;

const customBottomLeftObjectClassName = styled.cssClassName`
  position: absolute;
  height: 7.5rem;
  width: 7.5rem;
  background-color: ${sideColor3};
  bottom: 0;
  left: 0;

  @media (max-width: 830px) {
    display: none;
  }
`;

const topLeftBottomRightNotch = styled.cssStyle`
  --notchSize: 1.63rem;

  clip-path: polygon(
    0% var(--notchSize),
    var(--notchSize) 0%,
    calc(100%) 0%,
    100% var(--notchSize),
    100% calc(100% - var(--notchSize)),
    calc(100% - var(--notchSize)) 100%,
    0% 100%,
    0% calc(100% - var(--notchSize))
  );
`;
const imageContainerClassName = styled.cssClassName`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  left: 1.25rem;
  bottom: 1.25rem;

  @media (max-width: 830px) {
    top: 0rem;
    right: 0rem;
    left: 0rem;
    bottom: 0rem;
  }
`;
const imageStyle = styled.cssClassName`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const projectStatusTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 0.88rem;
  color: ${sideColor4};
`;

const projectNameTextStyle = styled.cssClassName`
  font-family: Odibee Sans;
  font-weight: 400;
  font-size: 4rem;
  margin-top: 0.75rem;

  @media (max-width: 830px) {
    font-size: 2.25rem;
  }
`;

const shortDescriptionTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 1rem;
  color: ${sideColor3};
`;

const descriptionTextStyle = styled.cssClassName`
  flex: 1;
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 1rem;
  color: ${sideColor};

  @media (max-width: 830px) {
    font-size: 0.75rem;
  }
`;

const description2TextStyle = styled.cssClassName`
  flex: 1;
  font-family: Titillium Web;
  font-weight: 600;
  font-size: 1rem;
  color: ${sideColor5};

  @media (max-width: 830px) {
    font-size: 0.75rem;
  }
`;

const contentTextStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 1.25rem;
  color: ${sideColor3};

  @media (max-width: 830px) {
    font-size: 0.88rem;
  }
`;

const content2TextStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 1.25rem;
  color: ${sideColor5};

  @media (max-width: 830px) {
    font-size: 0.88rem;
  }
`;

const content3TextStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-weight: 600;
  font-size: 1rem;
  color: ${sideColor3};

  @media (max-width: 830px) {
    font-size: 0.88rem;
  }
`;

const projectContainerStyle = styled.cssClassName`
  height: 100%;
  margin: 1.25rem;
  z-index: 1000;
  display: flex;

  @media (max-width: 1200px) {
    flex-direction: column;
  }

  @media (max-width: 830px) {
    margin: 0rem;
  }
`;

const descriptionParentStyle = styled.cssStyle`
  border-bottom: 0.06rem solid ${sideColor6};
  padding-bottom: 0.5rem;
  display: flex;
  margin-top: 0.5rem;
  align-items: center;
`;

const smallTextStyle = styled.cssStyle`
  margin-top: 0.25rem;
  font-size: 0.88rem;
  color: ${sideColor6};
  font-family: Titillium Web;
  font-weight: 400;
`;

const valueDescTextStyle = styled.cssClassName`
  font-family: Odibee Sans;
  font-weight: 400;
  font-size: 2.25rem;
  color: ${sideColor3};

  @media (max-width: 830px) {
    font-size: 1.63rem;
  }
`;
const projectImageBackgroundStyle = styled.cssClassName`
  height: 7.5rem;
  width: 7.5rem;
  background-color: ${sideColor4};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 830px) {
    height: 5rem;
    width: 5rem;
  }
`;

const projectStatusBackgroundStyle = styled.cssClassName`
  height: 1.75rem;
  width: 6.75rem;
  background-color: ${sideColor7};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 830px) {
    height: 1.56rem;
    width: 6.13rem;
  }
`;

const projectDetailsBtnsParentStyle = styled.cssClassName`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  margin-right: 2.25rem;
  margin-left: 2.25rem;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 830px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

const allocationsTitleStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 1.25rem;
  color: ${sideColor5};

  @media (max-width: 830px) {
    font-size: 0.88rem;
  }
`;

const allocationsItemNormalStyle = styled.cssClassName`
  font-familiy: Titillium Web;
  font-weight: 400;
  font-size: 1rem;
  color: ${sideColor};

  @media (max-width: 830px) {
    font-size: 0.75rem;
  }
`;

const allocationsItemBoldStyle = styled.cssClassName`
  font-familiy: Titillium Web;
  font-weight: 700;
  font-size: 1rem;
  color: ${sideColor5};

  @media (max-width: 830px) {
    font-size: 0.75rem;
  }
`;

const allocationsTotalTextStyle = styled.cssClassName`
  font-familiy: Titillium Web;
  font-weight: 400;
  font-size: 1.5rem;
  color: ${sideColor};

  @media (max-width: 830px) {
    font-size: 0.88rem;
  }
`;
const subtitleStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-weight: 600;
  font-size: 2.25rem;

  @media (max-width: 830px) {
    font-size: 1.63rem;
  }
`;

const projectDetailsSubtitleStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 1.5rem;
`;

const projectDetailsItemStyle = styled.cssStyle`
  display: flex;
  padding: 0.75rem 0;
  border-bottom: 0.06rem solid ${sideColor};
`;

const etherScanBtnStyle = styled.cssStyle`
  padding: 0.25rem 1.5rem;
  border: 0.06rem solid ${sideColor5};
  cursor: pointer;
`;

const aboutTextStyle = styled.cssStyle`
  margin-top: 1.5rem;
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 1rem;
  color: ${sideColor};
`;

const projectContainerRightStyle = styled.cssClassName`
  margin-top: 1.75rem;
  margin-right: 2.25rem;

  @media (max-width: 1200px) {
    margin-left: 2.25rem;
  }

  @media (max-width: 830px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

const shortDescriptionTextClassName = styled.cssClassName`
  margin-top: 0.75rem;
  max-width: 25rem;

  font-family: Titillium Web;
  font-weight: 400;
  font-size: 1rem;
  color: ${sideColor};

  @media (max-width: 1200px) {
    max-width: initial;
  }
`;

const projectDetailsContainerClassName = styled.cssClassName`
  display: flex;
  margin: 0 -1.5rem;
  margin-top: 2.25rem;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const projectDetailsTokenClassName = styled.cssClassName`
  margin-top: 0rem !important;

  @media (max-width: 1200px) {
    margin-top: 2.25rem !important;
  }
`;

const projectImageContainerClassName = styled.cssClassName`
  margin-top: 2.25rem;
  margin-left: 2.25rem;
  margin-right: 2.25rem;
  display: flex;

  @media (max-width: 830px) {
    margin-top: 1.5rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

const shortDescriptionContainerClassName = styled.cssClassName`
  margin-top: 3.25rem;
  margin-left: 2.25rem;
  margin-right: 2.25rem;

  @media (max-width: 830px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-top: 2.25rem;
  }
`;

const projectIconClassName = styled.cssClassName`
  height: 4.5rem;
  width: 4.5rem;

  @media (max-width: 830px) {
    height: 3rem;
    width: 3rem;
  }
`;

const allocationsContainerClassName = styled.cssClassName`
  margin: 7.5rem;
  max-width: 43.75rem;

  @media (max-width: 830px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-top: 4.5rem;
    margin-bottom: 4.5rem;
  }
`;

const projectDetailsRootContainerClassName = styled.cssClassName`
  margin: 7.5rem;

  @media (max-width: 830px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-top: 4.5rem;
    margin-bottom: 4.5rem;
  }
`;

const aboutTheProjectContainerClassName = styled.cssClassName`
  margin: 7.5rem;
  margin-bottom: 0rem;

  @media (max-width: 830px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-top: 4.5rem;
  }
`;

const topRightBottomLeftNotch = styled.cssStyle`
  --notchSize: 1.63rem;

  clip-path: polygon(
    0% 0%,
    var(--notchSize) 0%,
    calc(100% - var(--notchSize)) 0%,
    100% var(--notchSize),
    100% calc(100%),
    calc(100% - var(--notchSize)) 100%,
    var(--notchSize) 100%,
    0% calc(100% - var(--notchSize))
  );
`;

export const ProjectDetailsPage = () => {
  return (
    <div>
      <div className={imageParentContainerClassName}>
        <div className={customTopRightObjectClassName} style={topLeftBottomRightNotch} />
        <div className={customBottomLeftObjectClassName} style={topLeftBottomRightNotch} />
        <div className={imageContainerClassName}>
          <img className={imageStyle} src={process.env.PUBLIC_URL + '/project_card_background.png'} />
        </div>

        <div className={projectContainerStyle}>
          <div style={{ flex: 0.5 }}>
            <div className={projectImageContainerClassName}>
              <div style={topRightBottomLeftNotch} className={projectImageBackgroundStyle}>
                <img className={projectIconClassName} src={process.env.PUBLIC_URL + '/horse_image.png'} />
              </div>
              <div style={{ marginLeft: '1.5rem' }}>
                <div className={projectStatusBackgroundStyle}>
                  <div style={projectStatusTextStyle}>Ended</div>
                </div>
                <div className={projectNameTextStyle}>My project 1</div>
              </div>
            </div>
            <div className={shortDescriptionContainerClassName}>
              <div style={shortDescriptionTextStyle}>Short description</div>
              <div className={shortDescriptionTextClassName}>
                For athletes, high altitude produces two contradictory effects on performance. For explosive events
                (sprints up to 400 metres, long jump, triple jump)
              </div>
              <div style={{ marginTop: '2.25rem', display: 'flex' }}>
                <div style={etherScanBtnStyle}>Etherscan</div>

                <img
                  style={{ marginLeft: '1.5rem', cursor: 'pointer' }}
                  src={process.env.PUBLIC_URL + '/web_icon.svg'}
                />
                <img
                  style={{ marginLeft: '1rem', cursor: 'pointer' }}
                  src={process.env.PUBLIC_URL + '/twitter_icon.svg'}
                />
                <img
                  style={{ marginLeft: '1rem', cursor: 'pointer' }}
                  src={process.env.PUBLIC_URL + '/telegram_icon.svg'}
                />
              </div>
            </div>
          </div>
          <div style={{ flex: 0.5 }}>
            <div className={projectContainerRightStyle}>
              <div style={descriptionParentStyle}>
                <div className={descriptionTextStyle}>Starts</div>
                <div className={contentTextStyle}>May 20, 2021 4:00 PM</div>
              </div>
              <div style={descriptionParentStyle}>
                <div className={descriptionTextStyle}>Ends</div>
                <div className={contentTextStyle}>June 20, 2021 4:00 PM</div>
              </div>
              <div style={descriptionParentStyle}>
                <div className={descriptionTextStyle}>Allocation</div>
                <div className={contentTextStyle}>10,000,000</div>
              </div>
              <div style={descriptionParentStyle}>
                <div className={descriptionTextStyle}>Access</div>
                <div className={contentTextStyle}>Whitelist</div>
              </div>
              <div style={descriptionParentStyle}>
                <div className={descriptionTextStyle}>Token price</div>
                <div className={contentTextStyle}>0.022ETH</div>
              </div>
              <div style={descriptionParentStyle}>
                <div className={description2TextStyle}>Your allocation</div>
                <div className={content2TextStyle}>{'0.02 ETH > 349857 TKN'}</div>
              </div>

              <div style={{ marginTop: '2.25rem' }}>
                <div className={valueDescTextStyle}>7273/10000 USDT</div>
                <div style={{ marginTop: '0.75rem' }}>
                  <ProgressBar
                    completed={(7273 / 10000) * 100}
                    isLabelVisible={false}
                    height={'0.38rem'}
                    bgColor={sideColor3}
                    baseBgColor={sideColor6}
                    borderRadius={'0rem'}
                  />
                </div>
                <div style={smallTextStyle}>1 TKN = 0.0002 USDT</div>
              </div>
            </div>

            <div className={projectDetailsBtnsParentStyle}>
              <MainButton title="CLAIM TOKENS" type={'bordered'} onClick={() => {}} />
              <MainButton title="JOIN" type={'fill'} onClick={() => {}} />
            </div>
          </div>
        </div>
      </div>
      <div className={allocationsContainerClassName}>
        <div className={subtitleStyle}>Allocations</div>
        <div style={{ marginTop: '1.5rem', display: 'flex' }}>
          <div style={{ flex: 0.25 }} className={allocationsTitleStyle}>
            Purchased
          </div>
          <div style={{ flex: 0.25 }} className={allocationsTitleStyle}>
            Amount
          </div>
          <div style={{ flex: 0.25 }} className={allocationsTitleStyle}>
            Dollars
          </div>
          <div style={{ flex: 0.25 }} className={allocationsTitleStyle}>
            Tokens
          </div>
        </div>
        <div style={projectDetailsItemStyle}>
          <div style={{ flex: 0.25 }} className={allocationsItemNormalStyle}>
            6/21/19
          </div>
          <div style={{ flex: 0.25 }} className={allocationsItemNormalStyle}>
            0.28 ETH
          </div>
          <div style={{ flex: 0.25 }} className={allocationsItemNormalStyle}>
            1,239 USDT
          </div>
          <div style={{ flex: 0.25 }} className={allocationsItemNormalStyle}>
            304,985 TKN
          </div>
        </div>
        <div style={projectDetailsItemStyle}>
          <div style={{ flex: 0.25 }} className={allocationsItemNormalStyle}>
            6/21/19
          </div>
          <div style={{ flex: 0.25 }} className={allocationsItemNormalStyle}>
            0.012 ETH
          </div>
          <div style={{ flex: 0.25 }} className={allocationsItemNormalStyle}>
            190 USDT
          </div>
          <div style={{ flex: 0.25 }} className={allocationsItemNormalStyle}>
            23,498 TKN
          </div>
        </div>
        <div style={{ padding: '1.5rem 0', alignItems: 'center', display: 'flex' }}>
          <div style={{ flex: 0.25 }} className={allocationsTotalTextStyle}>
            Total
          </div>
          <div style={{ flex: 0.25 }} className={allocationsItemBoldStyle}>
            0.292 ETH
          </div>
          <div style={{ flex: 0.25 }} className={allocationsItemBoldStyle}>
            1,429 USDT
          </div>
          <div style={{ flex: 0.25 }} className={allocationsItemBoldStyle}>
            328,483 TKN
          </div>
        </div>
      </div>
      <div className={projectDetailsRootContainerClassName}>
        <div className={subtitleStyle}>Project details</div>
        <div className={projectDetailsContainerClassName}>
          <div style={cs({ flex: 0.5, margin: '0 1.5rem', backgroundColor: `${sideColor8}` }, topRightBottomLeftNotch)}>
            <div style={{ padding: '1.5rem' }}>
              <div style={projectDetailsSubtitleStyle}>PROJECT</div>
              <div style={{ marginTop: '2.25rem' }}>
                <div style={projectDetailsItemStyle}>
                  <div className={descriptionTextStyle}>Token distribution</div>
                  <div className={content3TextStyle}>June 21, 2021 4:00 PM</div>
                </div>
                <div style={projectDetailsItemStyle}>
                  <div className={descriptionTextStyle}>Min. Allocation</div>
                  <div className={content3TextStyle}>0</div>
                </div>
                <div style={projectDetailsItemStyle}>
                  <div className={descriptionTextStyle}>Max. Allocation</div>
                  <div className={content3TextStyle}>0.02 ETH</div>
                </div>
                <div style={projectDetailsItemStyle}>
                  <div className={descriptionTextStyle}>Min. swap level</div>
                  <div className={content3TextStyle}>2 ETH</div>
                </div>
                <div style={{ display: 'flex', padding: '0.75rem 0' }}>
                  <div className={descriptionTextStyle}>Whitelist status</div>
                  <div className={content3TextStyle}>Whitelisted</div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={cs({ flex: 0.5, margin: '0 1.5rem', backgroundColor: `${sideColor8}` }, topRightBottomLeftNotch)}
            className={projectDetailsTokenClassName}>
            <div style={{ padding: '1.5rem' }}>
              <div style={projectDetailsSubtitleStyle}>TOKEN</div>
              <div style={{ marginTop: '2.25rem' }}>
                <div style={projectDetailsItemStyle}>
                  <div className={descriptionTextStyle}>Name</div>
                  <div className={content3TextStyle}>takename</div>
                </div>
                <div style={projectDetailsItemStyle}>
                  <div className={descriptionTextStyle}>Symbol</div>
                  <div className={content3TextStyle}>TKN</div>
                </div>
                <div style={projectDetailsItemStyle}>
                  <div className={descriptionTextStyle}>Decimals</div>
                  <div className={content3TextStyle}>24</div>
                </div>
                <div style={projectDetailsItemStyle}>
                  <div className={descriptionTextStyle}>Address</div>
                  <div className={content3TextStyle}>0x19273h348fo837ffo38974fh</div>
                </div>
                <div style={{ display: 'flex', padding: '0.75rem 0' }}>
                  <div className={descriptionTextStyle}>Total supply</div>
                  <div className={content3TextStyle}>10,000,000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={aboutTheProjectContainerClassName}>
        <div className={subtitleStyle}>About the project</div>
        <div style={aboutTextStyle}>
          Physiological respiration involves the mechanisms that ensure that the composition of the functional residual
          capacity is kept constant, and equilibrates with the gases dissolved in the pulmonary capillary blood, and
          thus throughout the body. Thus, in precise usage, the words breathing and ventilation are hyponyms, not
          synonyms, of respiration; but this prescription is not consistently followed, even by most health care
          providers, because the term respiratory rate (RR) is a well-established term in health care, even though it
          would need to be consistently replaced with ventilation rate if the precise usage were to be followed.
        </div>
      </div>
    </div>
  );
};
