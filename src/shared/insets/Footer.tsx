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
            <a target="_blank" href="#" className={styles.linkTextStyle}>
              Twitter
            </a>
            <a target="_blank" href="#" className={styles.linkTextStyle}>
              Medium
            </a>
            <a target="_blank" href="#" className={styles.linkTextStyle}>
              Telegram
            </a>
          </div>
          <div className={styles.linksGroupsClassName}>
            <div className={styles.linkTitleTextStyle}>Company</div>
            <a target="_blank" href="#" className={styles.linkTextStyle}>
              About us
            </a>
          </div>
          <div>
            <div className={styles.linksGroupsClassName}>
              <div className={styles.linkTitleTextStyle}>Support</div>
              <a target="_blank" href="#" className={styles.linkTextStyle}>
                Contact us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
