import React from 'react';
import Head from 'next/head';

import Receipts from '../../src/components/dashboard/Receipts';
import { withAuthSync } from '../../src/utils/serverAuth';
import { checkAuth } from '../../src/utils/helpers';

const SettingsPage = () => (
  <div>
    <Head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>Receipts | Easy Expense</title>
      <link rel="icon" href="/favicon.ico" />

      <script
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        type="text/javascript"
      />
    </Head>

    <Receipts />
  </div>
);

SettingsPage.getInitialProps = async ctx => checkAuth(ctx);

export default withAuthSync(SettingsPage);
