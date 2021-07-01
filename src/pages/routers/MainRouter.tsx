import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AdminRouter } from './AdminRouter';
import { UserRouter } from './UserRouter';

export const MainRouter = (): any => {
  return (
    <Switch>
      {<Route path="/admin" component={AdminRouter} />}
      {<Route component={UserRouter} />}
    </Switch>
  );
};
