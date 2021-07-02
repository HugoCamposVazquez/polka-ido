import { sideColor, sideColor2 } from '../utils/colorsUtil';
import { styled } from '../utils/css';

export const titleSectionStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 18px;
  color: ${sideColor2};
`;

export const fieldSectionStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 600;
  font-size: 16px;
  margin-left: 16px;
  margin-bottom: 12px;
  color: ${sideColor};
`;

export const adminProjectPageContainerStyle = styled.cssStyle`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const titleContainerStyle = styled.cssStyle`
  margin: 100px 120px 0;
  display: flex;
`;

export const titleStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 24px;
  flex: 1;
`;
export const deleteProjectTextStyle = styled.cssStyle`
  min-width: fit-content;
  margin-right: 6px;
  color: ${sideColor};
`;
export const deleteProjectParentStyle = styled.cssStyle`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const formContainerStyle = styled.cssStyle`
  margin: 38px 120px 120px 120px;
`;
export const sectionContainerStyle = styled.cssStyle`
  margin-top: 24px;
  display: flex;
`;

export const fieldTitleWithMarginStyle = styled.cssStyle`
  display: flex;
  flex-direction: column;
  margin-right: 24px;
`;

export const fieldTitleNoMarginStyle = styled.cssStyle`
  display: flex;
  flex-direction: column;
`;
export const checkBoxParentStyle = styled.cssStyle`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
`;
export const radioContainerStyle = styled.cssStyle`
  flex: 0.6;
  display: flex;
  margin-right: 12px;
`;
export const radioParentStyle = styled.cssStyle`
  flex: 1;
  display: flex;
  align-items: center;
`;
export const checkBoxContainerStyle = styled.cssStyle`
  flex: 0.1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const lineStyle = styled.cssStyle`
  height: 1px;
  width: 100%;
  background-color: ${sideColor};
  margin-top: 36px;
`;
