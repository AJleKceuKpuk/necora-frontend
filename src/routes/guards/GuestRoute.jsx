import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default GuestRoute;
