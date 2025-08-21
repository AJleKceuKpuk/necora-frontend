import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RouteAuthListener = () => {
    const { validateSession } = useAuth();
    const { pathname } = useLocation();

    useEffect(() => {
        const checkProfile = async () => {
            validateSession();
        };
        checkProfile();
    }, [pathname, validateSession]);

    return null;
};

export default RouteAuthListener;
