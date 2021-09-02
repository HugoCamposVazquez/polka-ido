import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';

import { useProject } from '../api/api/api';
import binImage from '../assets/bin_image.svg';
import * as styles from './Admin/AdminProjectPage.styles';
import { ProjectForm } from './Admin/ProjectForm';

type IProps = {
  id: string | undefined;
};

export const AdminProjectPage = () => {
  const navigation = useHistory();

  const { id } = useParams<IProps>();

  const { data: project, isLoading: projectLoading } = useProject(id);

  const methods = useForm();

  useEffect(() => {
    if (!projectLoading) {
      if (project?.data === undefined) {
        if (id !== undefined) {
          navigation.push('/admin');
        } else {
          methods.reset({
            status: 'upcoming',
            access: 'whitelist',
          });
        }
      } else {
        methods.reset({
          ...project?.data,
          status: project?.data?.status,
          access: project?.data?.access,
        });
      }
    }
  }, [projectLoading]);

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
