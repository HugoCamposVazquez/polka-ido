import { Spin, Table, TablePaginationConfig } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useProjects } from '../../hooks/apollo/useProjects';
import { getCombinedProjectData } from '../../services/combinedProjectData';
import { EditableCell } from '../../shared/EditableCell';
import { FullProjectData } from '../../types/ProjectType';
import { getAllColumns } from '../../utils/tableColumnsUtil';
import * as styles from './AdminPage.styles';

const components = {
  body: {
    cell: (props: any) => {
      return <EditableCell {...props} />;
    },
  },
};

const pagination: TablePaginationConfig = {
  position: ['bottomRight'],
  showSizeChanger: false,
  size: 'small',
  pageSize: 10,
  hideOnSinglePage: true,
};

export const AdminPage = () => {
  const navigation = useHistory();
  const allColumns = getAllColumns();
  const [combinedProjectsData, setCombinedProjectsData] = useState<FullProjectData[]>([]);

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

  const { data: projects, loading: projectsLoading } = useProjects();

  useEffect(() => {
    const setProjectData = async () => {
      if (projects) {
        const combinedData = await getCombinedProjectData(projects);
        if (combinedData) setCombinedProjectsData(combinedData);
      }
    };
    setProjectData();
  }, [projects]);

  if (projectsLoading) {
    return <Spin style={styles.spinnerStyle} size="large" />;
  }

  return (
    <div style={styles.adminPageContainerStyle}>
      <div style={styles.allProjectsTextStyle}>All projects</div>
      <div
        className={styles.addProjectStyle}
        onClick={() => {
          navigation.push('/admin/project');
        }}>
        Add project
      </div>
      <div style={styles.tableContainerParentStyle}>
        <div style={styles.tableContainerStyle}>
          <Table
            rowKey={'id'}
            dataSource={combinedProjectsData}
            tableLayout={'fixed'}
            scroll={{ x: 'min-content' }}
            sticky
            pagination={pagination}
            components={components}
            columns={mappedColumns}
            className={styles.tableClassName}
            onRow={(record) => {
              return {
                onDoubleClick: () => {
                  navigation.push(`/admin/project/${record.id}`);
                },
              };
            }}
          />
        </div>
      </div>
    </div>
  );
};
