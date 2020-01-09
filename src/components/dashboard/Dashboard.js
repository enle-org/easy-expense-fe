import React from 'react';
import { push as Menu } from 'react-burger-menu';
import { WithContext as ReactTags } from 'react-tag-input';
import Link from 'next/link';
import Nav from './Nav';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [
        { id: '1', text: 'nedy@enle.co' },
      ],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((_tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  render() {
    const { tags } = this.state;
    return (
      <div id="outer-container" className="dashboard-outer">
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
            <header className="u_section">
              <div className="brand">
                <Link href="/dashboard" as="/dashboard">
                  <img src="/logo.png" alt="Easy Expense logo" />
                </Link>
              </div>
            </header>
            <Nav />
            <main className="accountWrapper__main">
              <h1 className="accountPageTitle">Dashboard</h1>
              <div className="u_section head">
                <h2 className="pageTitle">Getting Started</h2>
                <p>
                  You can create an organisation and start reviewing expense reports as an
                  expense approver or join an organization via an invite link.
                </p>
              </div>
              <div className="body">
                <div className="u_section u_card">
                  <h4 className="sectionTitle">Organization Expense Approver</h4>
                  <form action="#" className="eEForm eEForm__row eEForm__account">
                    <div className="eERow2">
                      <div className="formGroup">
                        <label htmlFor="organizationName">Organization Name</label>
                        <input
                          type="text"
                          name="organizationName"
                          id="organizationName"
                          placeholder="Enter organization name"
                          defaultValue="Enle Co"
                        />
                      </div>
                      <div className="formGroup">
                        <label htmlFor="members">Members (Add emails seperated by a comma)</label>
                        <ReactTags
                          placeholder="Add a member"
                          tags={tags}
                          allowDragDrop={false}
                          handleDelete={this.handleDelete}
                          handleAddition={this.handleAddition}
                          delimiters={delimiters}
                        />
                      </div>
                    </div>
                    <div className="buttonWrapper">
                      <button type="submit" className="button button__primary">
                        Create organization
                      </button>
                    </div>
                  </form>
                </div>
                <div className="u_card">
                  <h4 className="sectionTitle">Organization Member</h4>
                  <form action="#" className="eEForm eEForm__account">
                    <div className="formGroup">
                      <label htmlFor="inviteLink">Invite link</label>
                      <input
                        type="text"
                        name="inviteLink"
                        id="inviteLink"
                        value="https://www.easyexpense.com/invite/Enle%20Co"
                        disabled
                      />
                    </div>
                    <div className="buttonWrapper">
                      <button type="submit" className="button button__primary">
                        Join Organization
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
