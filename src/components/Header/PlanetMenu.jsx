import { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./css/header.css";
import icons from "../../images/images";

const PlanetMenu = () => {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    //Закрытие меню   
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Если клик вне области dropdown, закрываем меню
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
        <div className="planet-container no-select" onClick={toggleMenu}>
            <div className="current-planet header-button " ref={dropdownRef}>
                <img src={icons.planet} alt="planet" />
                <div className='planet' >Planet [1:11:11]</div>
            </div>

            <div className={`dropdown-planet-content ${isOpen ? "" : "hide"}`}>

                <div className="planet-container-item">
                    <div className="planet-coordinates">[11:11:11]</div>
                    <div className="planet-details">
                        <div className="planet-details-left header-button">
                            
                            <div className="planet-details-info">
                                <div className="img-container img-36">
                                    <img src={icons.planet} alt="planet" />
                                </div>
                                <div className="planet-details-name">Planet</div>
                                <div className="planet-details-weaponry">
                                    <div className="card-text">100k</div>
                                    <div className="card-text">10k</div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="planet-details-right header-button">
                            <div className="planet-details-name">Moon</div>
                            <div className="planet-details-info">
                                <div className="img-container img-36">
                                    <img src={icons.moon} alt="moon" />
                                </div>
                                <div className="card-text">10k</div>
                                <div className="card-text">10k</div>
                            </div>
                        </div>
                    </div>
                </div>


                <li>
                    <ul>1 planet</ul>
                    <ul>1 planet</ul>
                    <ul>1 planet</ul>
                    <ul>1 planet</ul>
                </li>
            </div>
        </div>
        

    );
};

export default PlanetMenu;
