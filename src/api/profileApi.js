import api from './axiosInstance';

export const getProfileRequest = () =>
    api.get('/user/profile').then(res => res.data);

export const updateUiSettingRequest = ({uiSettings}) =>
    api.put("/user/update-ui", {uiSettings});