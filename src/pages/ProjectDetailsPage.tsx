import ProgressBar from '@ramonak/react-progress-bar/dist';
import React from 'react';

import { cs, styled } from '../utils/css';

const imageParentContainerClassName = styled.cssClassName`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 120px;
  margin-right: 120px;
  margin-top: 180px;

  @media (max-width: 830px) {
    margin-left: 0px;
    margin-right: 0px;
  }
`;
const customTopRightObjectClassName = styled.cssClassName`
  position: absolute;
  height: 120px;
  width: 120px;
  background-color: #d2307a;
  top: 0;
  right: 0;

  @media (max-width: 830px) {
    display: none;
  }
`;

const customBottomLeftObjectClassName = styled.cssClassName`
  position: absolute;
  height: 120px;
  width: 120px;
  background-color: #d2307a;
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
  top: 20px;
  right: 20px;
  left: 20px;
  bottom: 20px;

  @media (max-width: 830px) {
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
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
  font-size: 14px;
  color: #000000;
`;

const projectNameTextStyle = styled.cssClassName`
  font-family: Odibee Sans;
  font-weight: 400;
  font-size: 64px;
  margin-top: 12px;

  @media (max-width: 830px) {
    font-size: 36px;
  }
`;

const shortDescriptionTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 16px;
  color: #d2307a;
`;

const descriptionTextStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 16px;
  color: #b8b8b8;

  @media (max-width: 830px) {
    font-size: 12px;
  }
`;

const description2TextStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-weight: 600;
  font-size: 16px;
  color: white;

  @media (max-width: 830px) {
    font-size: 12px;
  }
`;

const contentTextStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 20px;
  color: #d2307a;

  @media (max-width: 830px) {
    font-size: 14px;
  }
`;

const content2TextStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 20px;
  color: white;

  @media (max-width: 830px) {
    font-size: 14px;
  }
`;

const content3TextStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-weight: 600;
  font-size: 16px;
  color: #d2307a;

  @media (max-width: 830px) {
    font-size: 14px;
  }
`;

const projectContainerStyle = styled.cssClassName`
  height: 100%;
  margin: 20px;
  z-index: 1000;
  display: flex;

  @media (max-width: 1200px) {
    flex-direction: column;
  }

  @media (max-width: 830px) {
    margin: 0px;
  }
`;

const descriptionParentStyle = styled.cssStyle`
  border-bottom: 1px solid #7a7a7a;
  padding-bottom: 8px;
  display: flex;
  margin-top: 8px;
  align-items: center;
`;

const smallTextStyle = styled.cssStyle`
  margin-top: 4px;
  font-size: 14px;
  color: #7a7a7a;
  font-family: Titillium Web;
  font-weight: 400;
`;

const valueDescTextStyle = styled.cssClassName`
  font-family: Odibee Sans;
  font-weight: 400;
  font-size: 36px;
  color: #d2307a;

  @media (max-width: 830px) {
    font-size: 26px;
  }
`;
const projectImageBackgroundStyle = styled.cssClassName`
  height: 120px;
  width: 120px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 830px) {
    height: 80px;
    width: 80px;
  }
`;

const projectStatusBackgroundStyle = styled.cssClassName`
  height: 28px;
  width: 108px;
  background-color: #42f027;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 830px) {
    height: 25px;
    width: 98px;
  }
`;

const projectDetailsBtnsParentStyle = styled.cssClassName`
  margin-top: 24px;
  margin-bottom: 24px;
  margin-right: 36px;
  margin-left: 36px;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 830px) {
    margin-left: 24px;
    margin-right: 24px;
  }
`;

const claimTokensBtnStyle = styled.cssStyle`
  border: 1px solid #d2307a;
  height: 48px;
  width: 196px;
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #d2307a;
  font-size: 16px;
  font-family: Titillium Web;
  font-weight: 700;
`;
const joinBtnStyle = styled.cssStyle`
  height: 48px;
  width: 196px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d2307a;
  font-size: 16px;
  font-family: Titillium Web;
  font-weight: 700;
  border: 1px solid #d2307a;
`;

const allocationsTitleStyle = styled.cssClassName`
  font-familiy: Titillium Web;
  font-weight: 700;
  font-size: 20px;
  color: white;

  @media (max-width: 830px) {
    font-size: 14px;
  }
`;

const allocationsItemNormalStyle = styled.cssClassName`
  font-familiy: Titillium Web;
  font-weight: 400;
  font-size: 16px;
  color: #b8b8b8;

  @media (max-width: 830px) {
    font-size: 12px;
  }
`;

const allocationsItemBoldStyle = styled.cssClassName`
  font-familiy: Titillium Web;
  font-weight: 700;
  font-size: 16px;
  color: white;

  @media (max-width: 830px) {
    font-size: 12px;
  }
`;

