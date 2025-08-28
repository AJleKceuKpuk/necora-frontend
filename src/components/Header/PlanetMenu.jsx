import { useState, useRef, useEffect, useCallback } from "react";
import icons from "../../assets/images/images";

const PlanetMenu = () => {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    //Закрытие меню   
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && isOpen) {
                toggleMenu();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, toggleMenu]);




    return (
        <div className="header__planet no-select" ref={dropdownRef} >
            <div className="header__planet-current header__button " onClick={toggleMenu}>
                <img src={icons.planet} alt="planet" />
                <div className='header__planet-name' >Planet [1:11:11]</div>
            </div>

            <div className={`header__planet-content ${isOpen ? "" : "header__planet-content--hide"}`}>

                <div className="header__planet-item">
                    <div className="header__planet-coordinates">[11:11:11]</div>
                    <div className="header__planet-card">
                        <div className="header__button header__planet-active">
                            <div className="header__planet-details">
                                <div className="header__planet-title">
                                    <div className="img-container img-36">
                                        <img src={icons.planet} alt="planet" />
                                    </div>
                                    <div className="header__planet-name">Planet</div>
                                </div>
                                <div className="header__planet-weaponry">
                                    <div className="header__planet-stat">
                                        <div className="img-container img-15">
                                            <img src={icons.swords} alt="planet" />
                                        </div>
                                        <div>99K</div>
                                    </div>
                                    <div className="header__planet-stat">
                                        <div className="img-container img-15">
                                            <img src={icons.shield} alt="planet" />
                                        </div>
                                        <div>999M</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="header__button">
                            <div className="header__planet-details">
                                <div className="header__planet-weaponry">
                                    <div className="header__planet-stat">
                                        <div className="img-container img-15">
                                            <img src={icons.swords} alt="planet" />
                                        </div>
                                        <div>999B</div>
                                    </div>
                                    <div className="header__planet-stat">
                                        <div className="img-container img-15">
                                            <img src={icons.shield} alt="planet" />
                                        </div>
                                        <div>999T</div>
                                    </div>
                                </div>
                                <div className="header__planet-title">
                                    <div className="header__planet-name">Moon</div>
                                    <div className="img-container img-36">
                                        <img src={icons.moon} alt="planet" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>


    );
};

export default PlanetMenu;
