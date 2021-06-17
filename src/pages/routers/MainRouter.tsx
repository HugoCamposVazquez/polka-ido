import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Footer } from '../../shared/insets/Footer';
import { Header } from '../../shared/insets/Header';
import { HomePage } from '../HomePage';
import { LaunchpadPage } from '../LanchpadPage';
import { ProjectDetailsPage } from '../ProjectDetailsPage';

export const MainRouter = (): any => {
  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <Header />
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/launchpad" component={LaunchpadPage} />
        <Route exact path="/project/:id" component={ProjectDetailsPage} />
        <Redirect from="/" to="/home" />
      </Switch>
      <Footer />
    </div>
  );
};
