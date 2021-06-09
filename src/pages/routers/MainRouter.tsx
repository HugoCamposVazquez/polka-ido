import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Footer } from '../../shared/Footer';
import { Header } from '../../shared/Header';
import { HomePage } from '../HomePage';
import { LaunchpadPage } from '../LanchpadPage';

export const MainRouter = (): any => {
  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <Header />
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/launchpad" component={LaunchpadPage} />
        <Redirect from="/" to="/home" />
      </Switch>
      <Footer />
    </div>
  );
};
