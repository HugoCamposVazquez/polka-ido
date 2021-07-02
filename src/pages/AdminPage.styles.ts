import { sideColor, sideColor3, sideColor5 } from '../utils/colorsUtil';
import { styled } from '../utils/css';

export const tableClassName = styled.cssClassName`
  .ant-table-tbody > tr > td * {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ant-table-tbody .ant-table-cell > div {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .ant-table-thead > tr > th {
    background-color: white;
  }

  .ant-table {
    height: calc(100vh - 271px);
    overflow-y: auto;
    border: 1px solid ${sideColor};
  }

  .ant-pagination {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .ant-table-tbody > tr.ant-table-row:hover > td {
    cursor: pointer;
  }

  .ant-pagination-item {
    border: 1px solid ${sideColor3} !important;
    margin: 0px 2px !important;
  }

  .ant-pagination-item-active {
    background-color: ${sideColor3};
  }

  .ant-pagination-item a {
    color: ${sideColor3};
  }

  .ant-pagination-item-active a {
    color: ${sideColor5};
  }

  .ant-table-thead > tr > th {
    color: ${sideColor};
  }

  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    width: 0px;
  }
`;

export const adminPageContainerStyle = styled.cssStyle`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const allProjectsTextStyle = styled.cssStyle`
  margin: 100px 147px 0;
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 24px;
`;

export const spinnerStyle = styled.cssStyle`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const addProjectStyle = styled.cssClassName`
  display: flex;
  margin: 22px 147px 0;
  font-family: Titillium Web;
  font-weight: 700;
  font-size: 16px;
  color: ${sideColor3};
  cursor: pointer;

  :before {
    content: '+';
    display: inline-block;
    background-color: transparent;
    vertical-align: middle;
    margin-right: 4px;
  }
`;

export const tableContainerParentStyle = styled.cssStyle`
  display: flex;
  background-color: transparent;
  //height: calc(100vh - 206px);
  flex: 1;
  margin-top: 22px;
  margin-left: 120px;
  margin-right: 120px;
  margin-bottom: 24px;
`;

export const tableContainerStyle = styled.cssStyle`
  flex: 1;
  overflow-x: auto;
`;
