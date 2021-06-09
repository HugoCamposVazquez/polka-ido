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
`;

export const Footer = withRouter((props) => {
  return (
    <div
      style={{ display: 'flex', marginBottom: '40px', marginTop: '126px', marginLeft: '120px', marginRight: '120px' }}>
      <div style={{ flex: 0.5 }}>
        <div>
          <div style={ryuTextStyle}>RYU</div>
          <div style={ryu2021TextStyle}>RYU 2021</div>
        </div>
      </div>
      <div style={{ flex: 0.5 }}>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '95px' }}>
            <div style={linkTitleTextStyle}>Social media</div>
            <div style={linkTextStyle}>Twitter</div>
            <div style={linkTextStyle}>Medium</div>
            <div style={linkTextStyle}>Telegram</div>
          </div>
          <div style={{ marginRight: '95px' }}>
            <div>
              <div style={linkTitleTextStyle}>Company</div>
              <div style={linkTextStyle}>About us</div>
            </div>
          </div>
          <div>
            <div>
              <div style={linkTitleTextStyle}>Support</div>
              <div style={linkTextStyle}>Contact us</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
