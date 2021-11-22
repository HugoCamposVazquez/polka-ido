import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useSingleProject } from '../../hooks/apollo/useSingleProject';
import { useReadIPFS } from '../../hooks/ipfs/useReadIPFS';
import { ProjectMetadata } from '../../types/ProjectType';
import { convertToProjectType } from '../../utils/editProject';
import * as styles from './AdminProjectPage.styles';
import { ProjectForm } from './ProjectForm';

type IProps = {
  id: string | undefined;
};

export const AdminProjectPage = () => {
  const navigation = useHistory();

  const { id } = useParams<IProps>();

  const { data: project, loading: projectLoading } = useSingleProject(id);

  const { data: metaData } = useReadIPFS<ProjectMetadata>(project?.metadataURI);

  useEffect(() => {
    // Project that needs to be edited is not found
    if (id && !projectLoading && project === undefined) {
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
      </div>
      <ProjectForm
        defaultProjectData={convertToProjectType(project, metaData, id)}
        loadingProjectData={projectLoading}
        projectId={id}
      />
    </div>
  );
};
