import React from 'react';
import App from 'next/app';
import { Provider } from 'mobx-react';

import Stores from '../src/stores';
import '../src/assets/styles/main.scss';

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
