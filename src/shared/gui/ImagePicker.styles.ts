import { sideColor } from '../../utils/colorsUtil';
import { styled } from '../../utils/css';

export const imageStyle = styled.cssStyle`
  height: 48px;
  width: 48px;
  margin-right: 6px;
  margin-top: 6px;
  object-fit: cover;
`;

export const imageParentStyle = styled.cssStyle`
  position: relative;
`;
export const imageContainerStyle = styled.cssStyle`
  display: flex;
  margin-left: 16px;
`;
export const removeIconStyle = styled.cssStyle`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

export const uploadImageButtonStyle = styled.cssStyle`
  margin-left: 16px;
  color: ${sideColor};
  border-color: ${sideColor};
  font-size: 12px;
  width: 102px;
  height: 34px;
`;
