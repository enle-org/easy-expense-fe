import {
  observable,
  action,
  runInAction,
} from 'mobx';
import Router from 'next/router';
import cookie from 'js-cookie';

import { setClassProps, runInActionUtil } from '../utils/helpers';
import { login, logout } from '../utils/serverAuth';
import axiosInstance from '../utils/axiosInstance';
import config from '../../config';

const baseUrl = config.API_URL;

export default class AuthStore {
	@observable
	user = {
	  _id: '',
	  password: '',
	  confirmPassword: '',
	  confirmEmail: '',
	};

	@observable
	loginLoading = {
	  value: false,
	  visible: false,
	};

	@observable
	signupLoading = {
	  value: false,
	  visible: false,
	};

  @observable
	recoveryLoading = {
	  value: false,
	  visible: false,
	};

  @observable
	resetLoading = {
	  value: false,
	  visible: false,
	};

	@observable
	loginData = {
	  email: '',
	  password: '',
	};

	@observable
	loginData = {
	  email: '',
	  password: '',
	};

	@observable
	signupEmailOptions = {
	  diabled: false,
	  message: 'You cannot change your email address.',
	};

	@observable
	signupData = {
	  email: '',
	  password: '',
	  confirmPassword: '',
	};

  @observable
	recoveryData = {
	  email: '',
	};

  @observable
  recoverySuccess = {
    visible: false,
    message: '',
  }

  @observable
	resetData = {
	  password: '',
	  confirmPassword: '',
	};

	@observable
	signupValidationErrors = {
	  visible: false,
	  type: '',
	  message: '',
	};

	@observable
	loginValidationErrors = {
	  visible: false,
	  type: '',
	  message: '',
	};

  @observable
	recoveryValidationErrors = {
	  visible: false,
	  type: '',
	  message: '',
	};

  @observable
	resetValidationErrors = {
	  visible: false,
	  type: '',
	  message: '',
	};

	@observable
	loginErrors = {
	  visible: false,
	  message: '',
	};

	@observable
	signupErrors = {
	  visible: false,
	  message: '',
	};

  @observable
	recoveryErrors = {
	  visible: false,
	  message: '',
	};

  @observable
	resetErrors = {
	  visible: false,
	  message: '',
  };

  @observable
  personalSettingsValidationError = {
	  visible: false,
	  type: '',
	  message: '',
  }

  @observable
  personalSettingsActionError = {
	  visible: false,
	  type: '',
	  message: '',
  }

  @observable
  success = {
	  visible: false,
	  message: '',
  }

	@action
  validateEmail = (type = 'signupData', errorType = 'signupValidationErrors') => {
    if (this[type].email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this[errorType] = {
        visible: false,
        type: '',
        message: '',
      };
      return true;
    }
    this[errorType] = {
      visible: true,
      type: 'email',
      message: 'Invalid email address.',
    };
    return false;
  }

	@action
  validatePassword = (type = 'signupData', errorType = 'signupValidationErrors') => {
    if (this[type].password.length >= 6) {
      this[errorType] = {
        visible: false,
        type: '',
        message: '',
      };
      return true;
    }
    this[errorType] = {
      visible: true,
      type: 'password',
      message: 'Password should be equal or longer than 6 characters.',
    };
    return false;
  }

	@action
  validatePasswordMatch = (type = 'signupData', errorType = 'signupValidationErrors') => {
    if (this[type].password === this[type].confirmPassword) {
      this[errorType] = {
        visible: false,
        type: '',
        message: '',
      };
      return true;
    }
    this[errorType] = {
      visible: true,
      type: 'password',
      message: 'Password do not match.',
    };
    return false;
  }

	@action
  validateEmailMatch = () => {
    if (this.user.email === this.user.confirmEmail) {
      this.personalSettingsValidationError = {
        visible: false,
        type: '',
        message: '',
      };
      return true;
    }
    this.personalSettingsValidationError = {
      visible: true,
      type: 'emailMatch',
      message: 'The email inputted below and your email do not match',
    };
    return false;
  }

  @action
  checkInviteEmail = async () => {
    const inviteToken = localStorage.getItem('inviteToken');
    const inviteEmail = localStorage.getItem('inviteEmail');

    if (inviteToken && inviteEmail) {
      this.signupData.email = inviteEmail;
      this.signupEmailOptions.disabled = true;
    }
  }

