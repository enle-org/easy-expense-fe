import React from 'react';
import Link from 'next/link';

const Login = () => (
  <div className="authWrapper">
    <main className="recoveryWrapper">
      <div className="brand">
        <Link href="/" as="/">
          <img src="/logo.png" alt="Easy Expense logo" />
        </Link>
      </div>
      <div className="pageContent">
        <h1 className="pageTitle">Password Recovery</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor.
        </p>
      </div>
      <form action="#" className="eEForm">
        <div className="formGroup">
          <label htmlFor="recoveryEmail">Email</label>
          <input
            type="email"
            name="email"
            id="recoveryEmail"
            placeholder="Enter email"
          />
        </div>
        <Link href="/login" as="/login">
          <button type="submit" className="button button__primary">
            Submit
          </button>
        </Link>
      </form>
      <div className="toggleAuthPage">
        <p>
          <Link href="/login" as="/login">
            <a href="#">Back to login</a>
          </Link>
        </p>
      </div>
    </main>
  </div>
);

export default Login;
