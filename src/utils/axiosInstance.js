import axios from 'axios';
import cookie from 'js-cookie';

const axiosInstance = axios.create();

const token = cookie.get('token');

if (token) {
  Object.assign(axiosInstance.defaults, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export default axiosInstance;
