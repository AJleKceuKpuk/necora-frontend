import RouteAuthListener from "./routes/RouteAuthListener";

import Loading from "./pages/Loading/Loading";
import { useAuth } from "./hooks/useAuth";
import RoutesConfig from "./routes/RoutesConfig";
import "./styles/styles.scss"


const App = () => {
  const { isInitializing } = useAuth();

  if (isInitializing) {
    return <Loading />;
  }

  return (
    <>
      <RouteAuthListener />
      <RoutesConfig />
    </>
  );
};

export default App;
