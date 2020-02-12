import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import Modal from 'react-modal';

import { renderIf } from '../../utils/helpers';
import Icons from '../common/icons';
import CustomStyles from '../common/commonStyles';


@inject('authStore')
@observer
class Recovery extends React.Component {
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
    ], this.props.authStore.recoveryErrors);
    this.props.authStore.setClassProps([
      {
        name: 'visible',
        value: false,
      },
      {
        name: 'message',
        value: '',
      },
    ], this.props.authStore.recoverySuccess);
  }

  isOpen = () => (
    this.props.authStore.recoveryErrors.visible
    || this.props.authStore.recoverySuccess.visible
  )

  isSuccess = () => this.props.authStore.recoverySuccess.visible

  handleSubmit = e => {
    e.preventDefault();
    this.props.authStore.recovery(
      e,
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
            <h1 className="pageTitle">Password Recovery</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor.
            </p>
          </div>

          {renderIf(
            this.props.authStore.recoveryValidationErrors.visible,
            <p className="error-text m-b-sm">
              <em>
                {`Error: ${this.props.authStore.recoveryValidationErrors.message}`}
              </em>
            </p>,
          )}
          <form onSubmit={this.handleSubmit} className="eEForm">
            <div className="formGroup">
              <label htmlFor="recoveryEmail">Email</label>
              <input
                type="email"
                name="email"
                id="recoveryEmail"
                placeholder="Enter email"
                value={this.props.authStore.recoveryData.email}
                onChange={event => {
                  this.props.authStore.setClassProps([
                    {
                      name: 'email',
                      value: event.target.value,
                    },
                  ], this.props.authStore.recoveryData);
                  this.props.authStore.validateEmail('recoveryData', 'recoveryValidationErrors');
                }}
              />
            </div>
            <button
              disabled={this.props.authStore.recoveryLoading.value}
              type="submit"
              className="button button__primary"
            >
              {
                this.props.authStore.recoveryLoading.value
                  ? <span className="login-loader" />
                  : 'Login'
              }
            </button>
          </form>
        </main>
        <Modal
          isOpen={this.isOpen()}
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
                  {this.isSuccess() ? 'Success' : ' An Error Occured'}
                </h2>
              </div>
              <div className="content">
                <div className="content__copy">
                  {!this.isSuccess() && (
                    <p>
                      Please see the error below:
                    </p>
                  )}
                  <p className={`${!this.isSuccess() && 'error-text'} m-b-sm`}>
                    <em>
                      {this.isSuccess() ? (
                        `Success: ${this.props.authStore.recoverySuccess.message}`
                      ) : (
                        `Error: ${this.props.authStore.recoveryErrors.message}`
                      )}
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

export default Recovery;
