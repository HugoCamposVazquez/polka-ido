import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useSingleProject } from '../../hooks/apollo/useSingleProject';
import { useReadIPFS } from '../../hooks/ipfs/useReadIPFS';
import { ProjectMetadata, SalesDto } from '../../types/ProjectType';
import { convertToProjectType } from '../../utils/editProject';
import * as styles from './AdminProjectPage.styles';
import { ProjectForm } from './ProjectForm';

interface IProps {
  onSuccessfulCreated?: (receipt: string) => void;
}

type IParams = {
  id: string | undefined;
};

export const AdminProjectPage = ({ onSuccessfulCreated }: IProps) => {
  const navigation = useHistory();
  const [fallback, setFallback] = useState<SalesDto | undefined>();

  const { id } = useParams<IParams>();

  const { data: project, loading: projectLoading } = useSingleProject(id, fallback);

  const { data: metaData, loading: metaLoading } = useReadIPFS<ProjectMetadata>(project?.metadataURI);

  useEffect(() => {
    // Project that needs to be edited is not found
    if (id && !projectLoading && project === undefined) {
      navigation.push('/admin');
    }
  }, []);

  if (projectLoading) {
    return <Spin style={styles.spinnerStyle} size="large" />;
  }

  const handleOnSuccessfulCreated = (receipt: string, data: SalesDto) => {
    if (navigation.location.pathname === '/admin/project') {
      setFallback(data);
      onSuccessfulCreated && onSuccessfulCreated(receipt);
    }
  };

  return (
    <div style={styles.adminProjectPageContainerStyle}>
      <div style={styles.titleContainerStyle}>
        <div style={styles.titleStyle}>{id !== undefined ? 'Edit project' : 'New project'}</div>
      </div>
      <ProjectForm
        defaultProjectData={convertToProjectType(project, metaData, id)}
        loadingProjectData={projectLoading && metaLoading}
        onSuccessfulCreated={handleOnSuccessfulCreated}
        projectId={id}
      />
    </div>
  );
};
