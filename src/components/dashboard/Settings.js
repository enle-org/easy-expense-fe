import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import Modal from 'react-modal';
import Nav from './Nav';
import Icons from '../common/icons';

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

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [
        { id: '1', text: 'ope@enle.co' },
        { id: '2', text: 'folarin@enle.co' },
        { id: '3', text: 'david@enle.co' },
      ],
      removeTags: [
        { id: '1', text: 'nedy@enle.co' },
      ],
      modalIsOpen: 'true',
    };
    this.handleAddition = this.handleAddition.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleDelete(type, typeArr, i) {
    const obj = {};
    if (type === 'removeTags') this.openModal('removeMember');
    obj[type] = typeArr.filter((_typeArr, index) => index !== i);
    this.setState({ ...obj });
  }

  handleAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  openModal(type) {
    this.setState({ modalIsOpen: type });
  }

  closeModal() {
    this.setState({ modalIsOpen: '' });
  }

  render() {
    const { tags, removeTags } = this.state;
    Modal.setAppElement('body');
    return (
      <div className="accountWrapper">
        <Nav />
        <main className="accountWrapper__main">
          <h1 className="accountPageTitle">Personal and organization settings</h1>
          <div className="u_section head">
            <h2 className="pageTitle">Settings</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="body">
            <div className="u_section u_card">
              <h4 className="sectionTitle">Organization Settings</h4>
              <form action="#" className="eEForm eEForm__row eEForm__account">
                <div className="eERow2">
                  <div className="formGroup">
                    <label htmlFor="organizationNameSettings">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      name="organizationNameSettings"
                      id="organizationNameSettings"
                      placeholder="Enter organization name"
                      defaultValue="Enle Co"
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="membersSettings">Invite Members (Add emails seperated by a comma)</label>
                    <ReactTags
                      placeholder="Enter an email"
                      tags={tags}
                      allowDragDrop={false}
                      handleDelete={i => this.handleDelete('tags', tags, i)}
                      handleAddition={this.handleAddition}
                      delimiters={delimiters}
                    />
                  </div>
                </div>
                <div className="singleColumnFormGroup formGroup remove_member">
                  <label htmlFor="removeMembers">Remove Members</label>
                  <ReactTags
                    placeholder="Enter an email"
                    tags={removeTags}
                    allowDragDrop={false}
                    handleDelete={i => this.handleDelete('removeTags', removeTags, i)}
                    handleAddition={this.handleAddition}
                    delimiters={delimiters}
                  />
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
                      type="submit"
                      className="button button__outline button__largePadding"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="button button__primary">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="u_card">
              <h4 className="sectionTitle">Personal Settings</h4>
              <form action="#" className="eEForm eEForm__row eEForm__account">
                <div className="eERow2">
                  <div className="formGroup">
                    <label htmlFor="fullNameSettings">Full Name</label>
                    <input
                      type="text"
                      name="fullNameSettings"
                      id="fullNameSettings"
                      placeholder="Enter full name"
                      defaultValue="Jejelola Mark-Obaba"
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="emailSettings">Email</label>
                    <input
                      type="email"
                      name="emailSettings"
                      id="emailSettings"
                      placeholder="Enter email address"
                      defaultValue="jejelola@enle.co"
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="currentPasswordSettings">Current Password</label>
                    <input
                      type="password"
                      name="currentPasswordSettings"
                      id="currentPasswordSettings"
                      defaultValue="dummypassword"
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="newPasswordSettings">New Password</label>
                    <input
                      type="password"
                      name="newPasswordSettings"
                      id="newPasswordSettings"
                      placeholder="Enter new password"
                      defaultValue="dummypassword"
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
                      type="submit"
                      className="button button__outline button__largePadding"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="button button__primary">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
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
                    Are you sure you want remove this account from the organisation?
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
                    type="submit"
                    className="button button__danger button__largePadding"
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
                <h2 className="head__title sectionTitleSmall">Delete Organization</h2>
              </div>
              <div className="content">
                <div className="content__copy">
                  <p>Are you sure you want delete this organisation?</p>
                  <p>This action cannot be undone.</p>
                </div>
                <div className="content__form">
                  <form action="#" className="eEForm">
                    <div className="formGroup">
                      <label htmlFor="organizationNamePopup">Organization Name</label>
                      <input
                        type="text"
                        name="organizationNamePopup"
                        id="organizationNamePopup"
                        placeholder="Enter organization name"
                      />
                    </div>
                    <div className="formGroup">
                      <label htmlFor="passwordPopup">Password</label>
                      <input
                        type="password"
                        name="passwordPopup"
                        id="passwordPopup"
                        placeholder="Enter password"
                      />
                    </div>
                    <div className="formGroup">
                      <label htmlFor="confirmPasswordPopup">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPasswordPopup"
                        id="confirmPasswordPopup"
                        placeholder="Confirm Password"
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
                        type="submit"
                        className="button button__danger button__largePadding"
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
                <h2 className="head__title sectionTitleSmall">Delete Account</h2>
              </div>
              <div className="content">
                <div className="content__copy">
                  <p>Are you sure you want delete your account?</p>
                  <p>This action cannot be undone.</p>
                </div>
                <div className="content__form">
                  <form action="#" className="eEForm">
                    <div className="formGroup">
                      <label htmlFor="fullNamePopupDeleteAccount">Full Name</label>
                      <input
                        type="text"
                        name="fullNamePopup"
                        id="fullNamePopupDeleteAccount"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="formGroup">
                      <label htmlFor="passwordPopupDeleteAccount">Password</label>
                      <input
                        type="password"
                        name="passwordPopupDeleteAccount"
                        id="passwordPopupDeleteAccount"
                        placeholder="Enter password"
                      />
                    </div>
                    <div className="formGroup">
                      <label htmlFor="confirmPasswordPopupDeleteAccount">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPasswordPopupDeleteAccount"
                        id="confirmPasswordPopupDeleteAccount"
                        placeholder="Confirm Password"
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
                        type="submit"
                        className="button button__danger button__largePadding"
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
        {/* Delete account popup ends here */}

        {/* Delete account failure popup starts here */}
        <Modal
          isOpen={this.state.modalIsOpen === 'deleteFailure'}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <div className="eEPopup">
            {/* <div className="eEPopup eEPopup__active"> */}
            <div className="eEPopup__overlay" />
            <div className="eEPopup__body">
              <div className="head">
                <div className="head__close">
                  <Icons.close />
                </div>
                <h2 className="head__title sectionTitleSmall">Delete Failure</h2>
              </div>
              <div className="content">
                <div className="content__copy">
                  <p>
                    Sorry, you cannot delete your account with an organization attached
                    to it.
                  </p>
                </div>
                <div className="buttonWrapper">
                  <button
                    type="submit"
                    className="button button__primary u_fullWidth"
                  >
                    Done
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
