import React from 'react';
import { useHistory } from 'react-router-dom';

import backToProject from '../../assets/back_to_project.svg';
import { Footer } from '../../shared/insets/user/Footer';
import { JoinProjectForm } from './JoinProjectForm';
import * as styles from './JoinProjectPage.styles';

export const JoinProjectPage = () => {
  const navigation = useHistory();

  return (
    <>
      <div style={styles.titleContainerStyle}>
        <div className={styles.backToProjectContainerStyle} onClick={() => navigation.goBack()}>
          <img src={backToProject} />
          <div style={styles.backToProjectsTextStyle}>Back to project</div>
        </div>
        <div style={styles.projectTitleStyle}>My project 1</div>
      </div>
      <div style={styles.formContainerStyle}>
        <div style={styles.topLeftBottomRightNotch} className={styles.cardStyle}>
          <JoinProjectForm />
        </div>
      </div>
      <Footer />
    </>
  );
};
