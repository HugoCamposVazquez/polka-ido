import { sideColor3, sideColor5 } from '../../../utils/colorsUtil';
import { styled } from '../../../utils/css';

const headerHeight = 4.75;

export const ryuTextStyle = styled.cssStyle`
  font-weight: 400;
  line-height: 0;
  font-size: 1.5rem;
  font-family: Odibee Sans;
  flex: 1;
  cursor: pointer;
`;

export const headerContentStyle = styled.cssStyle`
  position: relative;
  padding-left: 7.5rem;
  padding-right: 7.5rem;
  display: flex;
  align-items: center;
  flex: 1;
`;

export const headerContainerStyle = styled.cssStyle`
  height: ${headerHeight.toString()}rem;
  width: 100%;
  position: relative;
  z-index: 2000;
  display: flex;
  align-items: center;
  border-bottom: 0.06rem solid ${sideColor3};
  background-color: ${sideColor5};
`;

export const headerContainerParentStyle = styled.cssStyle`
  flex: 1;
  position: fixed;
  width: 100%;
  z-index: 2000;
  display: flex;
  flex-direction: column;
`;
