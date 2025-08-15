// src/pages/Start.jsx
import "./start.css"
import icons from "../../images/images";
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className='start-page'>
      <img className='start-logo' src={icons.logo} alt="logo"/>
      <Link to="/signin"className="btn-play no-select" >Играть</Link>
    </div>
  );
};

export default Start;
