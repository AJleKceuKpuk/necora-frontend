import api from './axiosInstance';

export const registrationRequest = ({ username, email, password, language }) =>
  api.post('/registration', { username, email, password, language }).then(res => res.data.accessToken);

export const loginRequest = ({ email, password }) =>
  api.post('/login', { email, password }).then(res => res.data.accessToken);

export const recoveryRequest = ({ email, code, language }) =>
  api.post('/recovery', { email, code, language }).then(res => res);

export const resetPasswordRequest = ({ password, passwordApply, code}) => 
  api.post("/reset-password", { password, passwordApply, code}).then(res => res);

export const logoutRequest = () =>
  api.post('/logout');

export const activationRequest = ({ username, code }) =>
  api.post('/activation', { username, code }).then(res => res);

//Получить код активации
export const activationCodeRequest = ({ language }) =>
  api.post('/code/activation', { language }).then(res => res);

//Получить код востановления
export const recoveryCodeRequest = ({ email, language }) =>
  api.post('/code/recovery', { email, language }).then(res => res);

