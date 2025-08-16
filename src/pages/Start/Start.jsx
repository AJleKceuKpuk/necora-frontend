// src/pages/Start.jsx
import "./start.css"
import icons from "../../images/images";
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

const Start = () => {
  const { isAuthenticated } = useAuth();



  if (isAuthenticated) {
    return (
      <div className='start-page'>
        <img className='start-logo' src={icons.logo} alt="logo" />
        <Link to="/game" className="btn-play no-select" >Играть</Link>
      </div>
    );
  }

  return (
    <div className='start-page'>
      <img className='start-logo' src={icons.logo} alt="logo" />
      <Link to="/signin" className="btn-play no-select" >Войти</Link>
    </div>
  );
};

export default Start;
