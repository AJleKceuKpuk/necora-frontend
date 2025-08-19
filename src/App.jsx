import { Routes } from "react-router-dom";
import RoutesConfig from "./RoutesConfig";
import RouteAuthListener from "./RouteAuthListener";

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
