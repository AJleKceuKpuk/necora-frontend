// src/App.jsx
import "./index.css";
import { Routes, Route, useLocation} from "react-router-dom";
import RoutesConfig from "./RoutesConfig";
import "./styles/icons.css";
import RouteAuthListener from "./context/RouteAuthListener";

const App = () => {
  return (
    <>
    <RouteAuthListener />
    <Routes>
      {RoutesConfig()}
    </Routes>
    </>
  );
};

export default App;
