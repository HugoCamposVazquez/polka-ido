import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Header } from '../../shared/insets/user/Header';
import { styled } from '../../utils/css';
import { AboutUsPage } from '../AboutUsPage';
import { HomePage } from '../HomePage';
import { JoinProjectPage } from '../JoinProject/JoinProjectPage';
import { LaunchpadPage } from '../LaunchpadPage';
import { ProjectDetailsPage } from '../ProjectDetailsPage';

const userRouterStyle = styled.cssStyle`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: black;
  color: white;
`;

export const UserRouter = (): any => {
  return (
    <div style={userRouterStyle}>
      <Header />
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/launchpad" component={LaunchpadPage} />
        <Route exact path="/project/:id" component={ProjectDetailsPage} />
        <Route exact path="/project/:id/join" component={JoinProjectPage} />
        <Route exact path="/about" component={AboutUsPage} />
        <Redirect from="/" to="/home" />
      </Switch>
    </div>
  );
};
