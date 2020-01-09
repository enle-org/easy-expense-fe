import React from 'react';
import Link from 'next/link';

const Signup = () => (
  <div className="authWrapper authWrapper__signup">
    <main>
      <div className="brand">
        <Link href="/" as="/">
          <img src="/logo.png" alt="Easy Expense logo" />
        </Link>
      </div>
      <div className="pageContent">
        <h1 className="pageTitle">Sign Up</h1>
        <p>
          You can register as an organisation expense approver or an organisation
          member.
        </p>
      </div>
      <form action="#" className="eEForm">
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>
        <Link href="/dashboard" as="/dashboard">
          <button type="submit" className="button button__primary">
            Sign up
          </button>
        </Link>
      </form>
      <div className="socialSignup">
        <button type="button" className="button__google">
          <span className="icon icon__google" />
          Sign up with Google
        </button>
      </div>
      <div className="toggleAuthPage">
        <p>
          Already have an account?
          <Link href="/login" as="/login">
            <a href="#"> Sign in</a>
          </Link>
        </p>
      </div>
    </main>
  </div>
);

export default Signup;
