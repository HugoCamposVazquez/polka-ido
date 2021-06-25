import { sideColor } from '../../utils/colorsUtil';
import { styled } from '../../utils/css';

export const inputParentStyle = styled.cssStyle`
  display: flex;
  flex: 1;
`;

export const inputClassName = styled.cssClassName`
  flex: 1;
  background-color: transparent;
  outline: 0;
  border-width: 0.06rem;
  border-color: ${sideColor};
  color: ${sideColor};
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 0.25rem;
  padding-top: 0.25rem;
  font-family: Titillium Web;
  font-size: 1rem;
  line-height: 2.5rem;
  border-style: solid;
  resize: none;

  ::-webkit-input-placeholder {
    /* Edge */
    color: ${sideColor};
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${sideColor};
  }

  ::placeholder {
    color: ${sideColor};
  }
`;
