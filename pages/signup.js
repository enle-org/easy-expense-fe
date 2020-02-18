import React from 'react';
import Head from 'next/head';

import Signup from '../src/components/auth/Signup';
import { checkAuth } from '../src/utils/helpers';

const SignupPage = () => (
  <div>
    <Head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>Sign Up | Easy Expense</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Signup />
  </div>
);

SignupPage.getInitialProps = async ctx => checkAuth(ctx, 'checkSignedIn');

export default SignupPage;
