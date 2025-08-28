import React from 'react';

const HeaderButton = ({ icon, alt, size = 36, className = '', onClick }) => {
    return (
        <div
            className={`img-container img-${size} header__button ${className}`.trim()}
            onClick={onClick}
        >
            <img src={icon} alt={alt} />
        </div>
    );
};

export default HeaderButton;
