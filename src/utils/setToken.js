import axiosInstance from './axiosInstance';

export default function setToken(token) {
  if (token) {
    localStorage.setItem('token', token);
    Object.assign(axiosInstance.defaults, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  else {
    localStorage.removeItem('token');
    Object.assign(axiosInstance.defaults, { headers: { Authorization: null } });
  }
}
