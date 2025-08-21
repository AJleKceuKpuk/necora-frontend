import api from './axiosInstance';

export const getProfileRequest = () =>
    api.get('/user/profile').then(res => res.data);