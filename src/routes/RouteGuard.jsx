import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../provider/ProfileProvider';
import { useEffect } from 'react';

const RouteGuard = ({ children, meta }) => {
    const location = useLocation();
    const { isAuthenticated, authPhase, setAuthPhase } = useAuth();
    const { profile, isLoading } = useProfile();

    useEffect(() => {
        const resetPaths = ["/activate", "/reset-password"];
        if (!resetPaths.includes(location.pathname) && authPhase !== "") {
            setAuthPhase("");
        }
        if (location.pathname === "/" && sessionStorage.getItem("recoveryCode")) {
            sessionStorage.removeItem("recoveryCode")
        }
    }, [location.pathname]);

    if (isAuthenticated) {
        if (meta?.guestOnly && authPhase === "") {
            return <Navigate to="/" replace />;
        }

        if (meta?.activationRequired && !profile.activate) {
            return <Navigate to="/activate" replace />;
        }

        if (meta?.onlyIfRecovery && !sessionStorage.getItem("recoveryCode")) {
            return <Navigate to="/" replace />;
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
