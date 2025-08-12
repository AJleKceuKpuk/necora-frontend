// src/pages/Home.jsx
import "./start.css"
import icons from "../../images/images";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='start-page'>
      
      <img className='start-logo' src={icons.logo1} alt="logo"/>
      <Link to="/singin"className="btn-play no-select" >PLAY</Link>
      
    
    </div>
  );
};

export default Home;
