import 'antd/dist/antd.css';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';
import '@fontsource/odibee-sans';
import '@fontsource/titillium-web';

import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { MainRouter } from './pages/routers/MainRouter';
import * as serviceWorker from './serviceWorker';
import { ErrorBoundary } from './shared/wrappers/ErrorBoundary';
import { ScrollToTop } from './utils/scrollToTopUtil';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLibrary(provider: any): Web3Provider {
  return new Web3Provider(provider);
}

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <ScrollToTop>
        <Web3ReactProvider getLibrary={getLibrary}>
          <MainRouter />
        </Web3ReactProvider>
      </ScrollToTop>
    </BrowserRouter>
  </ErrorBoundary>,

  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
