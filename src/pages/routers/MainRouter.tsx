import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { useEagerConnect } from '../../hooks/web3/useEagerConnect';
import { AdminRouter } from './AdminRouter';
import { UserRouter } from './UserRouter';

export const MainRouter = (): any => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const triedEager = useEagerConnect();
  // TODO: use loading until tried eager is true

  return (
    <Switch>
      {<Route path="/admin" component={AdminRouter} />}
      {<Route component={UserRouter} />}
    </Switch>
  );
};
