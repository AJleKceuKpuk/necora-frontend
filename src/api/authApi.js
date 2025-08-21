import api from './axiosInstance';

export const registrationRequest = ({ username, email, password, localisation }) =>
  api.post('/registration', { username, email, password, localisation }).then(res => res);

export const loginRequest = ({ username, password }) =>
  api.post('/login', { username, password }).then(res => res.data.accessToken);

export const logoutRequest = () =>
  api.post('/logout');

export const activationRequest = ({ username, code }) =>
  api.post('/code/activation', { username, code }).then(res => res);

export const recoveryRequest = ({ username, code, newPassword, localisation }) =>
  api.post('/code/recovery', { username, code, newPassword, localisation }).then(res => res);

export const activationCodeRequest = ({ username, localisation }) =>
  api.post('/code/activation', { username, localisation }).then(res => res);

export const recoveryCodeRequest = ({ username, localisation }) =>
  api.post('/code/activation', { username, localisation }).then(res => res);