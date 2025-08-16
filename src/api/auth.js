import api from './axiosInstance';

export const registrationRequest = ({ username, email, password }) => 
  api.post('/registration', {username, email, password }).then(res => res);

// POST Входим и получаем AccessToken
export const loginRequest = ({ username, password }) => 
  api.post('/login', {username, password }).then(res => res.data.accessToken);

// POST Обноление AccessToken
export const refreshAccessToken = () =>
  api.post('/token/refresh').then(res => res.data.accessToken);


export const getProfile = () =>
  api.get('/user/profile');

export const logout = () =>
  api.post('/logout');