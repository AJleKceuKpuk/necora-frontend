import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../provider/ProfileProvider';
import { useEffect } from 'react';

const RouteGuard = ({ children, meta }) => {
    const location = useLocation();
    const { isAuthenticated, authPhase, setAuthPhase } = useAuth();
    const { profile, isLoading } = useProfile();

    useEffect(() => {
        const resetPaths = ["/", "/activate"];
        if (resetPaths.includes(location.pathname) && authPhase !== "") {
            setAuthPhase("");
        }
    }, [location.pathname, authPhase, setAuthPhase]);

    if (isLoading) return null;

    if (isAuthenticated) {
        if (authPhase === "login" && !profile.activate) {
            return <Navigate to="/activate" replace />;
        }

        if (authPhase === "recovery") {
            return <Navigate to="/reset-password" replace />;
        }

        if (meta?.guestOnly) {
            return <Navigate to="/" replace />;
        }

        if (meta?.activationRequired && !profile.activate) {
            return <Navigate to="/activate" replace />;
        }

        if (meta?.onlyIfNotActivated && profile.activate) {
            return <Navigate to="/" replace />;
        }

        if (meta?.roles) {
            const userRoles = profile.roles || [];
            const hasAccess = meta.roles.some(role => userRoles.includes(role));
            if (!hasAccess) {
                return <Navigate to="/" replace />;
            }
        }
    } else {
        if (meta?.auth) {
            return <Navigate to="/signin" replace />;
        }
    }

    return children;
};

export default RouteGuard;
