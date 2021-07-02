import { sideColor } from '../../utils/colorsUtil';
import { styled } from '../../utils/css';

export const imageStyle = styled.cssStyle`
  height: 3rem;
  width: 3rem;
  margin-right: 0.375rem;
  margin-top: 0.375rem;
  object-fit: cover;
`;

export const imageParentStyle = styled.cssStyle`
  position: relative;
`;
export const imageContainerStyle = styled.cssStyle`
  display: flex;
  margin-left: 1rem;
`;
export const removeIconStyle = styled.cssStyle`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

export const uploadImageButtonStyle = styled.cssStyle`
  margin-left: 1rem;
  color: ${sideColor};
  border-color: ${sideColor};
  font-size: 0.75rem;
  width: 6.375rem;
  height: 2.125rem;
`;
