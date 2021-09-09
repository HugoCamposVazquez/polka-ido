import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';

import backToProject from '../../assets/back_to_project.svg';
import { useSingleProject } from '../../hooks/apollo/useSingleProject';
import { useReadIPFS } from '../../hooks/ipfs/useReadIPFS';
import { Footer } from '../../shared/insets/user/Footer';
import { ProjectMetadata } from '../../types/ProjectType';
import { JoinProjectForm } from './JoinProjectForm';
import * as styles from './JoinProjectPage.styles';

export const JoinProjectPage = () => {
  const navigation = useHistory();
  const { id }: { id: string } = useParams();

  const { data } = useSingleProject(id);
  const { data: metaData } = useReadIPFS<ProjectMetadata>(data?.sales[0].metadataURI);

  return (
    <>
      <div style={styles.titleContainerStyle}>
        <div className={styles.backToProjectContainerStyle} onClick={() => navigation.goBack()}>
          <img src={backToProject} />
          <div style={styles.backToProjectsTextStyle}>Back to project</div>
        </div>
        <div style={styles.projectTitleStyle}>{metaData ? metaData.title : 'Project'}</div>
      </div>
      <div style={styles.formContainerStyle}>
        <div style={styles.topLeftBottomRightNotch} className={styles.cardStyle}>
          <JoinProjectForm />
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};
