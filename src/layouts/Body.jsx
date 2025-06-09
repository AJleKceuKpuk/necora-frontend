// src/layouts/Body.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Body = () => {

  const [page, setPage] = useState("game");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  

  return (
    <div className="body">
      <Header page={page} isAuthenticated={isAuthenticated} />
      <main>
        {/* Этот Outlet будет содержать маршрутизуемый контент */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
