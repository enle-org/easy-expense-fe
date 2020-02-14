/* eslint-disable react/no-unused-state */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { WithContext as ReactTags } from 'react-tag-input';
import Modal from 'react-modal';

import { renderIf } from '../../utils/helpers';
import Nav from './Nav';
import Icons from '../common/icons';
import CustomStyles from '../common/commonStyles';

const validate = require('validate.js');

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const customStyles = {
  content: {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    background: 'rgba(0, 0, 0, 0.8)',
    border: 0,
    borderRadius: 0,
  },
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

@inject('organisationStore', 'authStore')
@observer
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      removeMemberHold: {},
      modalIsOpen: 'true',
      additionError: '',
    };
    this.handleAddition = this.handleAddition.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeModal2 = this.closeModal2.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
  }

  componentDidMount() {
    this.props.organisationStore.getOrg();
    this.props.authStore.getUserData();
  }

  runDelete(obj, type, typeArr, i) {
    obj[type] = typeArr.filter((_typeArr, index) => index !== i);
    this.props.organisationStore.setClassProps(
      [
        {
          name: type,
          value: obj[type],
        },
      ],
      this.props.organisationStore.org,
    );
  }

  handleDelete(type, typeArr, i) {
    const obj = {};
    if (type === 'members') {
      this.setState({ removeMemberHold: { type, typeArr, i } });
      this.openModal('removeMember');
    } else this.runDelete(obj, type, typeArr, i);
  }

  handleAddition(invite) {
    const constraints = {
      invite: {
        email: true,
      },
    };
    const res = validate({ invite: invite.text }, constraints);
    if (!res) {
      this.setState({ additionError: '' });
      this.props.organisationStore.setClassProps(
        [
          {
            name: 'invites',
            value: [...this.props.organisationStore.org.invites, invite],
          },
        ],
        this.props.organisationStore.org,
      );
    } else {
      this.setState({ additionError: ' - Invalid email entered' });
    }
  }

  openModal(type) {
    this.setState({ modalIsOpen: type });
  }

  deleteMember(type = null) {
    if (type === 'deleteMember') {
      this.runDelete(
        {},
        this.state.removeMemberHold.type,
        this.state.removeMemberHold.typeArr,
        this.state.removeMemberHold.i,
      );
      this.closeModal();
    }
  }

  closeModal() {
    this.setState({ modalIsOpen: '' });
  }

  closeModal2(store, type) {
    this.props[store].setClassProps(
      [
        {
          name: 'visible',
          value: false,
        },
        {
          name: 'message',
          value: '',
        },
        {
          name: 'type',
          value: '',
        },
      ],
      this.props[store][type],
    );
  }

  render() {
    const invites = toJS(this.props.organisationStore.org.invites);
    const members = toJS(this.props.organisationStore.org.members);
    Modal.setAppElement('body');
    return (
      <div className="accountWrapper">
        <Nav />
        <main className="accountWrapper__main">
          <h1 className="accountPageTitle">
            Personal and organization settings
          </h1>
          <div className="u_section head">
            <h2 className="pageTitle">Settings</h2>
            <p>
              Edit your organization settings, or delete an organization or your
              account.
            </p>
          </div>
          <div className="body">
            <div className="u_section u_card">
              <h4 className="sectionTitle settingsTitle">
                Organization Settings
              </h4>
              {this.props.organisationStore.org &&
              this.props.organisationStore.org.name ? (
                <div action="#" className="eEForm eEForm__row eEForm__account">
                  <div className="eERow2">
                    <div className="formGroup">
                      <label htmlFor="organizationNameSettings">
                        Organization Name
                      </label>
                      <input
                        disabled
                        type="text"
                        name="organizationNameSettings"
                        id="organizationNameSettings"
                        placeholder="Enter organization name"
                        defaultValue={this.props.organisationStore.org.name.toUpperCase()}
                      />
                    </div>
                    <div className="formGroup">
                      <label htmlFor="membersSettings">
                        Invite Members (Add emails seperated by a comma)
                        <span className="error-text">
                          {this.state.additionError}
                        </span>
                      </label>
                      <ReactTags
                        placeholder="Enter an email"
                        tags={invites}
                        allowDragDrop={false}
                        handleDelete={i =>
                          this.handleDelete('invites', invites, i)
                        }
                        handleAddition={this.handleAddition}
                        delimiters={delimiters}
                      />
                    </div>
                  </div>
                  <div className="singleColumnFormGroup formGroup remove_member">
                    <label htmlFor="removeMembers">Remove Members</label>
                    {members.length ? (
                      <ReactTags
                        placeholder="Enter an email"
                        tags={members}
                        allowDragDrop={false}
                        handleDelete={i =>
                          this.handleDelete('members', members, i)
                        }
                        handleAddition={this.handleAddition}
                        delimiters={delimiters}
                      />
                    ) : (
                      <p className="text-center">
                        <em>No members yet</em>
                      </p>
                    )}
                  </div>
                  <div className="buttonWrapper buttonWrapper__group">
                    <div className="left">
                      <button
                        type="button"
                        className="button button__danger"
                        onClick={() => this.openModal('deleteOrg')}
                      >
                        Delete Organization
                      </button>
                    </div>
                    <div className="right">
                      <button
                        type="button"
                        className="button button__primary"
                        onClick={() => this.openModal('patchOrg')}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center">
                  <em>You have not created any organisations yet.</em>
                </p>
              )}
            </div>
            <div className="u_card">
              <h4 className="sectionTitle settingsTitle">Personal Settings</h4>
              {renderIf(
                this.props.authStore.personalSettingsValidationError.visible &&
                  this.props.authStore.personalSettingsValidationError.type !==
                    'emailMatch',
                <p className="error-text m-b-sm">
                  <em>
                    {`Error: ${this.props.authStore.personalSettingsValidationError.message}`}
                  </em>
                </p>,
              )}
              <div className="eEForm eEForm__row eEForm__account">
                <div className="eERow2">
                  <div className="formGroup">
                    <label htmlFor="fullNameSettings">Full Name</label>
                    <input
                      type="text"
                      name="fullNameSettings"
                      id="fullNameSettings"
                      placeholder="Enter full name"
                      value={this.props.authStore.user.fullname}
                      onChange={event => {
                        this.props.authStore.setClassProps(
                          [
                            {
                              name: 'fullname',
                              value: event.target.value,
                            },
                          ],
                          this.props.authStore.user,
                        );
                      }}
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="emailSettings">Email</label>
                    <input
                      disabled
                      type="email"
                      name="emailSettings"
                      id="emailSettings"
                      placeholder="Enter email address"
                      value={this.props.authStore.user.email}
                      onChange={event => {
                        this.props.authStore.setClassProps(
                          [
                            {
                              name: 'email',
                              value: event.target.value,
                            },
                          ],
                          this.props.authStore.user,
                        );
                      }}
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="currentPasswordSettings">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="currentPasswordSettings"
                      id="currentPasswordSettings"
                      value={this.props.authStore.user.password}
                      onChange={event => {
                        this.props.authStore.setClassProps(
                          [
                            {
                              name: 'password',
                              value: event.target.value,
                            },
                          ],
                          this.props.authStore.user,
                        );
                        this.props.authStore.validatePassword(
                          'user',
                          'personalSettingsValidationError',
                        );
                      }}
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="newPasswordSettings">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="newPasswordSettings"
                      id="newPasswordSettings"
                      placeholder="Enter new password"
                      value={this.props.authStore.user.confirmPassword}
                      onChange={event => {
                        this.props.authStore.setClassProps(
                          [
                            {
                              name: 'confirmPassword',
                              value: event.target.value,
                            },
                          ],
                          this.props.authStore.user,
                        );
                        this.props.authStore.validatePasswordMatch(
                          'user',
                          'personalSettingsValidationError',
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="buttonWrapper buttonWrapper__group">
                  <div className="left">
                    <button
                      type="button"
                      className="button button__danger"
                      onClick={() => this.openModal('deleteAccount')}
                    >
                      Delete Account
                    </button>
                  </div>
                  <div className="right">
                    <button
                      type="button"
                      className="button button__primary"
                      onClick={() => this.props.authStore.patchUser()}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Remove member popup starts here */}
        <Modal
          isOpen={this.state.modalIsOpen === 'removeMember'}
          onRequestClose={this.closeModal}
          style={customStyles}
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
                <h2 className="head__title sectionTitleSmall">Remove Member</h2>
              </div>
              <div className="content">
                <div className="content__copy">
                  <p>
                    Are you sure you want remove this account from the
                    organisation?
                  </p>
                  <p>This action cannot be undone.</p>
                </div>
                <div className="buttonWrapper">
                  <button
                    type="button"
                    className="button button__outline button__largePadding"
                    onClick={this.closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="button button__danger button__largePadding"
                    onClick={() => this.deleteMember('deleteMember')}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/* Remove member popup ends here */}

        {/* Delete organization popup starts here */}
        <Modal
          isOpen={this.state.modalIsOpen === 'deleteOrg'}
          onRequestClose={this.closeModal}
          style={customStyles}
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
                  Delete Organization
                </h2>
              </div>
              <div className="content">
                <div className="content__copy">
                  <p>Are you sure you want delete this organisation?</p>
                  <p>This action cannot be undone.</p>
                </div>
                {renderIf(
                  this.props.organisationStore.actionConfirmation.visible &&
                    this.props.organisationStore.actionConfirmation.type ===
                      'deleteOrg',
                  <p className="error-text m-b-sm">
                    <em>
                      {`Error: ${this.props.organisationStore.actionConfirmation.message}`}
                    </em>
                  </p>,
                )}
                <div className="content__form">
                  <form action="#" className="eEForm">
                    <div className="formGroup">
                      <label htmlFor="organizationNamePopup">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        name="organizationNamePopup"
                        id="organizationNamePopup"
                        placeholder="Enter organization name"
                        value={this.props.organisationStore.userConfirmationData.orgName.toUpperCase()}
                        onChange={event => {
                          this.props.organisationStore.setClassProps(
                            [
                              {
                                name: 'orgName',
                                value: event.target.value.toLowerCase(),
                              },
                            ],
                            this.props.organisationStore.userConfirmationData,
                          );
                          this.props.organisationStore.validateOrgName();
                        }}
                      />
                    </div>
                    <div className="buttonWrapper">
                      <button
                        type="button"
                        className="button button__outline button__largePadding"
                        onClick={this.closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="button button__danger button__largePadding"
                        onClick={async () => {
                          await this.props.organisationStore.deleteOrg();
                          this.closeModal();
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/* Delete organization popup ends here */}

        {/* Patch organization popup starts here */}
        <Modal
          isOpen={this.state.modalIsOpen === 'patchOrg'}
          onRequestClose={this.closeModal}
          style={customStyles}
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
                  Update Organization
                </h2>
              </div>
              <div className="content">
                <div className="content__copy">
                  <p>You&apos;re about to modify this organisation, proceed?</p>
                </div>
                {renderIf(
                  this.props.organisationStore.actionConfirmation.visible &&
                    this.props.organisationStore.actionConfirmation.type ===
                      'deleteOrg',
                  <p className="error-text m-b-sm">
                    <em>
                      {`Error: ${this.props.organisationStore.actionConfirmation.message}`}
                    </em>
                  </p>,
                )}
                <div className="content__form">
                  <form action="#" className="eEForm">
                    <div className="formGroup">
                      <label htmlFor="organizationNamePopup">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        name="organizationNamePopup"
                        id="organizationNamePopup"
                        placeholder="Enter organization name"
                        value={this.props.organisationStore.userConfirmationData.orgName.toUpperCase()}
                        onChange={event => {
                          this.props.organisationStore.setClassProps(
                            [
                              {
                                name: 'orgName',
                                value: event.target.value.toLowerCase(),
                              },
                            ],
                            this.props.organisationStore.userConfirmationData,
                          );
                          this.props.organisationStore.validateOrgName();
                        }}
                      />
                    </div>
                    <div className="buttonWrapper">
                      <button
                        type="button"
                        className="button button__outline button__largePadding"
                        onClick={this.closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="button button__primary button__largePadding"
                        onClick={async () => {
                          await this.props.organisationStore.patchOrg();
                          this.closeModal();
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/* Patch organization popup ends here */}

        {/* Delete account popup starts here */}
        <Modal
          isOpen={this.state.modalIsOpen === 'deleteAccount'}
          onRequestClose={this.closeModal}
          style={customStyles}
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
                  Delete Account
                </h2>
              </div>
              <div className="content">
                <div className="content__copy">
                  <p>Are you sure you want delete your account?</p>
                  <p>This action cannot be undone.</p>
                </div>
                {renderIf(
                  this.props.authStore.personalSettingsValidationError
                    .visible &&
                    this.props.authStore.personalSettingsValidationError
                      .type === 'emailMatch',
                  <p className="error-text m-b-sm">
                    <em>
                      {`Error: ${this.props.authStore.personalSettingsValidationError.message}`}
                    </em>
                  </p>,
                )}
                <div className="content__form">
                  <div className="eEForm">
                    <div className="formGroup">
                      <label htmlFor="fullNamePopupDeleteAccount">
                        Email Address
                      </label>
                      <input
                        type="text"
                        name="fullNamePopup"
                        id="fullNamePopupDeleteAccount"
                        placeholder="Enter email address"
                        value={this.props.authStore.user.confirmEmail}
                        onChange={event => {
                          this.props.authStore.setClassProps(
                            [
                              {
                                name: 'confirmEmail',
                                value: event.target.value,
                              },
                            ],
                            this.props.authStore.user,
                          );
                          this.props.authStore.validateEmailMatch();
                        }}
                      />
                    </div>
                    <div className="buttonWrapper">
                      <button
                        type="button"
                        className="button button__outline button__largePadding"
                        onClick={this.closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="button button__danger button__largePadding"
                        onClick={() => this.openModal('confirmDelete')}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/* Delete account popup ends here */}

        {/* Confirm Delete account popup starts here */}
        <Modal
          isOpen={this.state.modalIsOpen === 'confirmDelete'}
          onRequestClose={this.closeModal}
          style={customStyles}
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
                  Confirm Delete
                </h2>
              </div>
              <div className="content">
                <div className="content__copy">
                  <p>
                    Warning: Deleting your account will delete all organizations
                    you’ve created!
                  </p>
                </div>
                <div className="content__form">
                  <div className="eEForm">
                    <div className="buttonWrapper">
                      <button
                        type="button"
                        className="button button__outline button__largePadding"
                        onClick={this.closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="button button__danger button__largePadding"
                        onClick={() => {
                          this.props.authStore.deleteUser();
                          this.closeModal();
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/* Delete account popup ends here */}

        {/* Error Modal */}
        <Modal
          isOpen={this.props.organisationStore.error.visible}
          onRequestClose={this.closeModal}
          style={CustomStyles.modalStyles}
        >
          <div className="eEPopup eEPopup__active">
            <div className="eEPopup__body">
              <div className="head">
                <button
                  type="button"
                  className="head__close"
                  onClick={() => this.closeModal2('organisationStore', 'error')}
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
                      {`Error: ${this.props.organisationStore.error.message}`}
                    </em>
                  </p>
                </div>
                <div className="buttonWrapper">
                  <button
                    type="button"
                    className="button__primary close-btn"
                    onClick={() =>
                      this.closeModal2('organisationStore', 'error')
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* Error Modal */}
        <Modal
          isOpen={this.props.authStore.personalSettingsActionError.visible}
          onRequestClose={this.closeModal}
          style={CustomStyles.modalStyles}
        >
          <div className="eEPopup eEPopup__active">
            <div className="eEPopup__body">
              <div className="head">
                <button
                  type="button"
                  className="head__close"
                  onClick={() =>
                    this.closeModal2('authStore', 'personalSettingsActionError')
                  }
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
                      {`Error: ${this.props.authStore.personalSettingsActionError.message}`}
                    </em>
                  </p>
                </div>
                <div className="buttonWrapper">
                  <button
                    type="button"
                    className="button__primary close-btn"
                    onClick={() =>
                      this.closeModal2(
                        'authStore',
                        'personalSettingsActionError',
                      )
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* Success Modal */}
        <Modal
          isOpen={this.props.authStore.success.visible}
          onRequestClose={this.closeModal}
          style={CustomStyles.modalStyles}
        >
          <div className="eEPopup eEPopup__active">
            <div className="eEPopup__body">
              <div className="content">
                <div className="content__copy">
                  <p className="m-b-sm">
                    {this.props.authStore.success.message}
                  </p>
                </div>
                <div className="buttonWrapper">
                  <button
                    type="button"
                    className="button__primary close-btn"
                    onClick={() => this.closeModal2('authStore', 'success')}
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

export default Settings;
