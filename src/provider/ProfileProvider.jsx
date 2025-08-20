// context/ProfileContext.js
import React, { createContext, useState, useCallback, useMemo } from 'react'
import { getProfileRequest } from '../api/profileApi'

export const ProfileContext = createContext(null)

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null)

    const fetchProfile = useCallback(async () => {
        const data = await getProfileRequest()
        setProfile(data)
        return data
    }, [])

    const value = useMemo(
        () => ({ profile, fetchProfile, setProfile }),
        [profile, fetchProfile]
    )

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => React.useContext(ProfileContext)
