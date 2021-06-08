import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Sidebar } from '../../shared/navigators/Sidebar';
import { HomePage } from '../HomePage';
import { LaunchpadPage } from '../LanchpadPage';

export const MainRouter = (): any => {
  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <Sidebar />
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/launchpad" component={LaunchpadPage} />
        <Redirect from="/" to="/home" />
      </Switch>
    </div>
  );
};