  @action
  checkSignedIn = async () => {
    const token = cookie.get('token');
    let res;
    if (token) {
      res = await axiosInstance.get(`${baseUrl}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    if (res) {
      Router.push('/dashboard', '/dashboard');
    }
  }

  @action
  recoveryUtil = async email => {
    try {
      runInActionUtil(
        this,
        'recoveryLoading',
        { value: true, visible: true },
      );

      const res = await axiosInstance.post(`${baseUrl}/recovery`, {
        email,
        url: window.location.href,
      });

      runInAction(() => {
        this.recoveryLoading = {
          value: false,
          visible: false,
        };
        this.recoveryData = {
          email: '',
        };
        this.recoverySuccess = {
          visible: true,
          message: res.data.data.message,
        };
      });
      // Router.push('/dashboard', '/dashboard');
    }
    catch (error) {
      runInActionUtil(
        this,
        'recoveryErrors',
        { visible: true, message: error.response.data.message },
      );
    }
    finally {
      runInActionUtil(
        this,
        'recoveryLoading',
        { value: false, visible: false },
      );
    }
  }

  @action
  resetUtil = async (password, token) => {
    try {
      runInActionUtil(
        this,
        'resetLoading',
        { value: true, visible: true },
      );

      const res = await axiosInstance.patch(`${baseUrl}/recovery/${token}`, {
        password,
      });
      runInAction(() => {
        this.user = res.data.user;
        this.resetLoading = {
          value: false,
          visible: false,
        };
        this.resetData = {
          password: '',
          confirmPassword: '',
        };
      });
      Router.push('/login', '/login');
    }
    catch (error) {
      runInActionUtil(
        this,
        'resetErrors',
        { visible: true, message: error.response.data.message },
      );
    }
    finally {
      runInActionUtil(
        this,
        'resetLoading',
        { value: false, visible: false },
      );
    }
  }

  @action
  signupUtil = async (email, password, googleId = '') => {
    try {
      runInActionUtil(
        this,
        'signupLoading',
        { value: true, visible: true },
      );
      const res = await axiosInstance.post(`${baseUrl}/users`, {
        email,
        password,
        googleId,
      })
        // eslint-disable-next-line consistent-return
        .then(res2 => {
          if (res2.status === 201) {
            const tokenRes = axiosInstance.post(`${baseUrl}/authentication`, {
              email,
              password,
              strategy: 'local',
            });
            return tokenRes;
          }
        });
      if (localStorage.getItem('inviteEmail')) {
        localStorage.removeItem('inviteEmail');
      }
      await login({ token: res.data.accessToken });
      runInAction(() => {
        this.user = res.data.user;
        this.signupLoading = {
          value: false,
          visible: false,
        };
        this.signupEmailOptions.disabled = false;
        this.signupData = {
          email: '',
          password: '',
          confirmPassword: '',
        };
      });
      Router.push('/dashboard', '/dashboard');
    }
    catch (error) {
      runInAction(() => {
        this.signupErrors = { visible: true, message: error.response.data.message };
        this.signupEmailOptions.disabled = false;
      });
    }
    finally {
      runInActionUtil(
        this,
        'signupLoading',
        { value: false, visible: false },
      );
    }
  }

  @action
  loginUtil = async (email, password) => {
    try {
      runInActionUtil(
        this,
        'loginLoading',
        { value: true, visible: true },
      );
      const res = await axiosInstance.post(`${baseUrl}/authentication`, {
        email,
        password,
        strategy: 'local',
      });
      await login({ token: res.data.accessToken });
      runInAction(() => {
        this.user = res.data.user;
        this.loginLoading = {
          value: false,
          visible: false,
        };
        this.loginData = {
          email: '',
          password: '',
        };
      });
      Router.push('/dashboard', '/dashboard');
    }
    catch (error) {
      runInActionUtil(
        this,
        'loginErrors',
        { visible: true, message: error.response.data.message },
      );
    }
    finally {
      runInActionUtil(
        this,
        'loginLoading',
        { value: false, visible: false },
      );
    }
  }

  @action
  login = async (e, type, profile = null) => {
    if (e) e.preventDefault();
    if (type === 'local') {
      if (
        this.validateEmail('loginData', 'loginValidationErrors')
        && this.validatePassword('loginData', 'loginValidationErrors')
      ) {
        this.loginUtil(
          this.loginData.email,
          this.loginData.password,
        );
      }
      else {
        this.loginValidationErrors = {
          visible: true,
          type: 'form',
          message: 'All fields below should be filled out.',
        };
      }
    }
    if (type === 'googleAuth') {
      this.loginUtil(
        profile.email,
        profile.googleId,
      );
    }
  };

  @action
  signup = async (e, type, profile = null) => {
    if (e) e.preventDefault();
    if (type === 'local') {
      if (
        this.validateEmail()
        && this.validatePassword()
        && this.validatePasswordMatch()
      ) {
        this.signupUtil(
          this.signupData.email,
          this.signupData.password,
        );
      }
      else {
        this.signupValidationErrors = {
          visible: true,
          type: 'form',
          message: 'All fields below should be filled out, and passwords must match.',
        };
      }
    }
    if (type === 'googleAuth') {
      this.signupUtil(
        profile.email,
        profile.googleId,
        profile.googleId,
      );
    }
  };

  @action
  recovery = async e => {
    if (e) e.preventDefault();
    if (
      this.validateEmail('recoveryData', 'recoveryValidationErrors')
    ) {
      this.recoveryUtil(
        this.recoveryData.email,
      );
    }
    else {
      this.recoveryValidationErrors = {
        visible: true,
        type: 'form',
        message: 'All fields below should be filled out.',
      };
    }
  };

  @action
  reset = async (e, token) => {
    if (e) e.preventDefault();
    if (
      this.validatePassword('resetData', 'resetValidationErrors')
      && this.validatePasswordMatch('resetData', 'resetValidationErrors')
    ) {
      this.resetUtil(
        this.resetData.password,
        token,
      );
    }
    else {
      this.resetValidationErrors = {
        visible: true,
        type: 'form',
        message: 'Passwords maybe too short or passwords don\'t match',
      };
    }
  };

  @action
  getUserData = async () => {
	  try {
      if (!this.user._id) {
        const resp = await axiosInstance.get(`${baseUrl}/users`);
        runInActionUtil(
          this,
          'user',
          resp.data.data[0],
        );
        runInActionUtil(
          this,
          'personalSettingsActionError',
          {
            type: '',
            visible: false,
            message: '',
          },
        );
      }
	  }
	  catch (error) {
	    runInActionUtil(
	      this,
	      'personalSettingsActionError',
	      {
          type: 'getError',
          visible: true,
          message: error.response.data.message,
        },
	    );
	  }
  };

  @action
  patchUser = async () => {
	  try {
      if (
        this.user._id
        && this.validatePassword('user', 'personalSettingsActionError')
        && this.validatePasswordMatch('user', 'personalSettingsActionError')
      ) {
        const resp = await axiosInstance.patch(`${baseUrl}/users/${this.user._id}`, {
          fullname: this.user.fullname,
          password: this.user.password,
        });
        runInActionUtil(
          this,
          'user',
          resp.data,
        );
        runInActionUtil(
          this,
          'success',
          { visible: true, message: 'Your personal information has been updated.' },
        );
        runInActionUtil(
          this,
          'personalSettingsActionError',
          {
            type: '',
            visible: false,
            message: '',
          },
        );
      }
	  }
	  catch (error) {
	    runInActionUtil(
	      this,
	      'personalSettingsActionError',
	      {
          type: 'patchError',
          visible: true,
          message: error.response.data.message,
        },
	    );
	  }
  };

  @action
  deleteUser = async () => {
	  try {
      if (
        this.user._id) {
        await axiosInstance.delete(`${baseUrl}/users/${this.user._id}`);
        logout();
        runInActionUtil(
          this,
          'user',
          {},
        );
        runInActionUtil(
          this,
          'personalSettingsActionError',
          {
            type: '',
            visible: false,
            message: '',
          },
        );
      }
	  }
	  catch (error) {
	    runInActionUtil(
	      this,
	      'personalSettingsActionError',
	      {
          type: 'deleteError',
          visible: true,
          message: error.response.data.message,
        },
	    );
	  }
  };

	@action
	setClassProps = (arr, self = this) => setClassProps(arr, self);
}
