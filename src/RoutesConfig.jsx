import { Route } from "react-router-dom";
import Body from "./layouts/Body";
import Home from "./pages/Start/Start";
import Singin from "./pages/Auth/SinginPage"
import About from "./pages/About";
import Singup from "./pages/Auth/SingupPage";
import Recovery from "./pages/Auth/Recovery";
import Logout from "./pages/Auth/LogoutPage";
import RecoveryCode from "./pages/Auth/RecoveryCode";
import Activation from "./pages/Auth/ActivationPage";

const RoutesConfig = () => (
  <>
    <Route path="/" element={<Body />}>

      <Route index element={<Home />} />

      <Route path="signin" element={<Singin />} />
      <Route path="signup" element={<Singup />} />
      <Route path="logout" element={<Logout />} />

      <Route path="activate-account" element={<Activation />} />


      <Route path="sendcode" element={<RecoveryCode />} />
      <Route path="recovery" element={<Recovery />} />



      <Route path="forum" element={<About />} />
      <Route path="rules" element={<About />} />
      <Route path="support" element={<About />} />

      <Route path="profile" element={<About />} />
      <Route path="friends" element={<About />} />
      <Route path="chats" element={<About />} />
      <Route path="notifications" element={<About />} />
      <Route path="settings" element={<About />} />


      <Route path="about" element={<About />} />
    </Route>
  </>
);

export default RoutesConfig;
