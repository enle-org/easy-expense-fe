import React from 'react';
import { runInAction } from 'mobx';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import LoadingBar from 'react-top-loading-bar';

import config from '../../config';

const axios = require('axios');

/**
 * Function used to assign values to the members of
 * this class from an external methods or a react component.
 * @param {Array} arr - An array key:value pairs of class members and their values
 * @param {Object} self - Refers to the class itself or a member.
 */
const setClassProps = (arr, self) => {
  arr.forEach(elem => {
    self[elem.name] = elem.value;
  });
};

/**
 * Function for selectively rendering a react element
 * based on the condition param.
 * @param {Boolean} condition - determines if the element will be rendered or not.
 * @param {Element} self - React Element.
 */
const renderIf = (condition, content) => {
  if (condition) {
    return content;
  }
  return null;
};

/**
 * Performs a type of request based on the passed REST verb.
 * @param {String} verb - REST verb.
 * @param {String} urlPart - API endpoint.
 * @param {Object} data - data in for a POST or PATCH request.
 * @param {String} serverToken - Auth token retrieved from the server.
 */
const axiosCore = (verb, urlPart, data = null, serverToken = null) => {
  const token = serverToken || cookie.get('token');
  if (!token) {
    Router.push('/login', '/login');
  }

  if (verb === 'get') {
    return axios[verb](
      `${config.API_URL}/${urlPart}`,
      token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {},
    );
  }
  return axios[verb](
    `${config.API_URL}/${urlPart}`,
    data,
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {},
  );
};

/**
 * Performs a GET request.
 * @param {String} urlPart - API endpoint.
 * @param {String} token - Auth token.
 */
const getData = (urlPart, token = null) =>
  axiosCore('get', urlPart, null, token);

/**
 * Performs a POST request.
 * @param {String} urlPart - API endpoint.
 * @param {Object} data - data in for the request.
 */
const postData = (urlPart, data) => axiosCore('post', urlPart, data);

/**
 * Performs a PATCH request.
 * @param {String} urlPart - API endpoint.
 * @param {Object} data - data in for the request.
 */
const patchData = (urlPart, data) => axiosCore('patch', urlPart, data);

/**
 * MobX runInAction util.
 * @param {Object} self - Refers to the class itself.
 * @param {String} prop - A class member.
 * @param {any} data - Class member value.
 */
const runInActionUtil = (self, prop, data) => {
  runInAction(() => {
    self[prop] = data;
  });
};

/**
 * NextJS component getInitialProps util.
 * Fetches initial data used in rendering
 * the component on the server.
 * Also, redirects to login if not authenticated.
 * @param {Object} ctx - Context.
 * @param {String} urlPart - API endpoint.
 */
// eslint-disable-next-line consistent-return
const getInitialProps = async (ctx, urlPart) => {
  const { token } = nextCookie(ctx);
  const redirectOnError = () => {
    if (window !== 'undefined') {
      Router.push('/login', '/login');
    } else {
      ctx.res.writeHead(302, {
        Location: '/login',
      });
      ctx.res.end();
    }
  };

  try {
    const data = await getData(urlPart, token).then(res => res.data);
    if (data) {
      return data;
    }
    return await redirectOnError();
  } catch (error) {
    redirectOnError();
  }
};

/**
 * Redirects to login if not authenticated.
 * @param {Object} ctx - Context.
 */
const checkAuth = async (ctx, type = 'notSignedIn') => {
  const { token } = nextCookie(ctx);

  if (!token && type === 'checkSignedOut') {
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: '/login',
      });
      ctx.res.end();
    }
  }

  if (token && type === 'checkSignedIn') {
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: '/dashboard',
      });
      ctx.res.end();
    }
  }

  return {};
};

const getLoader = (self, complete = false) => {
  if (self.state.window) {
    if (complete) {
      return (
        <LoadingBar
          height={6}
          color="#6C63FF"
          onRef={ref => ref && ref.complete()}
        />
      );
    }
    return (
      <LoadingBar
        height={6}
        color="#6C63FF"
        onRef={ref => ref && ref.continuousStart()}
      />
    );
  }
  return <div />;
};

export {
  setClassProps,
  renderIf,
  getData,
  postData,
  patchData,
  runInActionUtil,
  getInitialProps,
  checkAuth,
  getLoader,
};
