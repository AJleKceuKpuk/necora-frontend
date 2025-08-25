// components/DropdownItem.jsx
import { Link } from 'react-router-dom';

const MenuItem = ({ to, icon, label, onClick }) => (
    <Link to={to} className="dropdown-item header-button no-select" onClick={onClick}>
        <div className="img-container img-36 header-button">
            <img src={icon} alt={label} />
        </div>
        <div>{label}</div>
    </Link>
);

export default MenuItem;
