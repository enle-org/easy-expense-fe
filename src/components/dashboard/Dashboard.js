import React from 'react';
import Nav from './Nav';

const Dashboard = () => (
  <div className="accountWrapper">
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
                  onBlur="resetFormGroupState()"
                  onFocus="focusFormGroup(event)"
                />
              </div>
              <div className="formGroup">
                <label htmlFor="members">Members</label>
                <input
                  type="text"
                  name="members"
                  id="members"
                  placeholder="Enter members' names"
                  onBlur="resetFormGroupState()"
                  onFocus="focusFormGroup(event)"
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
                defaultValue="https://www.easyexpense.com/invite/s3md93-12"
                disabled
                onBlur="resetFormGroupState()"
                onFocus="focusFormGroup(event)"
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
);

export default Dashboard;
