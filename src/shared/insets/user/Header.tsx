import React, { useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';

import closeIcon from '../../../assets/close_icon.svg';
import menuIcon from '../../../assets/menu_icon.svg';
import { sideColor3, sideColor4, sideColor5 } from '../../../utils/colorsUtil';
import { cs } from '../../../utils/css';
import { useWindowDimensions } from '../../../utils/windowDimensionsUtil';
import { MainButton } from '../../gui/MainButton';
import { openWalletModal } from '../../modals/modals';
import * as styles from './Header.styles';

const mobileViewWidth = 830;

export const Header = withRouter((props) => {
  const navigation = useHistory();
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const { width } = useWindowDimensions();

  return (
    <div style={cs(styles.headerContainerParentStyle, menuOpened ? { height: '100%' } : { height: 'auto' })}>
      <div
        style={cs(
          styles.headerContainerStyle,
          menuOpened && width <= mobileViewWidth
            ? { backgroundColor: 'rgba(1, 1, 1, 0.85)' }
            : { backgroundColor: 'rgba(1, 1, 1, 0.6)' },
        )}>
        <div className={styles.headerContentStyle}>
          <div
            style={styles.ryuTextStyle}
            onClick={() => {
              // eslint-disable-next-line no-undef
              window.scrollTo(0, 0);
              navigation.push('/home');
            }}>
            RYU
          </div>
          <div className={styles.menuItemsContainerClassName}>
            <div
              className={
                props.location.pathname === '/home' ? styles.menuItemSelectedStyle : styles.menuItemNotSelectedStyle
              }>
              <Link to="/home">Home</Link>
            </div>
            <div
              className={
                props.location.pathname === '/launchpad'
                  ? styles.menuItemSelectedStyle
                  : styles.menuItemNotSelectedStyle
              }>
              <Link to="/launchpad">Launchpad</Link>
            </div>
            {!walletConnected && (
              <MainButton
                title={'Connect wallet'}
                type={'fill'}
                onClick={() => {
                  setWalletConnected(true);
                }}
                style={{ marginLeft: '0.375rem' }}
              />
            )}
            {walletConnected && (
              <div
                style={{ backgroundColor: sideColor5, display: 'flex', marginLeft: '1.4375rem', cursor: 'pointer' }}
                onClick={() => {
                  openWalletModal(setWalletConnected);
                }}>
                <div
                  style={{
                    color: sideColor4,
                    padding: '0.4375rem 0.5rem',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    fontFamily: 'Titillium Web',
                  }}>
                  0.004233 ETH
                </div>
                <div
                  style={{
                    backgroundColor: sideColor3,
                    margin: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxWidth: '5.25rem',
                  }}>
                  <div
                    style={{
                      padding: '0.1875rem 0.5rem',
                      fontFamily: 'Titillium Web',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}>
                    0xF2C...x706
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={styles.menuIconClassName}>
            <img
              src={menuOpened ? closeIcon : menuIcon}
              onClick={() => {
                setMenuOpened(!menuOpened);
              }}
            />
          </div>
        </div>
      </div>

      {menuOpened && width <= mobileViewWidth && (
        <div style={styles.mobileMenuContainerStyle}>
          <div
            style={{ marginTop: '3rem', display: 'flex', alignItems: 'center' }}
            className={
              props.location.pathname === '/home' ? styles.menuItemSelectedStyle : styles.menuItemNotSelectedStyle
            }>
            <div
              style={styles.mobileMenuItemStyle}
              onClick={() => {
                setMenuOpened(false);
                props.history.push('/home');
              }}>
              Home
            </div>
          </div>
          <div
            style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center' }}
            className={
              props.location.pathname === '/launchpad' ? styles.menuItemSelectedStyle : styles.menuItemNotSelectedStyle
            }>
            <div
              style={styles.mobileMenuItemStyle}
              onClick={() => {
                setMenuOpened(false);
                props.history.push('/launchpad');
              }}>
              Launchpad
            </div>
          </div>
          <div style={{ marginTop: '3rem' }}>
            {!walletConnected && (
              <MainButton
                title={'Connect wallet'}
                onClick={() => {
                  setWalletConnected(true);
                }}
                type={'fill'}
              />
            )}
            {walletConnected && (
              <div
                style={{ backgroundColor: sideColor5, display: 'flex', cursor: 'pointer' }}
                onClick={() => {
                  setMenuOpened(false);
                  openWalletModal(setWalletConnected);
                }}>
                <div
                  style={{
                    color: sideColor4,
                    padding: '0.4375rem 0.5rem',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    fontFamily: 'Titillium Web',
                  }}>
                  0.004233 ETH
                </div>
                <div
                  style={{
                    backgroundColor: sideColor3,
                    margin: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxWidth: '5.25rem',
                  }}>
                  <div
                    style={{
                      padding: '0.1875rem 0.5rem',
                      fontFamily: 'Titillium Web',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}>
                    0xF2C...x706
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
