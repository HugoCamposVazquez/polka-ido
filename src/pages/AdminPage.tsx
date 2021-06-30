import { Spin, Table, TablePaginationConfig } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useProjects } from '../api/api/api';
import binImage from '../assets/bin_image.svg';
import starEmpty from '../assets/star_empty.svg';
import startFill from '../assets/star_fill.svg';
import { EditableCell } from '../shared/EditableCell';
import { sideColor, sideColor3, sideColor5 } from '../utils/colorsUtil';
import { styled } from '../utils/css';

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

const tableContainerParentStyle = styled.cssStyle`
  display: flex;
  background-color: transparent;
  //height: calc(100vh - 206px);
  flex: 1;
  margin-top: 22px;
  margin-left: 120px;
  margin-right: 120px;
  margin-bottom: 24px;
`;

const tableContainerStyle = styled.cssStyle`
  flex: 1;
  overflow-x: auto;
`;

const components = {
  body: {
    cell: (props: any) => {
      return <EditableCell {...props} />;
    },
  },
};

const tableClassName = styled.cssClassName`
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

const spinnerStyle = styled.cssStyle`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const getAllColumns = () => {
  return [
    {
      title: 'Project',
      dataIndex: 'title',
      width: '300px',
      renderRepresentation: (cellProps: any) => (
        // <NameRepresentation
        //     {...cellProps}
        //     value={cellProps.record!.fromEmployee.name}
        //     avatar={cellProps.record!.fromEmployee.avatar}
        //     cellStyle={getTaskDefaultStyle(cellProps.record!.status.name, taskStatuses)}
        // />
        <div style={{ display: 'flex' }}>
          <img
            style={{ height: '24px', width: '24px', objectFit: 'cover', marginRight: '12px' }}
            src={cellProps.record.iconUrl}
          />
          <div>{cellProps.record.title}</div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '150px',
      renderRepresentation: (cellProps: any) => <div>{cellProps.record.status}</div>,
    },
    {
      title: 'Starts',
      dataIndex: 'startDate',
      width: '150px',
      renderRepresentation: (cellProps: any) => <div>{cellProps.record.startDate}</div>,
    },
    {
      title: 'Ends',
      dataIndex: 'endDate',
      width: '150px',
      renderRepresentation: (cellProps: any) => <div>{cellProps.record.endDate}</div>,
    },
    {
      title: 'Raise amount',
      dataIndex: 'raiseAmountTotal',
      width: '150px',
      renderRepresentation: (cellProps: any) => <div>{cellProps.record.raiseAmountTotal}</div>,
    },
    {
      title: 'Access',
      dataIndex: 'access',
      width: '150px',
      renderRepresentation: (cellProps: any) => <div>{cellProps.record.access}</div>,
    },
    {
      title: 'Token price',
      dataIndex: 'perToken',
      width: '150px',
      renderRepresentation: (cellProps: any) => <div>{cellProps.record.perToken}</div>,
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      width: '100px',
      renderRepresentation: (cellProps: any) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {cellProps.record.featured ? <img src={startFill} /> : <img src={starEmpty} />}
        </div>
      ),
    },
    {
      title: '',
      width: '80px',
      renderRepresentation: (cellProps: any) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>{<img src={binImage} />}</div>
      ),
    },
  ];
};

export const AdminPage = () => {
  const navigation = useHistory();
  const allColumns = getAllColumns();

  const pagination: TablePaginationConfig = {
    position: ['bottomRight'],
    showSizeChanger: false,
    size: 'small',
    pageSize: 10,
    hideOnSinglePage: true,
  };

  const mappedColumns = allColumns.map((column) => {
    return {
      ...column,
      ellipsis: true,
      onCell: (record: any): any => ({
        column,
        record,
        dataIndex: column.dataIndex,
      }),
    };
  });

  const { data: projects, isLoading: projectsLoading } = useProjects(undefined);

  if (projectsLoading) {
    return <Spin style={spinnerStyle} size="large" />;
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ margin: '100px 147px 0', fontStyle: 'Titillium Web', fontWeight: 700, fontSize: '24px' }}>
        All projects
      </div>
      <div className={addProjectStyle}>Add project</div>
      <div style={tableContainerParentStyle}>
        <div style={tableContainerStyle}>
          <Table
            rowKey={'id'}
            dataSource={projects?.data}
            tableLayout={'fixed'}
            scroll={{ x: 'min-content' }}
            sticky
            pagination={pagination}
            components={components}
            columns={mappedColumns}
            className={tableClassName}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  console.log(record, rowIndex);
                  navigation.push('/admin/project/1');
                }, // click row
              };
            }}
          />
        </div>
      </div>
    </div>
  );
};
