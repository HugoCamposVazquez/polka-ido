import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useProject } from '../../api/api/api';
import binImage from '../../assets/bin_image.svg';
import * as styles from './AdminProjectPage.styles';
import { ProjectForm } from './ProjectForm';

type IProps = {
  id: string | undefined;
};

export const AdminProjectPage = () => {
  const navigation = useHistory();

  const { id } = useParams<IProps>();
  const { data: project, isLoading: projectLoading } = useProject(id);

  useEffect(() => {
    // Project that needs to be edited is not found
    if (id && !projectLoading && project?.data === undefined) {
      navigation.push('/admin');
    }
  }, []);

  if (projectLoading) {
    return <Spin style={styles.spinnerStyle} size="large" />;
  }

  return (
    <div style={styles.adminProjectPageContainerStyle}>
      <div style={styles.titleContainerStyle}>
        <div style={styles.titleStyle}>{id !== undefined ? 'Edit project' : 'New project'}</div>
        {id !== undefined && (
          <div style={styles.deleteProjectParentStyle}>
            <div style={styles.deleteProjectTextStyle}>Delete project</div>
            <img src={binImage} />
          </div>
        )}
      </div>
      <ProjectForm project={project} loadingProjectData={projectLoading} isEdit={!!id} />
    </div>
  );
};
