
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../provider/ProfileProvider';
import { useEffect } from 'react';

const RouteGuard = ({ children, meta }) => {
    const location = useLocation();
    const { isAuthenticated, justLoggedIn, setJustLoggedIn } = useAuth();
    const { profile, isLoading } = useProfile();

    useEffect(() => {
        console.log('Current route:', location.pathname);
        console.log({ isAuthenticated, justLoggedIn, isLoading, location, profile, meta, });
        if(location.pathname === '/activate'){
            setJustLoggedIn(false)
        }
    }, [justLoggedIn, setJustLoggedIn, isAuthenticated, isLoading, profile, meta, location]);

    if (isLoading) return null;

    if (justLoggedIn && isAuthenticated) {
        return <Navigate to="/activate" replace />;
    }

    if (meta?.public) return children;

    if (meta?.guestOnly && isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (meta?.auth && !isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    if (meta?.activationRequired && !profile?.activate) {
        return <Navigate to="/activate" replace />;
    }

    if (meta?.onlyIfNotActivated && profile?.activate) {
        return <Navigate to="/" replace />;
    }

    if (meta?.roles) {
        const userRoles = profile?.roles || [];
        const hasAccess = meta.roles.some(role => userRoles.includes(role));
        if (!hasAccess) {
            return <Navigate to="/" replace />; 
        }
    }

    return children;
};

export default RouteGuard;
