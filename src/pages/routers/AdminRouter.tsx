import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Header } from '../../shared/insets/admin/Header';
import { styled } from '../../utils/css';
import { AdminPage } from '../AdminPage';
import { AdminProjectPage } from '../AdminProjectPage';

const adminRouterStyle = styled.cssStyle`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  color: black;
`;

export const AdminRouter = (): any => {
  return (
    <div style={adminRouterStyle}>
      <Header />
      <Switch>
        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/admin/project" component={AdminProjectPage} />
        <Redirect from="/" to="/admin" />
      </Switch>
    </div>
  );
};
