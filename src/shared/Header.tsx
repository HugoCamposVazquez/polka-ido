import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { styled } from '../utils/css';
import { MainButton } from './MainButton';

export const headerHeight = 7.5;

const headerContainerStyle = styled.cssStyle`
  height: ${headerHeight.toString()}rem;
  width: 100%;
  position: fixed;
  background-color: rgba(1, 1, 1, 0.6);
  z-index: 2000;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #292929;
`;

const headerContentStyle = styled.cssClassName`
  position: relative;
  padding-left: 120px;
  padding-right: 120px;
  display: flex;
  align-items: center;
  flex: 1;

  @media (max-width: 830px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const ryuTextStyle = styled.cssStyle`
  font-weight: 400;
  line-height: 0;
  font-size: 24px;
  font-family: Odibee Sans;
  flex: 1;
`;

const menuItemNotSelectedStyle = styled.cssClassName`
  font-weight: 400;
  font-size: 20px;
  line-height: 30.42px;
  font-family: Titillium Web;
  margin-right: 22px;

  a {
    color: #b8b8b8;
    text-decoration: none;
  }

  :before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 8px;
    margin-bottom: 2px;
    display: inline-block;
    background-color: transparent;
    vertical-align: middle;
  }
`;

const menuItemSelectedStyle = styled.cssClassName`
  font-weight: 700;
  font-size: 20px;
  line-height: 30.42px;
  font-family: Titillium Web;
  margin-right: 22px;

  a {
    color: white;
    text-decoration: none;
  }

  :before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 8px;
    margin-bottom: 2px;
    display: inline-block;
    background-color: white;
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
  return (
    <div style={headerContainerStyle}>
      <div className={headerContentStyle}>
        <div style={ryuTextStyle}>RYU</div>
        <div className={menuItemsContainerClassName}>
          <div className={props.location.pathname === '/home' ? menuItemSelectedStyle : menuItemNotSelectedStyle}>
            <Link to="/home">Home</Link>
          </div>
          <div className={props.location.pathname === '/launchpad' ? menuItemSelectedStyle : menuItemNotSelectedStyle}>
            <Link to="/launchpad">Launchpad</Link>
          </div>
          <MainButton title={'Connect wallet'} onClick={() => {}} />
        </div>
        <div className={menuIconClassName}>
          <img src={process.env.PUBLIC_URL + '/menu_icon.svg'} />
        </div>
      </div>
    </div>
  );
});
