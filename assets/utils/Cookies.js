import Cookies from 'js-cookie';

// User
const tokenKey = 'AccessToken';
export const getToken = () => Cookies.get(tokenKey);
export const setToken = (token) => {
  const expires = new Date();
  expires.setHours(expires.getHours() + 5);
  if (token) {
    Cookies.set(tokenKey, token, { expires });
  } else {
    Cookies.set(tokenKey, token);
  }
};
export const removeToken = () => Cookies.remove(tokenKey);
