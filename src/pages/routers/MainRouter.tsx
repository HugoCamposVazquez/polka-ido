import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Header } from '../../shared/insets/Header';
import { styled } from '../../utils/css';
import { HomePage } from '../HomePage';
import { LaunchpadPage } from '../LanchpadPage';
import { ProjectDetailsPage } from '../ProjectDetailsPage';

const mainRouterStyle = styled.cssStyle`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const MainRouter = (): any => {
  return (
    <div style={mainRouterStyle}>
      <Header />
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/launchpad" component={LaunchpadPage} />
        <Route exact path="/project/:id" component={ProjectDetailsPage} />
        <Redirect from="/" to="/home" />
      </Switch>
    </div>
  );
};
