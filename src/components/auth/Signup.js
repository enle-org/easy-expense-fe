import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import LoadingBar from 'react-top-loading-bar';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';

import { renderIf } from '../../utils/helpers';
import Icons from '../common/icons';
import config from '../../../config';
import CustomStyles from '../common/commonStyles';

@inject('authStore')
@observer
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.authStore.checkSignedIn();
    this.props.authStore.checkInviteEmail();
  }

  closeModal() {
    this.props.authStore.setClassProps([
      {
        name: 'visible',
        value: false,
      },
      {
        name: 'message',
        value: '',
      },
    ], this.props.authStore.signupErrors);
  }

  // eslint-disable-next-line class-methods-use-this
  responseGoogle(self, response) {
    if (response.profileObj) {
      self.props.authStore.signup(
        null,
        'googleAuth',
        response.profileObj,
      );
    }
  }

  render() {
    Modal.setAppElement('body');
    return (
      <div className="authWrapper authWrapper__signup">
        <LoadingBar
          height={6}
          color="#6C63FF"
          onRef={ref => {
            if (this.props.authStore.signupLoading.visible) {
              // eslint-disable-next-line no-unused-expressions
              this.props.authStore.signupLoading.value
                ? ref.continuousStart()
                : ref.complete();
            }
          }}
        />
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
          {renderIf(
            this.props.authStore.signupValidationErrors.visible,
            <p className="error-text m-b-sm">
              <em>
                {`Error: ${this.props.authStore.signupValidationErrors.message}`}
              </em>
            </p>,
          )}
          {renderIf(
            this.props.authStore.signupEmailOptions.disabled,
            <p className="m-t-sm m-b-sm">
              <em>
                {`Info: ${this.props.authStore.signupEmailOptions.message}`}
              </em>
            </p>,
          )}
          <form
            onSubmit={e => {
              this.props.authStore.signup(
                e,
                'local',
              );
            }}
            className="eEForm"
          >
            <div className="formGroup">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                disabled={this.props.authStore.signupEmailOptions.disabled}
                value={this.props.authStore.signupData.email}
                onChange={event => {
                  this.props.authStore.setClassProps([
                    {
                      name: 'email',
                      value: event.target.value,
                    },
                  ], this.props.authStore.signupData);
                  this.props.authStore.validateEmail();
                }}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={this.props.authStore.signupData.password}
                onChange={event => {
                  this.props.authStore.setClassProps([
                    {
                      name: 'password',
                      value: event.target.value,
                    },
                  ], this.props.authStore.signupData);
                  this.props.authStore.validatePassword();
                }}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={this.props.authStore.signupData.confirmPassword}
                onChange={event => (
                  this.props.authStore.setClassProps([
                    {
                      name: 'confirmPassword',
                      value: event.target.value,
                    },
                  ], this.props.authStore.signupData)
                )}
              />
            </div>
            <div className="auth-buttons">
              <button
                disabled={this.props.authStore.signupLoading.value}
                type="submit"
                className="button button__primary"
              >
                {
                  this.props.authStore.signupLoading.value
                    ? <span className="login-loader" />
                    : 'Sign up'
                }
              </button>
              <Link href="/login" as="/login">
                <a href="#">
                  <button type="button" className="button button__secondary">
                    Login
                  </button>
                </a>
              </Link>
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
                  Sign up with Google
                </button>
              )}
              onSuccess={response => this.responseGoogle(this, response)}
              onFailure={() => {
                this.props.authStore.setClassProps([
                  {
                    name: 'visible',
                    value: true,
                  },
                  {
                    name: 'message',
                    value: 'Google Auth Error',
                  },
                ], this.props.authStore.signupErrors);
              }}
              cookiePolicy="single_host_origin"
            />
          </div>
        </main>
        {/* Error Modal */}
        <Modal
          isOpen={this.props.authStore.signupErrors.visible}
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
                <h2 className="head__title sectionTitleSmall">An Error Occured</h2>
              </div>
              <div className="content">
                <div className="content__copy">
                  <p>
                    Please see the error below:
                  </p>
                  <p className="error-text m-b-sm">
                    <em>
                      {`Error: ${this.props.authStore.signupErrors.message}`}
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

export default Signup;
