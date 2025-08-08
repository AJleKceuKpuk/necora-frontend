// src/layouts/Body.jsx
import { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Main from '../components/Main/Main';

const Body = () => {

  const [game, setGame] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="body">
      <Header game={game} isAuthenticated={isAuthenticated} />
      <Main />
      <Footer />
    </div>
  );
};

export default Body;