const allocationsTotalTextStyle = styled.cssClassName`
  font-familiy: Titillium Web;
  font-weight: 400;
  font-size: 20px;
  color: #b8b8b8;

  @media (max-width: 830px) {
    font-size: 14px;
  }
`;
const subtitleStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-weight: 600;
  font-size: 36px;

  @media (max-width: 830px) {
    font-size: 26px;
  }
`;

const projectDetailsSubtitleStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 24px;
`;

const aboutTextStyle = styled.cssStyle`
  margin-top: 24px;
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 16px;
  color: #b8b8b8;
`;

const projectContainerRightStyle = styled.cssClassName`
  margin-top: 28px;
  margin-right: 36px;

  @media (max-width: 1200px) {
    margin-left: 36px;
  }

  @media (max-width: 830px) {
    margin-left: 24px;
    margin-right: 24px;
  }
`;

const shortDescriptionTextClassName = styled.cssClassName`
  margin-top: 12px;
  max-width: 400px;

  font-family: Titillium Web;
  font-weight: 400;
  font-size: 16px;
  color: #b8b8b8;

  @media (max-width: 1200px) {
    max-width: initial;
  }
`;

const projectDetailsContainerClassName = styled.cssClassName`
  display: flex;
  margin: 0 -24px;
  margin-top: 36px;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const projectDetailsTokenClassName = styled.cssClassName`
  margin-top: 0px !important;

  @media (max-width: 1200px) {
    margin-top: 36px !important;
  }
`;

const projectImageContainerClassName = styled.cssClassName`
  margin-top: 36px;
  margin-left: 36px;
  margin-right: 36px;
  display: flex;

  @media (max-width: 830px) {
    margin-top: 24px;
    margin-left: 24px;
    margin-right: 24px;
  }
`;

const shortDescriptionContainerClassName = styled.cssClassName`
  margin-top: 52px;
  margin-left: 36px;
  margin-right: 36px;

  @media (max-width: 830px) {
    margin-left: 24px;
    margin-right: 24px;
    margin-top: 36px;
  }
`;

const projectIconClassName = styled.cssClassName`
  height: 72px;
  width: 72px;

  @media (max-width: 830px) {
    height: 48px;
    width: 48px;
  }
`;

const allocationsContainerClassName = styled.cssClassName`
  margin: 120px;
  max-width: 700px;

  @media (max-width: 830px) {
    margin-left: 24px;
    margin-right: 24px;
    margin-top: 72px;
    margin-bottom: 72px;
  }
`;

const projectDetailsRootContainerClassName = styled.cssClassName`
  margin: 120px;

  @media (max-width: 830px) {
    margin-left: 24px;
    margin-right: 24px;
    margin-top: 72px;
    margin-bottom: 72px;
  }
