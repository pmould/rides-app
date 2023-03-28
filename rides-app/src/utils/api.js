import jwt_decode from 'jwt-decode';

export let authToken = null;
export let expiration = null;
export let accountId = null;
export let userId = null;

if (typeof(Storage) !== 'undefined') {
  authToken = localStorage.authToken;
  expiration = localStorage.expiration;
  accountId = localStorage.accountId;
  userId = localStorage.userId;
} else {
    // Sorry! No Web Storage support..
}

export const setAuthToken = (jwt) => {
  let data;

  try {
  data  = jwt_decode(jwt);
  }
  catch(ex) {
    localStorage.authToken = authToken = jwt;
  }

  const {exp = null, accountId, userId} = data;

  if ((typeof(Storage) !== 'undefined') && exp) {
    localStorage.authToken = authToken = jwt;
    localStorage.expiration = expiration = exp;
    localStorage.accountId = accountId;
    localStorage.userId = userId;
  } else {
      // Sorry! No Web Storage support..
  }
}

export const resetAuthentication = () => {
  localStorage.clear();
  window.location.href = '/home';
}

export const isAuthenticated = () => {

  if (!authToken || (((Date.now()/1000) - expiration) > 0)) {
    localStorage.clear();
    authToken = null;
    accountId = null;
    expiration = null;
    userId = null;
  }
  return authToken !== null;
};

export const baseFetch = async (uri, options = {}) => {
  const {headers = {}, body = null} = options;


  if (body instanceof FormData) {
    options.body = body
  }
  else if (body){
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  if (authToken) {
    headers.Authorization = authToken;
  }

  const req = new Request(uri, {
    ...options,
    mode: 'cors',
    headers: new Headers({
      ...headers
    })
  });

  const response = await fetch(req);
  if (response.status >= 400) {
    const body = await response.json();
    const message = body.message || 'An error has occured';

    throw new Error(message);
  }

  return response;
};

export const ridesWebApi = (uri, options) => baseFetch(`${process.env.REACT_APP_RIDES_WEB_API}${uri}`, options);