
import React, { createContext, useState, useCallback, useMemo } from 'react'
import { getProfileRequest } from '../api/profileApi'

export const ProfileContext = createContext(null)

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null)

    const getProfile = useCallback(async () => {
        const user = await getProfileRequest();
        
        setProfile(user);
        return user;
    }, []);

    const value = useMemo(
        () => ({ profile, getProfile, setProfile }),
        [profile, getProfile, setProfile]
    )

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => React.useContext(ProfileContext)
