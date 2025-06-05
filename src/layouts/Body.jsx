// src/layouts/Body.jsx
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Body = () => {
  return (
    <div className="body">
      <Header />
      <main>
        {/* Этот Outlet будет содержать маршрутизуемый контент */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
