// src/layouts/Body.jsx
import { useState } from 'react';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer/Footer';

const Body = () => {

  const [game, setGame] = useState(false);
  const { isAuthenticated } = useAuth();

  if(game){
    return(
      <div className="body">
      <Header game={game} isAuthenticated={isAuthenticated} />
      <Main game={game} isAuthenticated={isAuthenticated} />
    </div>
    );
  }

  return (
    <div className="body">
      <Header game={game} isAuthenticated={isAuthenticated} />
      <Main game={game} isAuthenticated={isAuthenticated} />
      <Footer />
    </div>
  );
};

export default Body;
