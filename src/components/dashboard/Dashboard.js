import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import { push as Menu } from 'react-burger-menu';
import { WithContext as ReactTags } from 'react-tag-input';
import Modal from 'react-modal';

import { getLoader } from '../../utils/helpers';
import Nav from './Nav';
import CustomStyles from '../common/commonStyles';
import Icons from '../common/icons';

const validate = require('validate.js');

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

@inject('organisationStore')
@observer
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      additionError: '',
      window: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.setState({ window });
    this.props.organisationStore.findInvites();
  }

  closeModal(type) {
    this.props.organisationStore.setClassProps(
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
      this.props.organisationStore[type],
    );
  }

  handleDelete(i) {
    const { members } = this.state;
    this.setState({
      members: members.filter((_member, index) => index !== i),
    });
  }

  handleAddition(member) {
    const constraints = {
      member: {
        email: true,
      },
    };
    const res = validate({ member: member.text }, constraints);
    if (!res) {
      this.setState({ additionError: '' });
      this.setState(state => ({ members: [...state.members, member] }));
    } else {
      this.setState({ additionError: ' - Invalid email entered' });
    }
  }

  render() {
    Modal.setAppElement('body');
    const { members } = this.state;
    return (
      <div id="outer-container" className="dashboard-outer bootstrap-wrapper">
        <Menu right pageWrapId="page-wrap" outerContainerId="outer-container">
          <div>
            <Link href="/dashboard" as="/dashboard">
              <a>Dashbaord</a>
            </Link>
            <Link href="/" as="/">
              <a>Receipts</a>
            </Link>
            <Link href="/" as="/">
              <a>Expenses</a>
            </Link>
            <Link href="/" as="/">
              <a>Expense Report</a>
            </Link>
            <Link href="/dashboard/settings" as="/dashboard/settings">
              <a>Settings</a>
            </Link>
          </div>
        </Menu>
        <div id="page-wrap">
          <div className="accountWrapper">
            {this.props.organisationStore.loading.visible
              ? getLoader(this)
              : getLoader(this, true)}
            <header className="u_section">
              <div className="brand">
                <Link href="/dashboard" as="/dashboard">
                  <img src="/logo.svg" alt="Easy Expense logo" />
                </Link>
              </div>
            </header>
            <Nav />
            <main className="accountWrapper__main">
              <h1 className="accountPageTitle">Dashboard</h1>
              <div className="u_section head">
                <h1 className="pageTitle">Getting Started</h1>
              </div>
              <div className="body">
                <div className="u_card m-b-xlg">
                  <h4 className="sectionTitle">Join an organization</h4>
                  <p>You’ve been invited to join the organizations below.</p>
                  <div className="eEForm eEForm__account">
                    {this.props.organisationStore.inviteData.orgID ? (
                      <div className="row with-divider">
                        <div className="col-sm-3">
                          <p className="small">Organization</p>
                          <p>
                            {this.props.organisationStore.inviteData.orgName.toUpperCase()}
                          </p>
                        </div>
                        <div className="col-sm-3">
                          <p className="small">Invited By:</p>
                          <p>
                            {this.props.organisationStore.inviteData.invitedBy}
                          </p>
                        </div>
                        <div className="col-sm-6">
                          <div className="buttonWrapper">
                            <button
                              type="button"
                              className="button button__primary"
                              onClick={this.props.organisationStore.joinOrg}
                            >
                              Join Organization
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-center">
                        <em>You don&apos;t have any invites at the moment.</em>
                      </p>
                    )}
                  </div>
                </div>
                <div className="divider">
                  <p>OR</p>
                </div>
                <div className="u_section u_card m-t-md">
                  <h4 className="sectionTitle">Create an organization</h4>
                  <p>
                    Create a new organization an invite members to start
                    reviewing and approving expenses.
                  </p>
                  <div
                    action="#"
                    className="eEForm eEForm__row eEForm__account"
                  >
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="formGroup">
                          <label htmlFor="organizationName">
                            Organization Name
                          </label>
                          <input
                            type="text"
                            name="organizationName"
                            id="organizationName"
                            placeholder="Enter organization name"
                            value={this.props.organisationStore.newOrgData.name}
                            onChange={event => {
                              this.props.organisationStore.setClassProps(
                                [
                                  {
                                    name: 'name',
                                    value: event.target.value,
                                  },
                                ],
                                this.props.organisationStore.newOrgData,
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-8">
                        <div className="formGroup">
                          <label htmlFor="members">
                            Members (Add emails seperated by a comma)
                            <span className="error-text">
                              {this.state.additionError}
                            </span>
                          </label>
                          <ReactTags
                            placeholder="Add a member"
                            tags={members}
                            allowDragDrop={false}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            delimiters={delimiters}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="buttonWrapper">
                      <button
                        type="button"
                        className="button button__primary"
                        onClick={() =>
                          this.props.organisationStore.createOrg(this)
                        }
                      >
                        Create organization
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
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
                  onClick={() => this.closeModal('error')}
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
                    onClick={() => this.closeModal('error')}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* Sucess Modal */}
        <Modal
          isOpen={this.props.organisationStore.success.visible}
          onRequestClose={this.closeModal}
          style={CustomStyles.modalStyles}
        >
          <div className="eEPopup eEPopup__active">
            <div className="eEPopup__body">
              <div className="content">
                <div className="content__copy">
                  <p className="m-b-sm">
                    {this.props.organisationStore.success.message}
                  </p>
                </div>
                <div className="buttonWrapper">
                  <button
                    type="button"
                    className="button__primary close-btn"
                    onClick={() => this.closeModal('success')}
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

export default Dashboard;
