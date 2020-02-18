import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';

import { renderIf, getLoader } from '../../utils/helpers';
import Icons from '../common/icons';
import config from '../../../config';
import CustomStyles from '../common/commonStyles';

@inject('authStore')
@observer
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      window: false,
    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.setState({ window });
  }

  closeModal() {
    this.props.authStore.setClassProps(
      [
        {
          name: 'visible',
          value: false,
        },
        {
          name: 'message',
          value: '',
        },
      ],
      this.props.authStore.loginErrors,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  responseGoogle(self, response) {
    if (response.profileObj && window) {
      response.profileObj.password = window.btoa(
        unescape(encodeURIComponent(response.profileObj.email)),
      );

      self.props.authStore.login(null, 'googleAuth', response.profileObj);
    }
  }

  render() {
    Modal.setAppElement('body');
    return (
      <div className="authWrapper authWrapper__signin">
        {this.props.authStore.loginLoading.visible
          ? getLoader(this)
          : getLoader(this, true)}
        <main>
          <div className="brand">
            <Link href="/" as="/">
              <img src="/logo.svg" alt="Easy Expense logo" />
            </Link>
          </div>
          <div className="pageContent">
            <h1 className="pageTitle">Login</h1>
            <p>
              Login to your Easy Expense account. Don’t have an account? Sign
              Up.
            </p>
          </div>
          {renderIf(
            this.props.authStore.loginValidationErrors.visible,
            <p className="error-text m-b-sm">
              <em>
                {`Error: ${this.props.authStore.loginValidationErrors.message}`}
              </em>
            </p>,
          )}
          <form
            onSubmit={e => {
              this.props.authStore.login(e, 'local');
            }}
            className="eEForm"
          >
            <div className="formGroup">
              <label htmlFor="loginEmail">Email Address</label>
              <input
                type="email"
                name="email"
                id="loginEmail"
                placeholder="Enter email"
                value={this.props.authStore.loginData.email}
                onChange={event => {
                  this.props.authStore.setClassProps(
                    [
                      {
                        name: 'email',
                        value: event.target.value,
                      },
                    ],
                    this.props.authStore.loginData,
                  );
                  this.props.authStore.validateEmail(
                    'loginData',
                    'loginValidationErrors',
                  );
                }}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="loginPassword">Password</label>
              <input
                type="password"
                name="password"
                id="loginPassword"
                placeholder="Enter password"
                value={this.props.authStore.loginData.password}
                onChange={event => {
                  this.props.authStore.setClassProps(
                    [
                      {
                        name: 'password',
                        value: event.target.value,
                      },
                    ],
                    this.props.authStore.loginData,
                  );
                  this.props.authStore.validatePassword(
                    'loginData',
                    'loginValidationErrors',
                  );
                }}
              />
            </div>
            <div className="formGroups">
              <div className="checkBoxGroup">
                <label htmlFor="rememberMe">Remember me</label>
                <input type="checkbox" name="rememberMe" id="rememberMe" />
              </div>
              <div className="forgotPasswordLink">
                <Link href="/recovery" as="/recovery">
                  <a href="#" className="link link__primary">
                    Forgotten password?
                  </a>
                </Link>
              </div>
            </div>
            <div className="auth-buttons">
              <Link href="/signup" as="/signup">
                <a href="#">
                  <button type="button" className="button button__secondary">
                    Sign Up
                  </button>
                </a>
              </Link>
              <button
                disabled={this.props.authStore.loginLoading.value}
                type="submit"
                className="button button__primary"
              >
                {this.props.authStore.loginLoading.value ? (
                  <span className="login-loader" />
                ) : (
                  'Log in'
                )}
              </button>
            </div>
          </form>
          <div className="socialSignup">
            <GoogleLogin
              clientId={config.OAUTH_GOOGLE_CLIENT_ID}
              render={renderProps => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  type="button"
                  className="button__google"
                >
                  <span className="icon icon__google" />
                  Continue with Google
                </button>
              )}
              buttonText="Login"
              onSuccess={response => this.responseGoogle(this, response)}
              onFailure={e => {
                this.props.authStore.setClassProps(
                  [
                    {
                      name: 'visible',
                      value: true,
                    },
                    {
                      name: 'message',
                      value: 'Unknown error.',
                    },
                  ],
                  this.props.authStore.loginErrors,
                );
              }}
              cookiePolicy="single_host_origin"
            />
          </div>
        </main>
        {/* Error Modal */}
        <Modal
          isOpen={this.props.authStore.loginErrors.visible}
          onRequestClose={this.closeModal}
          style={CustomStyles.modalStyles}
        >
          <div className="eEPopup eEPopup__active">
            <div className="eEPopup__body">
              <div className="head">
                <button
                  type="button"
                  className="head__close"
                  onClick={this.closeModal}
                >
                  <Icons.close />
                </button>
                <h2 className="head__title sectionTitleSmall">
                  An Error Occured
                </h2>
              </div>
              <div className="content">
                <div className="content__copy">
                  <p>Please see the error below:</p>
                  <p className="error-text m-b-sm">
                    <em>
                      {`Error: ${this.props.authStore.loginErrors.message}`}
                    </em>
                  </p>
                </div>
                <div className="buttonWrapper">
                  <button
                    type="button"
                    className="button__primary close-btn"
                    onClick={this.closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Login;
