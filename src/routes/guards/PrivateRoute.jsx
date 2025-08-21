import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
