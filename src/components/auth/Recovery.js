import React from 'react';

const Login = () => (
  <div className="authWrapper">
    <main className="recoveryWrapper">
      <div className="brand">
        <img src="/logo.svg" alt="Easy Expense logo" />
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
            onBlur="resetFormGroupState()"
            onFocus="focusFormGroup(event)"
          />
        </div>
        <button type="submit" className="button button__primary">
          Submit
        </button>
      </form>
      <div className="toggleAuthPage">
        <p>
          <a href="#">Back to login</a>
        </p>
      </div>
    </main>
  </div>
);

export default Login;
