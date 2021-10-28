import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { useSaleFactoryContract } from '../../hooks/web3/contract/useSaleFactoryContract';
import { Header } from '../../shared/insets/admin/Header';
import { LoadingData } from '../../shared/LoadingData';
import { styled } from '../../utils/css';
import { AdminPage } from '../Admin/AdminPage';
import { AdminProjectPage } from '../Admin/AdminProjectPage';

const adminRouterStyle = styled.cssStyle`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  color: black;
`;

export const AdminRouter = (): any => {
  const { account } = useWeb3React();
  const salFactoryContract = useSaleFactoryContract();

  const [adminAddress, setAdminAddress] = useState<string>();

  useEffect(() => {
    (async () => {
      const ownerAddress = await salFactoryContract?.owner();

      if (ownerAddress) {
        setAdminAddress(ownerAddress);
      }
    })();
  });

  if (adminAddress && account && account !== adminAddress) {
    return <Redirect to="/" />;
  }

  if (!adminAddress) {
    return <LoadingData />;
  }

  return (
    <div style={adminRouterStyle}>
      <Header />
      <Switch>
        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/admin/project" component={AdminProjectPage} />
        <Route exact path="/admin/project/:id" component={AdminProjectPage} />
        <Redirect from="/" to="/admin" />
      </Switch>
    </div>
  );
};
