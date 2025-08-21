import api from './axiosInstance';

export const refreshToken = () =>
  api.post('/token/refresh').then(res => res.data.accessToken);
