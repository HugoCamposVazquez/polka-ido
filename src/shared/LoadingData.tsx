import React from 'react';

import ryuLogoAnimation from '../assets/ryu_logo_animation.gif';
import * as styles from './LoadingData.styles';

export const LoadingData = () => {
  return (
    <div style={styles.loadingDataContainerStyle}>
      <div className={styles.loadingDataStyle}>
        <img style={{ width: '100%', height: '100%' }} src={ryuLogoAnimation} />
      </div>
    </div>
  );
};
