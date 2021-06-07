import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { HomePage } from '../HomePage';
import { LaunchpadPage } from '../LanchpadPage';

export const MainRouter = (): any => {
  return (
    <Switch>
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/launchpad" component={LaunchpadPage} />
      <Redirect from="/" to="/home" />
    </Switch>
  );
};
