import { sideColor, sideColor2, sideColor6 } from '../../utils/colorsUtil';
import { styled } from '../../utils/css';

export const titleSectionStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 1.125rem;
  color: ${sideColor2};
`;

export const fieldSectionStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 600;
  font-size: 1rem;
  margin-left: 1rem;
  margin-bottom: 0.75rem;
  color: ${sideColor6};
`;

export const adminProjectPageContainerStyle = styled.cssStyle`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const titleContainerStyle = styled.cssStyle`
  margin: 6.25rem 13.875rem 0;
  display: flex;
`;

export const titleStyle = styled.cssStyle`
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 1.5rem;
  flex: 1;
`;
export const deleteProjectTextStyle = styled.cssStyle`
  min-width: fit-content;
  margin-right: 0.375rem;
  color: ${sideColor};
`;
export const deleteProjectParentStyle = styled.cssStyle`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const formContainerStyle = styled.cssStyle`
  margin: 2.375rem 13.875rem 7.5rem 13.875rem;
`;
export const sectionContainerStyle = styled.cssStyle`
  margin-top: 1.5rem;
  display: flex;
`;

export const spinnerStyle = styled.cssStyle`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const fieldTitleWithMarginStyle = styled.cssStyle`
  display: flex;
  flex-direction: column;
  margin-right: 1.5rem;
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
  margin-left: 1rem;
`;
export const radioContainerStyle = styled.cssStyle`
  flex: 0.6;
  display: flex;
  margin-right: 0.75rem;
`;
export const radioParentStyle = styled.cssStyle`
  flex: 1;
  display: flex;
  align-items: center;
`;
export const checkBoxContainerStyle = styled.cssStyle`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const lineStyle = styled.cssStyle`
  height: 0.0625rem;
  width: 100%;
  background-color: ${sideColor};
  margin-top: 2.25rem;
`;
