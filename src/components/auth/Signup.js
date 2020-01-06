import React from 'react';

const Signup = () => (
  <div className="authWrapper authWrapper__signup">
    <main>
      <div className="brand">
        <img src="/logo.svg" alt="Easy Expense logo" />
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
            onBlur="resetFormGroupState()"
            onFocus="focusFormGroup(event)"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            onBlur="resetFormGroupState()"
            onFocus="focusFormGroup(event)"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            onBlur="resetFormGroupState()"
            onFocus="focusFormGroup(event)"
          />
        </div>
        <button type="submit" className="button button__primary">
          Sign up
        </button>
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
          <a href="#"> Sign in</a>
        </p>
      </div>
    </main>
  </div>
);

export default Signup;
