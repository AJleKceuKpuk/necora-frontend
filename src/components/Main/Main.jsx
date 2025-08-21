import './css/main.css';
import AnimatedOutlet from '../../services/AnimatedOutlet';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Main = ({ game }) => {
    const location = useLocation();

    useEffect(() => {
        console.log('Current route:', location.pathname);
    }, [location.pathname]);


    const { isAuthenticated } = useAuth();
    if (game && isAuthenticated) {
        return (
            <main className="main main-start-page">
                <div className="main-left game" />
                game and auth
                <div className="main-right game" />
            </main>
        );
    }

    return (
        <main className="main main-start-page">
            <div className="main-left" />
            <AnimatedOutlet game />
            <div className="main-right" />
        </main>
    );
};

export default Main;
