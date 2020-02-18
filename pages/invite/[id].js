/* eslint-disable no-restricted-globals */
import React from 'react';

const parseQueryString = () => {
  const str = window.location.search;
  const objURL = {};

  str.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
    objURL[$1] = $3;
  });
  return objURL;
};

const saveToken = () => {
  if (window !== 'undefined') {
    const params = parseQueryString();
    localStorage.setItem('inviteToken', params.token);
    localStorage.setItem('inviteEmail', params.email);
  }
};

class InviteID extends React.Component {
  componentDidMount() {
    saveToken();
    location.replace('/signup');
  }

  render() {
    return <div />;
  }
}

export default InviteID;
