import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';

import { WalletConnect } from '../user/WalletConnect';
import * as styles from './Header.styles';

export const Header = withRouter(() => {
  const navigation = useHistory();

  return (
    <div style={styles.headerContainerParentStyle}>
      <div style={styles.headerContainerStyle}>
        <div style={styles.headerContentStyle}>
          <div
            style={styles.ryuTextStyle}
            onClick={() => {
              // eslint-disable-next-line no-undef
              window.scrollTo(0, 0);
              navigation.push('/admin');
            }}>
            RYU
          </div>
          <WalletConnect isMobile={true} />
        </div>
      </div>
    </div>
  );
});
