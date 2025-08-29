import { useEffect, useState } from "react";
import icons from "../../assets/images/images";

const Overlay = ({ title, description }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // плавное появление
        const enterTimer = setTimeout(() => setVisible(true), 10);

        // плавное исчезновение
        const exitTimer = setTimeout(() => setVisible(false), 2900);

        return () => {
            clearTimeout(enterTimer);
            clearTimeout(exitTimer);
        };
    }, []);

    return (
        <div className={`overlay ${visible ? "overlay--visible" : ""}`}>
            <div />
            <div className="overlay__container">
                <div className="overlay__content">
                    <img className="overlay__image" src={icons.check} alt="Check" />
                    <div className="overlay__title">{title}</div>
                    <div className="overlay__description">{description}</div>
                </div>
            </div>
            <div />
        </div>
    );
};

export default Overlay;
