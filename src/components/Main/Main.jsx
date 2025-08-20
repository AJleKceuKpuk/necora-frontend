// src/components/Main/Main.jsx
import './css/main.css';
import AnimatedOutlet from '../../services/AnimatedOutlet';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '../../hooks/useNavigation';


const Main = ({ game }) => {
    const location = useLocation();
    const { pathname } = useNavigation();
    const { isAuthenticated } = useAuth();

    const currentPath = pathname;
    console.log(currentPath);
    console.log(location.pathname);
    
    
    const guestOnlyRoutes = ['/signin', '/signup', '/recovery', '/sendcode'];

    const isGuestOnlyRoute = guestOnlyRoutes.some((path) =>
        currentPath.startsWith(path)
    );

    const authOnlyRoutes = ['/game', '/profile'];
    const isAuthOnlyRoute = authOnlyRoutes.some((path) =>
        currentPath.startsWith(path)
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
                game and auth
                <div className="main-right game" />
            </main>
        );
    }

    // ✅ Просто авторизован
    if (isAuthenticated) {
        return (
            <main className="main main-start-page">
                <div className="main-left" />

                <AnimatedOutlet game />

                <div className="main-right" />
            </main>
        );
    }

    // ❌ Гость — рендерим анимированный outlet
    return (
        <main className="main main-start-page">
            <div className="main-left" />
            <AnimatedOutlet game />
            <div className="main-right" />
        </main>
    );
};

export default Main;
