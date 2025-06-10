// src/layouts/Body.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Body = () => {

  const [game, setGame] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  

  return (
    <div className="body">
      <Header game={game} isAuthenticated={isAuthenticated} />
      <main>
        {/* Этот Outlet будет содержать маршрутизуемый контент */}
        <Outlet />
      </main>
      <Footer />
    </div>

    
  );
};

export default Body;
