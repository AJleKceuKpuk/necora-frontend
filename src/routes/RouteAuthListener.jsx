import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getProfileRequest } from "../api/profileApi"

const RouteAuthListener = () => {
    const { logout, isAuthenticated } = useAuth();
    const { pathname } = useLocation();

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

    return null;
};

export default RouteAuthListener;
