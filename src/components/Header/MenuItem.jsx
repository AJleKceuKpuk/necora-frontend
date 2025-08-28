import { Link } from 'react-router-dom';

const MenuItem = ({ to, icon, label, onClick }) => (
    <Link to={to} className="header__right-dropdown-item header__button no-select" onClick={onClick}>
        <div className="img-container img-36">
            <img src={icon} alt={label} />
        </div>
        <div>{label}</div>
    </Link>
);

export default MenuItem;
