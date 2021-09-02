import React from 'react';

import ryuLogoAnimation from '../assets/ryu_logo_animation.gif';
import * as styles from '../pages/ProjectDetails/ProjectDetailsPage.styles';
import { sideColor8 } from '../utils/colorsUtil';
import { cs } from '../utils/css';

export const ProjectDetailsSectionLoading = () => {
  return (
    <div
      style={cs({ flex: 0.5, margin: '0 1.5rem', backgroundColor: `${sideColor8}` }, styles.topLeftBottomRightNotch)}
      className={styles.projectDetailsTokenClassName}>
      <img src={ryuLogoAnimation} style={{ height: '300px', margin: '0 auto', display: 'block' }} />
    </div>
  );
};
