import { Routes } from "react-router-dom";
import RoutesConfig from "./RoutesConfig";
import RouteAuthListener from "./RouteAuthListener";

import SplashScreen from "./pages/SplashScreen";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const { isInitializing } = useAuth();

  if (isInitializing) {
    return <SplashScreen />;
  }

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
