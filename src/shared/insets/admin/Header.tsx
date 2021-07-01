import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';

import { sideColor3, sideColor5 } from '../../../utils/colorsUtil';
import { styled } from '../../../utils/css';

const headerHeight = 76;

const ryuTextStyle = styled.cssStyle`
  font-weight: 400;
  line-height: 0;
  font-size: 1.5rem;
  font-family: Odibee Sans;
  flex: 1;
  cursor: pointer;
`;

const headerContentStyle = styled.cssStyle`
  position: relative;
  padding-left: 7.5rem;
  padding-right: 7.5rem;
  display: flex;
  align-items: center;
  flex: 1;
`;

const headerContainerStyle = styled.cssStyle`
  height: ${headerHeight.toString()}px;
  width: 100%;
  position: relative;
  z-index: 2000;
  display: flex;
  align-items: center;
  border-bottom: 0.06rem solid ${sideColor3};
  background-color: ${sideColor5};
`;

const headerContainerParentStyle = styled.cssStyle`
  flex: 1;
  position: fixed;
  width: 100%;
  z-index: 2000;
  display: flex;
  flex-direction: column;
`;

export const Header = withRouter((props) => {
  const navigation = useHistory();

  return (
    <div style={headerContainerParentStyle}>
      <div style={headerContainerStyle}>
        <div style={headerContentStyle}>
          <div
            style={ryuTextStyle}
            onClick={() => {
              // eslint-disable-next-line no-undef
              window.scrollTo(0, 0);
              navigation.push('/admin');
            }}>
            RYU
          </div>
        </div>
      </div>
    </div>
  );
});
