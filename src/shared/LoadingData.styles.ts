import { sideColor4 } from '../utils/colorsUtil';
import { styled } from '../utils/css';

export const loadingDataContainerStyle = styled.cssStyle`
  width: 100%;
  height: 100%;
  background-color: ${sideColor4};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const loadingDataStyle = styled.cssClassName`
  width: 512px;
  height: 512px;

  @media (max-width: 51.875rem) {
    width: 100%;
    height: auto;
  }
`;
