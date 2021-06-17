import './index.css';
import '@fontsource/odibee-sans';
import '@fontsource/titillium-web';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { MainRouter } from './pages/routers/MainRouter';
import * as serviceWorker from './serviceWorker';
import { ErrorBoundary } from './shared/wrappers/ErrorBoundary';
import ScrollToTop from './utils/scroll-to-top';

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <ScrollToTop>
        <MainRouter />
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
