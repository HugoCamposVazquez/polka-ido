import React from 'react';
import { withRouter } from 'react-router-dom';

import * as styles from './Footer.styles';

export const Footer = withRouter(() => {
  return (
    <div className={styles.footerContainerClassName}>
      <div className={styles.footerCopyrightParentClassName}>
        <div style={styles.ryuTextStyle}>RYU</div>
        <div style={styles.ryu2021TextStyle}>RYU 2021</div>
      </div>
      <div className={styles.footerLinksParentContainerClassName}>
        <div className={styles.footerLinksContainerClassName}>
          <div className={styles.linksGroupsClassName}>
            <div className={styles.linkTitleTextStyle}>Social media</div>
            <a target="_blank" href="https://www.twitter.com" className={styles.linkTextStyle} rel="noreferrer">
              Twitter
            </a>
            <a target="_blank" href="https://www.medium.com" className={styles.linkTextStyle} rel="noreferrer">
              Medium
            </a>
            <a target="_blank" href="https://www.telegram.com" className={styles.linkTextStyle} rel="noreferrer">
              Telegram
            </a>
          </div>
          <div className={styles.linksGroupsClassName}>
            <div className={styles.linkTitleTextStyle}>Company</div>
            <a href="/about" className={styles.linkTextStyle}>
              About us
            </a>
          </div>
          <div>
            <div className={styles.linksGroupsClassName}>
              <div className={styles.linkTitleTextStyle}>Support</div>
              <a target="_blank" href="mailto:someone@ryu.com" className={styles.linkTextStyle} rel="noreferrer">
                Contact us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
