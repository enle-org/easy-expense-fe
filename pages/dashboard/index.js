import React from 'react';
import Head from 'next/head';

import Dashboard from '../../src/components/dashboard/Dashboard';
import { withAuthSync } from '../../src/utils/serverAuth';
import { checkAuth } from '../../src/utils/helpers';

const DashboardPage = () => (
  <div>
    <Head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>Dashboard | Easy Expense</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Dashboard />
  </div>
);

DashboardPage.getInitialProps = async ctx => checkAuth(ctx);

export default withAuthSync(DashboardPage);
