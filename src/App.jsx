// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Body from './layouts/Body';
import Home from './pages/Start';
import About from './pages/About';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Body />}>
        <Route index element={<Home />} />

        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default App;
