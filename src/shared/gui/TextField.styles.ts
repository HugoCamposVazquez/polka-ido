import { styled } from '../../utils/css';

export const inputParentStyle = styled.cssStyle`
  display: flex;
  flex: 1;
`;

export const inputClassName = (color: string, placeholderColor: string) => styled.cssClassName`
  flex: 1;
  width: 100%;
  background-color: transparent;
  outline: 0;
  border-color: ${color};
  color: ${color};
  padding: 0.25rem 0.5rem;
  font-family: Titillium Web;
  font-size: 1rem;
  line-height: 1.5rem;
  border-style: solid;

  ::-webkit-input-placeholder {
    /* Edge */
    color: ${placeholderColor};
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${placeholderColor};
  }

  ::placeholder {
    color: ${placeholderColor};
  }
`;
