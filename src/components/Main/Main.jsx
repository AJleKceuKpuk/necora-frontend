// src/components/Main/Main.jsx
import './css/main.css';
import AnimatedOutlet from '../../services/AnimatedOutlet';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Main = ({ game }) => {
    const location = useLocation();
    const pathname = location.pathname;
    const { isAuthenticated } = useAuth();

    const guestOnlyRoutes = ['/signup', '/signup', '/recovery', '/sendcode'];

    const isGuestOnlyRoute = guestOnlyRoutes.some((path) =>
        pathname.startsWith(path)
    );
    const authOnlyRoutes = ['/game', '/profile'];
    const isAuthOnlyRoute = authOnlyRoutes.some((path) =>
        pathname.startsWith(path)
    );

    if (!isAuthenticated && isAuthOnlyRoute) {
        return <Navigate to="/signin" replace />;
    }

    if (isAuthenticated && isGuestOnlyRoute) {
        return <Navigate to="/" replace />;
    }

    if (game && isAuthenticated) {
        return (
            <main className="main main-start-page">
                <div className="main-left game" />
                <div className="main-center">game and auth</div>
                <div className="main-right game" />
            </main>
        );
    }

    // ✅ Просто авторизован
    if (isAuthenticated) {
        return (
            <main className="main main-start-page">
                <div className="main-left" />
                <div className="main-center">
                    is auth
                </div>
                <div className="main-right" />
            </main>
        );
    }

    // ❌ Гость — рендерим анимированный outlet
    return (
        <main className="main main-start-page">
            <div className="main-left" />
            <AnimatedOutlet game/>
            <div className="main-right" />
        </main>
    );
};

export default Main;
