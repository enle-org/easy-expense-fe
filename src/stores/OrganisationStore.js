import { observable, action } from 'mobx';

import { setClassProps, runInActionUtil } from '../utils/helpers';
import axiosInstance from '../utils/axiosInstance';
import config from '../../config';

const baseUrl = config.API_URL;

export default class OrganisationStore {
  constructor(authStore) {
    this.authStore = authStore;
  }

	@observable
	organisation = {};

	@observable
	inviteData = {
	  orgID: '',
	  orgName: '',
	  invitedBy: '',
	};

	@observable
	error = {
	  visible: false,
	  message: '',
	};

	@observable
	success = {
	  visible: false,
	  message: '',
	};

	@observable
	newOrgData = {
	  name: '',
	};

	@observable
	org = {
	  name: '',
	  invites: [],
	  members: [],
	};

	@observable
	userConfirmationData = {
	  orgName: '',
	  password: '',
	  confirmPassword: '',
	};

	@observable
	actionConfirmation = {
	  visible: false,
	  type: '',
	  message: '',
	};

	@action
  validateOrgName = () => {
    if (this.userConfirmationData.orgName === this.org.name) {
      this.actionConfirmation = {
        visible: false,
        type: '',
        message: '',
      };
      return true;
    }
    this.actionConfirmation = {
      visible: true,
      type: 'deleteOrg',
      message: 'Organization name incorrect',
    };
    return false;
  }

	@action
	findInvites = async () => {
	  try {
	    const inviteToken = localStorage.getItem('inviteToken');
	    if (inviteToken) {
	      const res = await axiosInstance.get(`${baseUrl}/invite/${inviteToken}`);
	      runInActionUtil(this, 'inviteData', res.data.data);
	    }
	  }
	  catch (error) {
	    runInActionUtil(
	      this,
	      'error',
	      { visible: true, message: error.response.data.message },
	    );
	  }
	};

	@action
	deleteOrg = async () => {
	  try {
	    if (this.validateOrgName()) {
	      await axiosInstance.delete(`${baseUrl}/organisations/${this.org._id}`);
	      runInActionUtil(this, 'org', {
	        name: '',
	        invites: [],
	        members: [],
	      });
	    }
	  }
	  catch (error) {
	    runInActionUtil(
	      this,
	      'error',
	      { visible: true, message: error.response.data.message },
	    );
	  }
	};

	@action
	joinOrg = async () => {
	  try {
	    await axiosInstance.get(`${baseUrl}/invite/join?orgId=${this.inviteData.orgID}`);
	    localStorage.removeItem('inviteToken');
	    runInActionUtil(
	      this,
	      'success',
	      { visible: true, message: `You've successfully joined ${this.inviteData.orgName}.` },
	    );
	    runInActionUtil(this, 'inviteData', {
	      orgID: '',
	      orgName: '',
	      invitedBy: '',
	    });
	  }
	  catch (error) {
	    runInActionUtil(
	      this,
	      'error',
	      { visible: true, message: error.response.data.message },
	    );
	  }
	};

	@action
	createOrg = async Component => {
	  try {
	    if (this.newOrgData.name) {
	      const members = Component.state.members.map(member => member.text);
	      await axiosInstance.post(`${baseUrl}/organisations`, {
	        name: this.newOrgData.name,
	        url: baseUrl,
	        invites: members,
	      });
	      Component.setState({ members: [] });
	      runInActionUtil(
	        this,
	        'success',
	        { visible: true, message: `You've successfully created ${this.newOrgData.name}.` },
	      );
	      runInActionUtil(this, 'newOrgData', {
	        name: '',
	      });
	    }
	    else {
	      this.error = { visible: true, message: 'Organisation name is empty.' };
	    }
	  }
	  catch (error) {
	    runInActionUtil(
	      this,
	      'error',
	      { visible: true, message: error.response.data.message },
	    );
	  }
	};

	@action
	getOrg = async (respData = null) => {
	  try {
	    const org = {};
	    const resp = respData || await axiosInstance.get(`${baseUrl}/organisations`);
	    if (resp.data.invites && resp.data.invites.length) {
	      org.invites = resp.data.invites.map((inviteObj, i) => ({
	        id: `${i}`,
	        text: inviteObj.email,
	      }));
	    }
	    if (resp.data.members && resp.data.members.length) {
	      org.members = resp.data.members.map((email, i) => ({
	        id: `${i}`,
	        text: email,
	      }));
	    }
	    const newOrg = Object.assign({}, resp.data, org);
	    runInActionUtil(this, 'org', newOrg);
	  }
	  catch (error) {
	    runInActionUtil(
	      this,
	      'error',
	      { visible: true, message: error.response.data.message },
	    );
	  }
	};

	@action
	patchOrg = async () => {
	  try {
	    const patchedOrg = {
	      members: this.org.members.map(memberObj => memberObj.text),
	      invites: this.org.invites.map(inviteObj => inviteObj.text),
	    };
	    await axiosInstance.patch(
	      `${baseUrl}/organisations/${this.org._id}`, {
	        _id: this.org._id,
	        name: this.org.name,
	        url: baseUrl,
	        ...patchedOrg,
	      },
	    );
	    this.getOrg();
	  }
	  catch (error) {
	    runInActionUtil(
	      this,
	      'error',
	      { visible: true, message: error.response.data.message },
	    );
	  }
	};

	@action
	setClassProps = (arr, self = this) => setClassProps(arr, self);
}
