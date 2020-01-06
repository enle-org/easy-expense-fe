import React from 'react';

const Login = () => (
  <div className="authWrapper authWrapper__signin">
    <main>
      <div className="brand">
        <img src="/logo.svg" alt="Easy Expense logo" />
      </div>
      <div className="pageContent">
        <h1 className="pageTitle">Login</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor.
        </p>
      </div>
      <form action="#" className="eEForm">
        <div className="formGroup">
          <label htmlFor="loginEmail">Email</label>
          <input
            type="email"
            name="email"
            id="loginEmail"
            placeholder="Enter email"
            onBlur="resetFormGroupState()"
            onFocus="focusFormGroup(event)"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            name="password"
            id="loginPassword"
            placeholder="Enter password"
            onBlur="resetFormGroupState()"
            onFocus="focusFormGroup(event)"
          />
        </div>
        <div className="formGroups">
          <div className="checkBoxGroup">
            <label htmlFor="rememberMe">Remember me</label>
            <input type="checkbox" name="rememberMe" id="rememberMe" />
          </div>
          <div className="forgotPasswordLink">
            <a href="#" className="link link__primary">
              Forgotten password?
            </a>
          </div>
        </div>
        <button type="submit" className="button button__primary">
          Log in
        </button>
      </form>
      <div className="socialSignup">
        <button type="button" className="button__google">
          <span className="icon icon__google" />
          Log in with Google
        </button>
      </div>
      <div className="toggleAuthPage">
        <p>
          Don&apos;t have an account?
          <a href="#"> Sign up</a>
        </p>
      </div>
    </main>
  </div>
);

export default Login;
