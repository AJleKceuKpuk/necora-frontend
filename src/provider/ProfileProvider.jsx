import React, { createContext, useState, useMemo, useCallback } from 'react';
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
    const [isLoading, setIsLoading] = useState(false);
    const [uiSettings, setUiSettings] = useState();

    const getProfile = useCallback(async () => {
        setIsLoading(true);
        const user = await getProfileRequest();

        setProfile(user);

        try {
            const parsedSettings = JSON.parse(user.uiSettings || '{}');
            setUiSettings(parsedSettings);
        } catch (e) {
            console.warn('Ошибка парсинга uiSettings:', e);
        }
       
        
        setIsLoading(false);
        return user;
    }, []);

    const value = useMemo(() => ({
        profile,
        uiSettings,
        getProfile,
        setProfile,
        isLoading
    }), [profile, isLoading, uiSettings]);

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => React.useContext(ProfileContext);
