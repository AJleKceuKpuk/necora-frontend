
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../provider/ProfileProvider';

const RouteGuard = ({ children, meta }) => {
    const { isAuthenticated } = useAuth();
    const { profile, isLoading } = useProfile();

    if (isLoading) return null;

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
            return <Navigate to="/403" replace />; // или /not-authorized
        }
    }

    return children;
};

export default RouteGuard;
