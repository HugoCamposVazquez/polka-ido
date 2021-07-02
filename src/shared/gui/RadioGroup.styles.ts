import { styled } from '../../utils/css';

export const radioLabelStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-size: 16px;
`;

export const radioStyle = (color: string) => styled.cssClassName`
  .ant-radio-checked .ant-radio-inner {
    border-color: ${color};
  }

  .ant-radio-checked .ant-radio-inner:after {
    background-color: ${color};
  }
`;
