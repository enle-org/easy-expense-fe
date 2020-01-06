import React from 'react';
import Nav from './Nav';
import Icons from '../common/icons';

const Settings = () => (
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
                  onBlur="resetFormGroupState()"
                  onFocus="focusFormGroup(event)"
                />
              </div>
              <div className="formGroup">
                <label htmlFor="membersSettings">Invite Members</label>
                <input
                  type="text"
                  name="membersSettings"
                  id="membersSettings"
                  placeholder="Enter members' names"
                  onBlur="resetFormGroupState()"
                  onFocus="focusFormGroup(event)"
                />
              </div>
            </div>
            <div className="singleColumnFormGroup formGroup">
              <label htmlFor="removeMembers">Remove Members</label>
              <input
                type="text"
                name="removeMembers"
                id="removeMembers"
                placeholder="Enter members' names"
                onBlur="resetFormGroupState()"
                onFocus="focusFormGroup(event)"
              />
            </div>
            <div className="buttonWrapper buttonWrapper__group">
              <div className="left">
                <button type="submit" className="button button__danger">
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
                  onBlur="resetFormGroupState()"
                  onFocus="focusFormGroup(event)"
                />
              </div>
              <div className="formGroup">
                <label htmlFor="emailSettings">Email</label>
                <input
                  type="email"
                  name="emailSettings"
                  id="emailSettings"
                  placeholder="Enter email address"
                  onBlur="resetFormGroupState()"
                  onFocus="focusFormGroup(event)"
                />
              </div>
              <div className="formGroup">
                <label htmlFor="currentPasswordSettings">Current Password</label>
                <input
                  type="password"
                  name="currentPasswordSettings"
                  id="currentPasswordSettings"
                  defaultValue="dummypassword"
                  onBlur="resetFormGroupState()"
                  onFocus="focusFormGroup(event)"
                />
              </div>
              <div className="formGroup">
                <label htmlFor="newPasswordSettings">New Password</label>
                <input
                  type="password"
                  name="newPasswordSettings"
                  id="newPasswordSettings"
                  placeholder="Enter new password"
                  onBlur="resetFormGroupState()"
                  onFocus="focusFormGroup(event)"
                />
              </div>
            </div>
            <div className="buttonWrapper buttonWrapper__group">
              <div className="left">
                <button type="submit" className="button button__danger">
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
    <div className="eEPopup">
      <div className="eEPopup__overlay" />
      <div className="eEPopup__body">
        <div className="head">
          <div className="head__close">
            <Icons.close />
          </div>
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
              onClick="deactivatePopup()"
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
    {/* Remove member popup ends here */}
    {/* Delete organization popup starts here */}
    <div className="eEPopup">
      <div className="eEPopup__overlay" />
      <div className="eEPopup__body">
        <div className="head">
          <div className="head__close">
            <Icons.close />
          </div>
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
                  onBlur="resetFormGroupState()"
                  onFocus="focusFormGroup(event)"
                />
              </div>
              <div className="formGroup">
                <label htmlFor="passwordPopup">Password</label>
                <input
                  type="password"
                  name="passwordPopup"
                  id="passwordPopup"
                  placeholder="Enter password"
                  onBlur="resetFormGroupState()"
                  onFocus="focusFormGroup(event)"
                />
              </div>
              <div className="formGroup">
                <label htmlFor="confirmPasswordPopup">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPasswordPopup"
                  id="confirmPasswordPopup"
                  placeholder="Confirm Password"
                  onBlur="resetFormGroupState()"
                  onFocus="focusFormGroup(event)"
                />
              </div>
              <div className="buttonWrapper">
                <button
                  type="button"
                  className="button button__outline button__largePadding"
                  onClick="deactivatePopup()"
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
    {/* Delete organization popup ends here */}
    {/* Delete account popup starts here */}
    <div className="eEPopup">
      <div className="eEPopup__overlay" />
      <div className="eEPopup__body">
        <div className="head">
          <div className="head__close">
            <Icons.close />
          </div>
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
                  onBlur="resetFormGroupState()"
                  onFocus="focusFormGroup(event)"
                />
              </div>
              <div className="formGroup">
                <label htmlFor="passwordPopupDeleteAccount">Password</label>
                <input
                  type="password"
                  name="passwordPopupDeleteAccount"
                  id="passwordPopupDeleteAccount"
                  placeholder="Enter password"
                  onBlur="resetFormGroupState()"
                  onFocus="focusFormGroup(event)"
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
                  onBlur="resetFormGroupState()"
                  onFocus="focusFormGroup(event)"
                />
              </div>
              <div className="buttonWrapper">
                <button
                  type="button"
                  className="button button__outline button__largePadding"
                  onClick="deactivatePopup()"
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
    {/* Delete account popup ends here */}
    {/* Delete account popup starts here */}
    <div className="eEPopup eEPopup__active">
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
              onClick="deactivatePopup()"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Settings;