`;

const aboutTheProjectContainerClassName = styled.cssClassName`
  margin: 120px;
  margin-bottom: 0px;

  @media (max-width: 830px) {
    margin-left: 24px;
    margin-right: 24px;
    margin-top: 72px;
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
          <img className={imageStyle} src={process.env.PUBLIC_URL + '/rectangle2_image.png'} />
        </div>

        <div className={projectContainerStyle}>
          <div style={{ flex: 0.5 }}>
            <div className={projectImageContainerClassName}>
              <div style={topRightBottomLeftNotch} className={projectImageBackgroundStyle}>
                <img className={projectIconClassName} src={process.env.PUBLIC_URL + '/horse_image.png'} />
              </div>
              <div style={{ marginLeft: '24px' }}>
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
              <div style={{ marginTop: '36px', display: 'flex' }}>
                <div style={{ padding: '4px 24px', border: '1px solid #FFFFFF' }}>Etherscan</div>

                <img style={{ marginLeft: '24px' }} src={process.env.PUBLIC_URL + '/web_icon.svg'} />
                <img style={{ marginLeft: '16px' }} src={process.env.PUBLIC_URL + '/twitter_icon.svg'} />
                <img style={{ marginLeft: '16px' }} src={process.env.PUBLIC_URL + '/telegram_icon.svg'} />
              </div>
            </div>
          </div>
          <div style={{ flex: 0.5 }}>
            <div className={projectContainerRightStyle}>
              <div style={descriptionParentStyle}>
                <div style={{ flex: 1 }} className={descriptionTextStyle}>
                  Starts
                </div>
                <div className={contentTextStyle}>May 20, 2021 4:00 PM</div>
              </div>
              <div style={descriptionParentStyle}>
                <div style={{ flex: 1 }} className={descriptionTextStyle}>
                  Ends
                </div>
                <div className={contentTextStyle}>June 20, 2021 4:00 PM</div>
              </div>
              <div style={descriptionParentStyle}>
                <div style={{ flex: 1 }} className={descriptionTextStyle}>
                  Allocation
                </div>
                <div className={contentTextStyle}>10,000,000</div>
              </div>
              <div style={descriptionParentStyle}>
                <div style={{ flex: 1 }} className={descriptionTextStyle}>
                  Access
                </div>
                <div className={contentTextStyle}>Whitelist</div>
              </div>
              <div style={descriptionParentStyle}>
                <div style={{ flex: 1 }} className={descriptionTextStyle}>
                  Token price
                </div>
                <div className={contentTextStyle}>0.022ETH</div>
              </div>
              <div style={descriptionParentStyle}>
                <div style={{ flex: 1 }} className={description2TextStyle}>
                  Your allocation
                </div>
                <div className={content2TextStyle}>{'0.02 ETH > 349857 TKN'}</div>
              </div>

              <div style={{ marginTop: '36px' }}>
                <div className={valueDescTextStyle}>7273/10000 USDT</div>
                <div style={{ marginTop: '12px' }}>
                  <ProgressBar
                    completed={(7273 / 10000) * 100}
                    isLabelVisible={false}
                    height={'0.38rem'}
                    bgColor={'#d2307a'}
                    baseBgColor={'#7A7A7A'}
                    borderRadius={'0rem'}
                  />
                </div>
                <div style={smallTextStyle}>1 TKN = 0.0002 USDT</div>
              </div>
            </div>

            <div className={projectDetailsBtnsParentStyle}>
              <div style={claimTokensBtnStyle}>CLAIM TOKENS</div>
              <div style={joinBtnStyle}>JOIN</div>
            </div>
          </div>
        </div>
      </div>
      <div className={allocationsContainerClassName}>
        <div className={subtitleStyle}>Allocations</div>
        <div style={{ marginTop: '24px', display: 'flex' }}>
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
        <div style={{ padding: '12px 0', display: 'flex', borderBottom: '1px solid #B8B8B8' }}>
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
        <div style={{ padding: '12px 0', display: 'flex', borderBottom: '1px solid #B8B8B8' }}>
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
        <div style={{ padding: '24px 0', alignItems: 'center', display: 'flex' }}>
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
          <div style={cs({ flex: 0.5, margin: '0 24px', backgroundColor: '#484848' }, topRightBottomLeftNotch)}>
            <div style={{ padding: '24px' }}>
              <div style={projectDetailsSubtitleStyle}>PROJECT</div>
              <div style={{ marginTop: '36px' }}>
                <div style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid #B8B8B8' }}>
                  <div style={{ flex: 1 }} className={descriptionTextStyle}>
                    Token distribution
                  </div>
                  <div className={content3TextStyle}>June 21, 2021 4:00 PM</div>
                </div>
                <div style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid #B8B8B8' }}>
                  <div style={{ flex: 1 }} className={descriptionTextStyle}>
                    Min. Allocation
                  </div>
                  <div className={content3TextStyle}>0</div>
                </div>
                <div style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid #B8B8B8' }}>
                  <div style={{ flex: 1 }} className={descriptionTextStyle}>
                    Max. Allocation
                  </div>
                  <div className={content3TextStyle}>0.02 ETH</div>
                </div>
                <div style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid #B8B8B8' }}>
                  <div style={{ flex: 1 }} className={descriptionTextStyle}>
                    Min. swap level
                  </div>
                  <div className={content3TextStyle}>2 ETH</div>
                </div>
                <div style={{ display: 'flex', padding: '12px 0' }}>
                  <div style={{ flex: 1 }} className={descriptionTextStyle}>
                    Whitelist status
                  </div>
                  <div className={content3TextStyle}>Whitelisted</div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={cs({ flex: 0.5, margin: '0 24px', backgroundColor: '#484848' }, topRightBottomLeftNotch)}
            className={projectDetailsTokenClassName}>
            <div style={{ padding: '24px' }}>
              <div style={projectDetailsSubtitleStyle}>TOKEN</div>
              <div style={{ marginTop: '36px' }}>
                <div style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid #B8B8B8' }}>
                  <div style={{ flex: 1 }} className={descriptionTextStyle}>
                    Name
                  </div>
                  <div className={content3TextStyle}>takename</div>
                </div>
                <div style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid #B8B8B8' }}>
                  <div style={{ flex: 1 }} className={descriptionTextStyle}>
                    Symbol
                  </div>
                  <div className={content3TextStyle}>TKN</div>
                </div>
                <div style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid #B8B8B8' }}>
                  <div style={{ flex: 1 }} className={descriptionTextStyle}>
                    Decimals
                  </div>
                  <div className={content3TextStyle}>24</div>
                </div>
                <div style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid #B8B8B8' }}>
                  <div style={{ flex: 1 }} className={descriptionTextStyle}>
                    Address
                  </div>
                  <div className={content3TextStyle}>0x19273h348fo837ffo38974fh</div>
                </div>
                <div style={{ display: 'flex', padding: '12px 0' }}>
                  <div style={{ flex: 1 }} className={descriptionTextStyle}>
                    Total supply
                  </div>
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
