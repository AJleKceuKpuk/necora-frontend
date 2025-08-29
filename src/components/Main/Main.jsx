import AnimatedOutlet from '../../services/AnimatedOutlet';
import { useAuth } from '../../hooks/useAuth';

const Main = ({ game }) => {

    const { isAuthenticated } = useAuth();
    if (game && isAuthenticated) {
        return (
            <main className="main">
                <div className="main__left--game" />
                game and auth
                <div className="main__right--game" />
            </main>
        );
    }

    return (
        <main className="main">
            <div className="main_left" />
            <AnimatedOutlet game />
            <div className="main-right" />
        </main>
    );
};

export default Main;
