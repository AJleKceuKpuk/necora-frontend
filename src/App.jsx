// src/App.jsx
import "./index.css";
import { Routes, Route, useLocation} from "react-router-dom";
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
