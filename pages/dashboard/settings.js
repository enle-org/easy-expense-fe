import React from 'react';
import Head from 'next/head';

import Settings from '../../src/components/dashboard/Settings';
import { withAuthSync } from '../../src/utils/serverAuth';
import { checkAuth } from '../../src/utils/helpers';

const SettingsPage = () => (
  <div>
    <Head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>Settings | Easy Expense</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Settings />
  </div>
);

SettingsPage.getInitialProps = async ctx => checkAuth(ctx);

export default withAuthSync(SettingsPage);
