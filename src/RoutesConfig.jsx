// src/routes.jsx
import React from "react";
import { Route } from "react-router-dom";
import Body from "./layouts/Body";
import Home from "./pages/Start/Start";
import Singin from "./pages/Auth/Singin"
import About from "./pages/About";
import Singup from "./pages/Auth/Singup";
import Recovery from "./pages/Auth/Recovery";
import LogoutPage from "./pages/Auth/LogoutPage";
import AccountActivation from "./pages/Auth/AccountActivation";
import RecoveryCode from "./pages/Auth/RecoveryCode";

const RoutesConfig = () => (
  <>
    <Route path="/" element={<Body />}>

      <Route index element={<Home />} />


    
      <Route path="signin" element={<Singin />} />
      <Route path="signup" element={<Singup />} />
      <Route path="activate-account" element={<AccountActivation />} />
      <Route path="sendcode" element={<RecoveryCode />} />
      <Route path="recovery" element={<Recovery />} />
      <Route path="logout" element={<LogoutPage />} />


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
