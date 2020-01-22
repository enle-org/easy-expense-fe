import React from 'react';
import App from 'next/app';
import { Provider } from 'mobx-react';
import * as Sentry from '@sentry/browser';

import config from '../config';
import Stores from '../src/stores';
import '../src/assets/styles/main.scss';

Sentry.init({
  dsn: config.SENTRY_DSN,
  environment: config.ENVIRONMENT,
});

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Provider {...Stores}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default MyApp;
