import { createContext, useContext, useState, useEffect } from "react"; 
import { useLocation } from "react-router-dom";

const OverlayContext = createContext();

export const OverlayProvider = ({ children }) => {
    const [active, setActive] = useState(false);
    const [content, setContent] = useState({
        title: "",
        description: "", 
        type: ""
    });

    const location = useLocation();

    const showOverlay = (title, description, type = "") => {
        setContent({ title, description, type });
        setActive(true);
        setTimeout(() => {
            setActive(false);
            setContent({ title: "", description: "", type: "" });
        }, 3000);
    };

    useEffect(() => {
        setActive(false);
        setContent({ title: "", description: "", type: "" });
    }, [location.pathname]);

    return (
        <OverlayContext.Provider value={{ active, showOverlay, content }}>
            {children}
        </OverlayContext.Provider>
    );
};

export const useTransition = () => useContext(OverlayContext);
