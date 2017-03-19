import { LOCAL_STORAGE_AUTH_KEY } from 'src/config';

export const clearToken = () =>
  window.localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);

export const getToken = () =>
  window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

export const setToken = token =>
  window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, token);
