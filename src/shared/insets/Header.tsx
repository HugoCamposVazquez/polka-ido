import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { sideColor, sideColor2, sideColor5 } from '../../utils/colorsUtil';
import { cs, styled } from '../../utils/css';
import useWindowDimensions from '../../utils/windowDimensionsUtil';
import { MainButton } from '../gui/MainButton';

export const headerHeight = 7.5;
export const mobileViewWidth = 830;

const headerContainerParentStyle = styled.cssStyle`
  flex: 1;
  position: fixed;
  width: 100%;
  z-index: 2000;
  display: flex;
  flex-direction: column;
`;

const mobileMenuItemStyle = styled.cssStyle`
  cursor: pointer;
`;

const headerContainerStyle = styled.cssStyle`
  height: ${headerHeight.toString()}rem;
  width: 100%;
  position: relative;
  z-index: 2000;
  display: flex;
  align-items: center;
  border-bottom: 0.06rem solid ${sideColor2};
`;

const headerContentStyle = styled.cssClassName`
  position: relative;
  padding-left: 7.5rem;
  padding-right: 7.5rem;
  display: flex;
  align-items: center;
  flex: 1;

  @media (max-width: 830px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

const ryuTextStyle = styled.cssStyle`
  font-weight: 400;
  line-height: 0;
  font-size: 1.5rem;
  font-family: Odibee Sans;
  flex: 1;
  cursor: pointer;
`;

const mobileMenuContainerStyle = styled.cssStyle`
  background-color: rgba(1, 1, 1, 0.85);
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const menuItemNotSelectedStyle = styled.cssClassName`
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.9rem;
  font-family: Titillium Web;
  margin-right: 1.38rem;

  a {
    color: ${sideColor};
    text-decoration: none;
  }

  :before {
    content: '';
    width: 0.38rem;
    height: 0.38rem;
    border-radius: 50%;
    margin-right: 0.5rem;
    margin-bottom: 0.13rem;
    display: inline-block;
    background-color: transparent;
    vertical-align: middle;
  }
`;

const menuItemSelectedStyle = styled.cssClassName`
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.9rem;
  font-family: Titillium Web;
  margin-right: 1.38rem;

  a {
    color: ${sideColor5};
    text-decoration: none;
  }

  :before {
    content: '';
    width: 0.38rem;
    height: 0.38rem;
    border-radius: 50%;
    margin-right: 0.5rem;
    margin-bottom: 0.13rem;
    display: inline-block;
    background-color: ${sideColor5};
    vertical-align: middle;
  }
`;

const menuItemsContainerClassName = styled.cssClassName`
  display: flex;
  align-items: center;

  @media (max-width: 830px) {
    display: none;
  }
`;

const menuIconClassName = styled.cssClassName`
  @media (min-width: 830px) {
    display: none;
  }
`;

export const Header = withRouter((props) => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const { width } = useWindowDimensions();

  return (
    <div style={cs(headerContainerParentStyle, menuOpened ? { height: '100%' } : { height: 'auto' })}>
      <div
        style={cs(
          headerContainerStyle,
          menuOpened && width <= mobileViewWidth
            ? { backgroundColor: 'rgba(1, 1, 1, 0.85)' }
            : { backgroundColor: 'rgba(1, 1, 1, 0.6)' },
        )}>
        <div className={headerContentStyle}>
          <div
            style={ryuTextStyle}
            onClick={() => {
              // eslint-disable-next-line no-undef
              window.scrollTo(0, 0);
              // eslint-disable-next-line no-undef
              window.location.reload();
            }}>
            RYU
          </div>
          <div className={menuItemsContainerClassName}>
            <div className={props.location.pathname === '/home' ? menuItemSelectedStyle : menuItemNotSelectedStyle}>
              <Link to="/home">Home</Link>
            </div>
            <div
              className={props.location.pathname === '/launchpad' ? menuItemSelectedStyle : menuItemNotSelectedStyle}>
              <Link to="/launchpad">Launchpad</Link>
            </div>
            <MainButton title={'Connect wallet'} type={'fill'} onClick={() => {}} />
          </div>
          <div className={menuIconClassName}>
            <img
              src={menuOpened ? process.env.PUBLIC_URL + '/close_icon.svg' : process.env.PUBLIC_URL + '/menu_icon.svg'}
              onClick={() => {
                setMenuOpened(!menuOpened);
              }}
            />
          </div>
        </div>
      </div>

      {menuOpened && width <= mobileViewWidth && (
        <div style={mobileMenuContainerStyle}>
          <div
            style={{ marginTop: '3rem', display: 'flex', alignItems: 'center' }}
            className={props.location.pathname === '/home' ? menuItemSelectedStyle : menuItemNotSelectedStyle}>
            <div
              style={mobileMenuItemStyle}
              onClick={() => {
                setMenuOpened(false);
                props.history.push('/home');
              }}>
              Home
            </div>
          </div>
          <div
            style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center' }}
            className={props.location.pathname === '/launchpad' ? menuItemSelectedStyle : menuItemNotSelectedStyle}>
            <div
              style={mobileMenuItemStyle}
              onClick={() => {
                setMenuOpened(false);
                props.history.push('/launchpad');
              }}>
              Launchpad
            </div>
          </div>
          <div style={{ marginTop: '3rem' }}>
            <MainButton title={'Connect wallet'} onClick={() => {}} type={'fill'} />
          </div>
        </div>
      )}
    </div>
  );
});
