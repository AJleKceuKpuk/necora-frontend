import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from './api/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from './hooks/useAuth';

const RouteAuthListener = () => {
    const { logout, validateToken, setIsAuthenticated, setUsername, setProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {

        const checkProfile = async () => {

            const token = localStorage.getItem('accessToken');
            const isValid = await validateToken(token);

            if (isValid) {
                const decoded = jwtDecode(token);
                setIsAuthenticated(true);
                setUsername(decoded.sub);
                try {
                    const user = await api.get('/user/profile');
                    setProfile(user);
                } catch (err) {
                    const status = err.response?.status;
                    const errorCode = err.response?.data?.error;

                    if (status === 403 && errorCode === 'ERROR_TOKEN_INVALID') {
                        logout();
                    }
                }
            } else {
                logout();
            }
        };

        checkProfile();
    }, [location.pathname, logout, navigate]);

    return null;
};

export default RouteAuthListener;
