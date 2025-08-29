import AnimatedOutlet from '../../services/AnimatedOutlet';
import { useAuth } from '../../hooks/useAuth';
import { useTransition } from '../Overlay/OverlayContext';
import Overlay from '../Overlay/Overlay';

const Main = ({ game }) => {
    const { active, content } = useTransition();
    const { isAuthenticated } = useAuth();

    return (
        <main className="main">
            <div className={`main__left${isAuthenticated && game ? "--game" : ""}`} />
            {isAuthenticated && game ? <div>its game</div> : <AnimatedOutlet game />}
            <div className={`main__right${isAuthenticated && game ? "--game" : ""}`} />
            {active && <Overlay title={content.title} description={content.description} />}
            {/* <Overlay title="Kpuk, добро пожаловать" description="Вы успешно вошли в систему" /> */}
        </main>
    );
};

export default Main;
