import api from './axiosInstance';

export const registrationRequest = ({ username, email, password, language }) =>
  api.post('/registration', { username, email, password, language }).then(res => res);

export const loginRequest = ({ username, password }) =>
  api.post('/login', { username, password }).then(res => res.data.accessToken);

export const logoutRequest = () =>
  api.post('/logout');

export const activationRequest = ({ username, code }) =>
  api.post('/activation', { username, code }).then(res => res);

export const recoveryRequest = ({ username, code, newPassword, language }) =>
  api.post('/recovery', { username, code, newPassword, language }).then(res => res);


//Получить код активации
export const activationCodeRequest = ({ username, language }) =>
  api.post('/code/activation', { username, language }).then(res => res);

//Получить код востановления
export const recoveryCodeRequest = ({ username, language } ) =>
  api.post('/code/recovery',  {username, language }).then(res => res);

