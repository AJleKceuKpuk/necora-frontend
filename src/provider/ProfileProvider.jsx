import React, { createContext, useState, useMemo } from 'react';
import api from '../api/axiosInstance';

export const ProfileContext = createContext(null);

let profilePromise = null;

const getProfileRequest = () => {
    if (profilePromise) return profilePromise;

    profilePromise = api.get('/user/profile')
        .then(res => res.data)
        .finally(() => {
            profilePromise = null;
        });

    return profilePromise;
};

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);

    const getProfile = async () => {
        const user = await getProfileRequest();
        setProfile(user);
        return user;
    };

    const value = useMemo(() => ({
        profile,
        getProfile,
        setProfile,
    }), [profile]);

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => React.useContext(ProfileContext);
