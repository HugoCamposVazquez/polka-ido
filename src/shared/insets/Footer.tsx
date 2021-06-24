import React from 'react';
import { withRouter } from 'react-router-dom';

import { sideColor3, sideColor5, sideColor6 } from '../../utils/colorsUtil';
import { styled } from '../../utils/css';

const ryuTextStyle = styled.cssStyle`
  font-family: Odibee Sans;
  color: ${sideColor5};
  font-weight: 400;
  text-size: 1.5rem;
  line-height: 1.69rem;
`;

const ryu2021TextStyle = styled.cssStyle`
  font-family: Titillium Web;
  color: ${sideColor6};
  font-weight: 400;
  text-size: 1rem;
  line-height: 1.52rem;
`;

const linkTitleTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-style: bold;
  color: ${sideColor3};
  font-weight: 700;
  text-size: 1.25rem;
  line-height: 1.88rem;
  margin-bottom: 0.5rem;
`;

const linkTextStyle = styled.cssStyle`
  font-family: Titillium Web;
  color: ${sideColor5};
  font-weight: 400;
  text-size: 1.25rem;
  line-height: 1.9rem;
  margin: 0.13rem 0;
  text-decoration: none;
`;

const footerContainerClassName = styled.cssClassName`
  display: flex;
  margin-bottom: 2.5rem;
  margin-top: 7.88rem;
  margin-left: 7.5rem;
  margin-right: 7.5rem;

  @media (max-width: 51.875rem) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 3.13rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

const footerLinksParentContainerClassName = styled.cssClassName`
  display: flex;
`;

const footerLinksContainerClassName = styled.cssClassName`
  display: flex;
  @media (max-width: 51.875rem) {
    flex-direction: column;
    align-items: center;
  }
`;

const linksGroupsClassName = styled.cssClassName`
  margin-right: 5.94rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 51.875rem) {
    margin-right: 0;

    align-items: center;
    margin-top: 2.5rem;
  }
`;
const footerCopyrightParentClassName = styled.cssClassName`
  display: block;
  flex: 0.8;
  @media (max-width: 51.875rem) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Footer = withRouter(() => {
  const a = '';

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
            <div style={linkTitleTextStyle}>Company</div>
            <a target="_blank" href="#" style={linkTextStyle}>
              About us
            </a>
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
