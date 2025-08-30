import { useEffect, useState } from "react";
import icons from "../../assets/images/images";
import check from "../../assets/images/check.webp"

const Overlay = ({ title, description }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (imageLoaded) {
            const enterTimer = setTimeout(() => setVisible(true), 10);
            const exitTimer = setTimeout(() => setVisible(false), 2900);

            return () => {
                clearTimeout(enterTimer);
                clearTimeout(exitTimer);
            };
        }
    }, [imageLoaded]);

    return (
        <div className={`overlay ${visible ? "overlay--visible" : ""}`}>
            <div />
            <div className="overlay__container">
                <div className="overlay__content">
                    <img
                        className="overlay__image"
                        src={check}
                        alt="Check"
                        onLoad={() => setImageLoaded(true)}
                    />
                    {imageLoaded && (
                        <>
                            <div className="overlay__title">{title}</div>
                            <div className="overlay__description">{description}</div>
                        </>
                    )}
                </div>
            </div>
            <div />
        </div>
    );
};


export default Overlay;
