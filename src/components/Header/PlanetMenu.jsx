import { useState, useRef, useEffect, useCallback } from "react";
import "./css/header.css";
import icons from "../../images/images";

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
        <div className="planet-container no-select" ref={dropdownRef} >
            <div className="current-planet header-button " onClick={toggleMenu}>
                <img src={icons.planet} alt="planet" />
                <div className='planet' >Planet [1:11:11]</div>
            </div>

            <div className={`dropdown-planet-content ${isOpen ? "" : "hide"}`}>

                <div className="planet-container-item">
                    <div className="planet-coordinates">[11:11:11]</div>
                    <div className="planet-details">
                        <div className="planet-details-left header-button current-item-planet">
                            <div className="planet-details-info">
                                <div className="planet-details-tittle">
                                    <div className="img-container img-36">
                                        <img src={icons.planet} alt="planet" />
                                    </div>
                                    <div className="planet-details-name">Planet</div>
                                </div>

                                <div className="planet-details-weaponry">

                                    <div className="card-text">
                                        <div className="img-container img-15">
                                            <img src={icons.swords} alt="planet" />
                                        </div>
                                        <div>99K</div>
                                    </div>

                                    <div className="card-text">
                                        <div className="img-container img-15">
                                            <img src={icons.shield} alt="planet" />
                                        </div>
                                        <div>999M</div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="planet-details-right header-button">
                            <div className="planet-details-info">


                                <div className="planet-details-weaponry">

                                    <div className="card-text">
                                        <div className="img-container img-15">
                                            <img src={icons.swords} alt="planet" />
                                        </div>
                                        <div>999B</div>
                                    </div>

                                    <div className="card-text">
                                        <div className="img-container img-15">
                                            <img src={icons.shield} alt="planet" />
                                        </div>
                                        <div>999T</div>
                                    </div>

                                </div>
                                <div className="planet-details-tittle">
                                    <div className="planet-details-name">Moon</div>
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
