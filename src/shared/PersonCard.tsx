import React from 'react';

import { sideColor4 } from '../utils/colorsUtil';
import { cs } from '../utils/css';
import * as projectCardStyles from './ProjectCard.styles';

type IProps = {
  direction: 'left' | 'right';
  name: string;
  image: any;
};

export const PersonCard = ({ direction, name, image }: IProps) => {
  return (
    <div
      style={cs(
        projectCardStyles.projectCardContainer,
        direction === 'left' ? projectCardStyles.topLeftBottomRightNotch : projectCardStyles.topRightBottomLeftNotch,
      )}>
      <div style={{ height: '417.47px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
          <img
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            src={image}
          />

          <div style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div
              style={
                direction === 'left'
                  ? cs(
                      { margin: '1rem', backgroundColor: `${sideColor4}`, paddingLeft: '1rem' },
                      { marginLeft: 0, marginRight: '1rem' },
                      projectCardStyles.bottomRightNotch,
                    )
                  : cs(
                      { margin: '1rem', backgroundColor: `${sideColor4}`, paddingLeft: '1.5rem' },
                      { marginLeft: '1rem', marginRight: 0 },
                      projectCardStyles.bottomLeftNotch,
                    )
              }>
              <div
                style={{
                  fontFamily: 'Titillium Web',
                  fontWeight: 700,
                  fontSize: '20px',
                  lineHeight: '30.42px',
                  padding: '12px 0',
                }}>
                {name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
