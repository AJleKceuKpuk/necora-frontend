import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getProfileRequest } from "../api/profileApi";
import { useProfile } from '../provider/ProfileProvider';
import { useWebSocket } from '../hooks/useWebSocket';

const RouteAuthListener = () => {
    const { logout, isAuthenticated } = useAuth();
    const { pathname } = useLocation();
    const { profile } = useProfile();
    const { send, status } = useWebSocket();

    const lastCheckedPath = useRef(null);

    useEffect(() => {
        if (lastCheckedPath.current === pathname) return;
        lastCheckedPath.current = pathname;
        const checkProfile = async () => {
            if (isAuthenticated) {
                try {
                    await getProfileRequest();
                } catch (e) {
                    if (e.response?.data?.error === "ERROR_TOKEN_INVALID") {
                        logout();
                    } else {
                        console.error(e);
                        logout();
                    }
                }
            }
        };
        checkProfile();
    }, [pathname, isAuthenticated, logout]);


    useEffect(() => {
        const handleClick = () => {
            if (status === 'open' && profile?.id) {
                send('/ws/online/update', {
                    userId: profile.id,
                    status: 'online'
                });
            }
        };
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [status, profile?.id, send]);

    return null;
};

export default RouteAuthListener;
