import React from 'react';
import { withRouter } from 'react-router-dom';

import { styled } from '../utils/css';

const ryuTextStyle = styled.cssStyle`
  font-family: Odibee Sans;
  color: white;
  font-weight: 400;
  text-size: 24px;
  line-height: 27px;
`;

const ryu2021TextStyle = styled.cssStyle`
  font-family: Titillium Web;
  color: #7a7a7a;
  font-weight: 400;
  text-size: 16px;
  line-height: 24.34px;
`;

const linkTitleTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-style: bold;
  color: #d2307a;
  font-weight: 700;
  text-size: 20px;
  line-height: 30px;
  margin-bottom: 8px;
`;

const linkTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  color: white;
  font-weight: 400;
  text-size: 20px;
  line-height: 30.42px;
  margin: 2px 0;
  text-decoration: none;
`;

const footerContainerClassName = styled.cssClassName`
  display: flex;
  margin-bottom: 40px;
  margin-top: 126px;
  margin-left: 120px;
  margin-right: 120px;

  @media (max-width: 830px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
    margin-left: 24px;
    margin-right: 24px;
  }
`;

const footerLinksParentContainerClassName = styled.cssClassName`
  display: flex;
`;

const footerLinksContainerClassName = styled.cssClassName`
  display: flex;
  @media (max-width: 830px) {
    flex-direction: column;
    align-items: center;
  }
`;

const linksGroupsClassName = styled.cssClassName`
  margin-right: 95px;
  display: flex;
  flex-direction: column;

  @media (max-width: 830px) {
    margin-right: 0;

    align-items: center;
    margin-top: 40px;
  }
`;
const footerCopyrightParentClassName = styled.cssClassName`
  display: block;
  flex: 0.8;
  @media (max-width: 830px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Footer = withRouter((props) => {
  return (
    <div className={footerContainerClassName}>
      <div className={footerCopyrightParentClassName}>
        <div style={ryuTextStyle}>RYU</div>
        <div style={ryu2021TextStyle}>RYU 2021</div>
      </div>
      <div className={footerLinksParentContainerClassName}>
        <div className={footerLinksContainerClassName}>
          <div className={linksGroupsClassName}>
            <div style={linkTitleTextStyle}>Social media</div>
            <a target="_blank" href="#" style={linkTextStyle}>
              Twitter
            </a>
            <a target="_blank" href="#" style={linkTextStyle}>
              Medium
            </a>
            <a target="_blank" href="#" style={linkTextStyle}>
              Telegram
            </a>
          </div>
          <div className={linksGroupsClassName}>
            <div>
              <div style={linkTitleTextStyle}>Company</div>
              <a target="_blank" href="#" style={linkTextStyle}>
                About us
              </a>
            </div>
          </div>
          <div>
            <div className={linksGroupsClassName}>
              <div style={linkTitleTextStyle}>Support</div>
              <a target="_blank" href="#" style={linkTextStyle}>
                Contact us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
