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
              <div
                style={cs(
                  {
                    height: '120px',
                    width: '120px',
                    backgroundColor: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  topRightBottomLeftNotch,
                )}>
                <img style={{ margin: '24px' }} src={process.env.PUBLIC_URL + '/horse_image.png'} />
              </div>
              <div style={{ marginLeft: '24px' }}>
                <div
                  style={{
                    height: '28px',
                    width: '108px',
                    backgroundColor: '#42F027',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
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
              <div style={{ fontFamily: 'Odibee Sans', fontWeight: 400, fontSize: '36px', color: '#D2307A' }}>
                10000/10000 USDT
              </div>
              <div style={{ marginTop: '12px' }}>
                <ProgressBar
                  completed={(10000 / 10000) * 100}
                  isLabelVisible={false}
                  height={'0.38rem'}
                  bgColor={'#d2307a'}
                  baseBgColor={'#7A7A7A'}
                  borderRadius={'0rem'}
                />
              </div>
              <div
                style={{
                  marginTop: '4px',
                  fontSize: '14px',
                  color: '#7A7A7A',
                  fontFamily: 'Titillium Web',
                  fontWeight: 400,
                }}>
                1 TKN = 0.0002 USDT
              </div>
            </div>
            <div
              style={{
                marginTop: '24px',
                marginRight: '36px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
              <div
                style={{
                  border: '1px solid #D2307A',
                  height: '48px',
                  width: '196px',
                  marginRight: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#D2307A',
                  fontSize: '16px',
                  fontFamily: 'Titillium Web',
                  fontWeight: 700,
                }}>
                CLAIM TOKENS
              </div>
              <div
                style={{
                  border: '1px solid black',
                  height: '48px',
                  width: '196px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#D2307A',
                  fontSize: '16px',
                  fontFamily: 'Titillium Web',
                  fontWeight: 700,
                }}>
                JOIN
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
