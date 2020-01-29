import React from 'react';
import Head from 'next/head';
import Reset from '../../src/components/auth/Reset';

const RecoveryPage = () => (
  <div>
    <Head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>Password Reset | Easy Expense</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Reset />
  </div>
);

export default RecoveryPage;
