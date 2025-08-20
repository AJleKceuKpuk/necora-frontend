import { useContext } from 'react';
import { ProfileContext } from '../context/ProfileContext';

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
};