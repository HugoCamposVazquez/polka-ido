import ProgressBar from '@ramonak/react-progress-bar/dist';
import React from 'react';

import { cs, styled } from '../utils/css';

const imageParentContainerClassName = styled.cssClassName`
  display: flex;
  flex-direction: column;
  height: 563px;
  position: relative;
  padding: 0 120px;
  margin-top: 180px;

  @media (max-width: 830px) {
    height: auto;
    padding: 0;
    display: flex;
    flex-direction: column-reverse;
  }
`;
const customTopRightObjectClassName = styled.cssClassName`
  position: absolute;
  height: 120px;
  width: 120px;
  background-color: #d2307a;
  top: 0;
  right: 0;
`;

const customBottomLeftObjectClassName = styled.cssClassName`
  position: absolute;
  height: 120px;
  width: 120px;
  background-color: #d2307a;
  top: 443px;
  left: 0;
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
  height: 523px;
  top: 20px;
  right: 20px;
  left: 20px;

  @media (max-width: 830px) {
    position: relative;
    height: auto;
    width: auto;
    top: 0;
    right: 0;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }
`;
const imageStyle = styled.cssClassName`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;

  @media (max-width: 830px) {
    position: relative;
  }
`;

const projectStatusTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
`;

const projectNameTextStyle = styled.cssStyle`
  font-family: Odibee Sans;
  font-weight: 400;
  font-size: 64px;
`;

const shortDescriptionTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 16px;
  color: #d2307a;
`;

const descriptionTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 16px;
  color: #b8b8b8;
`;

const description2TextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 600;
  font-size: 16px;
  color: white;
`;

const contentTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 20px;
  color: #d2307a;
`;

const content2TextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 20px;
  color: white;
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

const valueDescTextStyle = styled.cssStyle`
  font-family: Odibee Sans;
  font-weight: 400;
  font-size: 36px;
  color: #d2307a;
`;
const projectImageBackgroundStyle = styled.cssStyle`
  height: 120px;
  width: 120px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const projectStatusBackgroundStyle = styled.cssStyle`
  height: 28px;
  width: 108px;
  background-color: #42f027;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const projectDetailsBtnsParentStyle = styled.cssStyle`
  margin-top: 24px;
  margin-right: 36px;
  display: flex;
  justify-content: flex-end;
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

const allocationsTitleStyle = styled.cssStyle`
  font-familiy: Titillium Web;
  font-weight: 700;
  font-size: 20px;
  color: white;
`;

const allocationsItemNormalStyle = styled.cssStyle`
  font-familiy: Titillium Web;
  font-weight: 400;
  font-size: 16px;
  color: #b8b8b8;
`;

const allocationsItemBoldStyle = styled.cssStyle`
  font-familiy: Titillium Web;
  font-weight: 700;
  font-size: 16px;
  color: white;
`;

