import { styled } from '../../utils/css';

export const inputParentStyle = styled.cssStyle`
  display: flex;
  flex: 1;
`;

export const inputClassName = (color: string) => styled.cssClassName`
  flex: 1;
  background-color: transparent;
  outline: 0;
  border-width: 0.06rem;
  border-color: ${color};
  color: ${color};
  padding: 0.25rem 0.5rem;
  font-family: Titillium Web;
  font-size: 1rem;
  line-height: 2.5rem;
  border-style: solid;
  resize: none;

  ::-webkit-input-placeholder {
    /* Edge */
    color: ${color};
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${color};
  }

  ::placeholder {
    color: ${color};
  }
`;
