import React from 'react';
import Head from 'next/head';

import Login from '../src/components/auth/Login';
import { checkAuth } from '../src/utils/helpers';

const LoginPage = () => (
  <div>
    <Head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>Login | Easy Expense</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Login />
  </div>
);

LoginPage.getInitialProps = async ctx => checkAuth(ctx, 'checkSignedIn');

export default LoginPage;
