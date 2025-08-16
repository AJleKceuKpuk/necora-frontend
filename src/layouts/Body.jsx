// src/layouts/Body.jsx
import { useState } from 'react';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import { useAuth } from '../context/AuthContext';

const Body = () => {

  const [game, setGame] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="body">
      <Header game={game} isAuthenticated={isAuthenticated} />
      <Main game={game} isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default Body;
