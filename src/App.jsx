// src/App.jsx
import "./index.css";
import { Routes } from "react-router-dom";
import RoutesConfig from "./RoutesConfig";
import "./styles/icons.css";

const App = () => {
  return (
    <Routes>
      {RoutesConfig()}
    </Routes>
  );
};

export default App;
