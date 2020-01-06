import React from 'react';
import Head from 'next/head';
import Recovery from '../src/components/auth/Recovery';

const RecoveryPage = () => (
  <div>
    <Head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>Account Recovery | Easy Expense</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Recovery />
  </div>
);

export default RecoveryPage;
