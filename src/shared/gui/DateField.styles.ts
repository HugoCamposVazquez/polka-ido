import { styled } from '../../utils/css';

export const inputClassName = (color: string, placeholderColor: string) => styled.cssClassName`
  flex: 1;
  width: 100%;
  background-color: transparent;
  outline: 0;
  border-color: ${placeholderColor};
  color: ${color};
  padding: 0.25rem 0.5rem;
  font-family: Titillium Web;
  font-size: 1rem;
  line-height: 1.5rem;
  border-style: solid;
  border-width: 0.062rem;

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
