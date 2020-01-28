import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import Modal from 'react-modal';

import { renderIf } from '../../utils/helpers';
import Icons from '../common/icons';
import CustomStyles from '../common/commonStyles';


@inject('authStore')
@observer
class Reset extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal = () => {
    this.props.authStore.setClassProps([
      {
        name: 'visible',
        value: false,
      },
      {
        name: 'message',
        value: '',
      },
    ], this.props.authStore.resetErrors);
  }


  handleSubmit = (e, token) => {
    e.preventDefault();
    this.props.authStore.reset(
      e,
      token,
    );
  };


  render() {
    Modal.setAppElement('body');
    return (
      <div className="authWrapper">
        <main className="recoveryWrapper">
          <div className="brand">
            <Link href="/" as="/">
              <img src="/logo.png" alt="Easy Expense logo" />
            </Link>
          </div>
          <div className="pageContent">
            <h1 className="pageTitle">Password Reset</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor.
            </p>
          </div>

          {renderIf(
            this.props.authStore.resetValidationErrors.visible,
            <p className="error-text m-b-sm">
              <em>
                {`Error: ${this.props.authStore.resetValidationErrors.message}`}
              </em>
            </p>,
          )}
          <form onSubmit={e => this.handleSubmit(e, window.location.pathname.split('/')[2])} className="eEForm">
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={this.props.authStore.resetData.password}
                onChange={event => {
                  this.props.authStore.setClassProps([
                    {
                      name: 'password',
                      value: event.target.value,
                    },
                  ], this.props.authStore.resetData);
                  this.props.authStore.validatePassword('resetData', 'resetValidationErrors');
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
                value={this.props.authStore.resetData.confirmPassword}
                onChange={event => {
                  this.props.authStore.setClassProps([
                    {
                      name: 'confirmPassword',
                      value: event.target.value,
                    },
                  ], this.props.authStore.resetData);
                  this.props.authStore.validatePasswordMatch('resetData', 'resetValidationErrors');
                }}
              />
            </div>
            <button
              disabled={this.props.authStore.resetLoading.value}
              type="submit"
              className="button button__primary"
            >
              {
                this.props.authStore.resetLoading.value
                  ? <span className="login-loader" />
                  : 'Reset Password'
              }
            </button>
          </form>
          <div className="toggleAuthPage">
            <p>
              <Link href="/login" as="/login">
                <a href="#">Proceed to login</a>
              </Link>
            </p>
          </div>
        </main>
        {/* Error Modal */}
        <Modal
          isOpen={this.props.authStore.resetErrors.visible}
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
                    Pls see the error bellow:
                  </p>
                  <p className="error-text m-b-sm">
                    <em>
                      {`Error: ${this.props.authStore.resetErrors.message}`}
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

export default Reset;
