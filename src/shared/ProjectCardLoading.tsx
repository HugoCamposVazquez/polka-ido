import React from 'react';

import ryuLogoAnimation from '../assets/ryu_logo_animation.gif';
import { cs } from '../utils/css';
import * as styles from './ProjectCard.styles';

type IProps = {
  direction: 'left' | 'right';
};

export const ProjectCardLoading = ({ direction }: IProps) => {
  return (
    <div
      style={cs(
        styles.projectCardContainer,
        direction === 'left' ? styles.topLeftBottomRightNotch : styles.topRightBottomLeftNotch,
      )}>
      <div style={{ height: '26.091875rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ margin: '7.75rem 3.4375rem' }}>
          <img style={{ width: '100%', height: '100%' }} src={ryuLogoAnimation} />
        </div>
      </div>
    </div>
  );
};
