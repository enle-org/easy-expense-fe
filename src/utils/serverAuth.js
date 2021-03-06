import React, { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

import axiosInstance from './axiosInstance';

const login = ({ token }) => {
  cookie.set('token', token, { expires: 7 });
  Object.assign(axiosInstance.defaults, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const setUser = async ({ fullname, email }, expiresIn = '7days') => {
  cookie.set(
    'user',
    jwt.sign(
      {
        fullname,
        email,
      },
      'key',
      { expiresIn },
    ),
    { expires: 7 },
  );
};

const getUser = () => {
  const user = cookie.get('user');
  return jwt.decode(user);
};

const auth = ctx => {
  const { token } = nextCookie(ctx);

  /*
   * If `ctx.req` is available it means we are on the server.
   * Additionally if there's no token it means the user is not logged in.
   */
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    Router.push('/login', '/login');
  }

  return token;
};

const logout = () => {
  cookie.remove('token');
  cookie.remove('user');
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
  Object.assign(axiosInstance.defaults, { headers: { Authorization: null } });
  Router.push('/login', '/login');
};

const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        Router.push('/login', '/login');
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, [null]);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);

    // eslint-disable-next-line max-len
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps, token };
  };
  return Wrapper;
};

const decodeToken = () => {
  const token = cookie.get('token');
  return jwt.decode(token);
};

export { login, setUser, getUser, auth, logout, withAuthSync, decodeToken };