const allocationsTotalTextStyle = styled.cssStyle`
  font-familiy: Titillium Web;
  font-weight: 400;
  font-size: 20px;
  color: #b8b8b8;
`;
const subtitleStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 600;
  font-size: 36px;
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
        <div style={{ position: 'relative' }}>
          <div className={customTopRightObjectClassName} style={topLeftBottomRightNotch} />
          <div className={customBottomLeftObjectClassName} style={topLeftBottomRightNotch} />

          <div className={imageContainerClassName}>
            <img className={imageStyle} src={process.env.PUBLIC_URL + '/rectangle2_image.png'} />
          </div>
        </div>
        <div style={{ height: '100%', margin: '20px', zIndex: 1000, display: 'flex' }}>
          <div style={{ flex: 0.5 }}>
            <div style={{ marginTop: '36px', marginLeft: '36px', marginRight: '36px', display: 'flex' }}>
              <div style={cs(projectImageBackgroundStyle, topRightBottomLeftNotch)}>
                <img style={{ margin: '24px' }} src={process.env.PUBLIC_URL + '/horse_image.png'} />
              </div>
              <div style={{ marginLeft: '24px' }}>
                <div style={projectStatusBackgroundStyle}>
                  <div style={projectStatusTextStyle}>Ended</div>
                </div>
                <div style={projectNameTextStyle}>My project 1</div>
              </div>
            </div>
            <div style={{ marginTop: '52px', marginLeft: '36px', marginRight: '36px' }}>
              <div style={shortDescriptionTextStyle}>Short description</div>
              <div style={cs({ marginTop: '12px', maxWidth: '400px' }, descriptionTextStyle)}>
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
            <div style={{ marginTop: '28px', marginRight: '36px' }}>
              <div style={descriptionParentStyle}>
                <div style={cs({ flex: 1 }, descriptionTextStyle)}>Starts</div>
                <div style={contentTextStyle}>May 20, 2021 4:00 PM</div>
              </div>
              <div style={descriptionParentStyle}>
                <div style={cs({ flex: 1 }, descriptionTextStyle)}>Ends</div>
                <div style={contentTextStyle}>June 20, 2021 4:00 PM</div>
              </div>
              <div style={descriptionParentStyle}>
                <div style={cs({ flex: 1 }, descriptionTextStyle)}>Allocation</div>
                <div style={contentTextStyle}>10,000,000</div>
              </div>
              <div style={descriptionParentStyle}>
                <div style={cs({ flex: 1 }, descriptionTextStyle)}>Access</div>
                <div style={contentTextStyle}>Whitelist</div>
              </div>
              <div style={descriptionParentStyle}>
                <div style={cs({ flex: 1 }, descriptionTextStyle)}>Token price</div>
                <div style={contentTextStyle}>0.022ETH</div>
              </div>
              <div style={descriptionParentStyle}>
                <div style={cs({ flex: 1 }, description2TextStyle)}>Your allocation</div>
                <div style={content2TextStyle}>{'0.02 ETH > 349857 TKN'}</div>
              </div>
            </div>
            <div style={{ marginTop: '36px', marginRight: '36px' }}>
              <div style={valueDescTextStyle}>7273/10000 USDT</div>
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
            <div style={projectDetailsBtnsParentStyle}>
              <div style={claimTokensBtnStyle}>CLAIM TOKENS</div>
              <div style={joinBtnStyle}>JOIN</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ margin: '120px' }}>
        <div style={subtitleStyle}>Allocations</div>
        <div style={{ marginTop: '24px', display: 'flex' }}>
          <div style={cs({ flex: 0.2 }, allocationsTitleStyle)}>Purchased</div>
          <div style={cs({ flex: 0.2 }, allocationsTitleStyle)}>Amount</div>
          <div style={cs({ flex: 0.2 }, allocationsTitleStyle)}>Dollars</div>
          <div style={cs({ flex: 0.2 }, allocationsTitleStyle)}>Tokens</div>
        </div>
        <div style={{ padding: '12px 0', display: 'flex', borderBottom: '1px solid #B8B8B8' }}>
          <div style={cs({ flex: 0.2 }, allocationsItemNormalStyle)}>6/21/19</div>
          <div style={cs({ flex: 0.2 }, allocationsItemNormalStyle)}>0.28 ETH</div>
          <div style={cs({ flex: 0.2 }, allocationsItemNormalStyle)}>1,239 USDT</div>
          <div style={cs({ flex: 0.2 }, allocationsItemNormalStyle)}>304,985 TKN</div>
        </div>
        <div style={{ padding: '12px 0', display: 'flex', borderBottom: '1px solid #B8B8B8' }}>
          <div style={cs({ flex: 0.2 }, allocationsItemNormalStyle)}>6/21/19</div>
          <div style={cs({ flex: 0.2 }, allocationsItemNormalStyle)}>0.012 ETH</div>
          <div style={cs({ flex: 0.2 }, allocationsItemNormalStyle)}>190 USDT</div>
          <div style={cs({ flex: 0.2 }, allocationsItemNormalStyle)}>23,498 TKN</div>
        </div>
        <div style={{ padding: '24px 0', display: 'flex' }}>
          <div style={cs(allocationsTotalTextStyle, { flex: 0.2 })}>Total</div>
          <div style={cs(allocationsItemBoldStyle, { flex: 0.2 })}>0.292 ETH</div>
          <div style={cs(allocationsItemBoldStyle, { flex: 0.2 })}>1,429 USDT</div>
          <div style={cs(allocationsItemBoldStyle, { flex: 0.2 })}>328,483 TKN</div>
        </div>
      </div>
      <div style={{ margin: '120px' }}>
        <div style={subtitleStyle}>Project details</div>
        <div style={{ display: 'flex', margin: '0 -24px', marginTop: '36px' }}>
          <div style={cs({ flex: 0.5, margin: '0 24px', backgroundColor: '#484848' }, topRightBottomLeftNotch)}>
            <div style={{ padding: '24px' }}>
              <div>PROJECT</div>
              <div style={{ marginTop: '36px' }}>
                <div style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid #B8B8B8' }}>
                  <div style={{ flex: 1 }}>Token distribution</div>
                  <div>June 21, 2021 4:00 PM</div>
                </div>
                <div style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid #B8B8B8' }}>
                  <div style={{ flex: 1 }}>Min. Allocation</div>
                  <div>0</div>
                </div>
                <div style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid #B8B8B8' }}>
                  <div style={{ flex: 1 }}>Max. Allocation</div>
                  <div>0.02 ETH</div>
                </div>
                <div style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid #B8B8B8' }}>
                  <div style={{ flex: 1 }}>Min. swap level</div>
                  <div>2 ETH</div>
                </div>
                <div style={{ display: 'flex', padding: '12px 0' }}>
                  <div style={{ flex: 1 }}>Whitelist status</div>
                  <div>Whitelisted</div>
                </div>
              </div>
            </div>
          </div>

          <div style={cs({ flex: 0.5, margin: '0 24px', backgroundColor: '#484848' }, topRightBottomLeftNotch)}>
            <div style={{ padding: '24px' }}>
              <div>TOKEN</div>
              <div style={{ marginTop: '36px' }}>
                <div style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid #B8B8B8' }}>
                  <div style={{ flex: 1 }}>Name</div>
                  <div>takename</div>
                </div>
                <div style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid #B8B8B8' }}>
                  <div style={{ flex: 1 }}>Symbol</div>
                  <div>TKN</div>
                </div>
                <div style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid #B8B8B8' }}>
                  <div style={{ flex: 1 }}>Decimals</div>
                  <div>24</div>
                </div>
                <div style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid #B8B8B8' }}>
                  <div style={{ flex: 1 }}>Address</div>
                  <div>0x19273h348fo837ffo38974fh</div>
                </div>
                <div style={{ display: 'flex', padding: '12px 0' }}>
                  <div style={{ flex: 1 }}>Total supply</div>
                  <div>10,000,000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ margin: '120px', marginBottom: '0px' }}>
        <div style={subtitleStyle}>About the project</div>
        <div
          style={{
            marginTop: '24px',
            fontFamily: 'Titillium Web',
            fontWeight: 400,
            fontSize: '16px',
            color: '#B8B8B8',
          }}>
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
