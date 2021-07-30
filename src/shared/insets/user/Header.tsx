import React, { useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';

import closeIcon from '../../../assets/close_icon.svg';
import menuIcon from '../../../assets/menu_icon.svg';
import ryuLogo from '../../../assets/ryu-logo.svg';
import { cs } from '../../../utils/css';
import { useWindowDimensions } from '../../../utils/windowDimensionsUtil';
import * as styles from './Header.styles';
import { WalletConnect } from './WalletConnect';

const mobileViewWidth = 830;

export const Header = withRouter((props) => {
  const navigation = useHistory();
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
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
          <img
            src={ryuLogo}
            style={styles.ryuLogoStyle}
            onClick={() => {
              // eslint-disable-next-line no-undef
              window.scrollTo(0, 0);
              navigation.push('/home');
            }}
          />
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
            <WalletConnect />
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
            <WalletConnect isMobile={true} />
          </div>
        </div>
      )}
    </div>
  );
});
