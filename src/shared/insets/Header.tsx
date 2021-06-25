import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { cs } from '../../utils/css';
import { useWindowDimensions } from '../../utils/windowDimensionsUtil';
import { MainButton } from '../gui/MainButton';
import * as styles from './Header.styles';

export const headerHeight = 7.5;
export const mobileViewWidth = 830;

export const Header = withRouter((props) => {
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
          <div
            style={styles.ryuTextStyle}
            onClick={() => {
              // eslint-disable-next-line no-undef
              window.scrollTo(0, 0);
              // eslint-disable-next-line no-undef
              window.location.reload();
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
            <MainButton title={'Connect wallet'} type={'fill'} onClick={() => {}} />
          </div>
          <div className={styles.menuIconClassName}>
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
            <MainButton title={'Connect wallet'} onClick={() => {}} type={'fill'} />
          </div>
        </div>
      )}
    </div>
  );
});
