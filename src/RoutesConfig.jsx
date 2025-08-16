// src/routes.jsx
import React from "react";
import { Route } from "react-router-dom";
import Body from "./layouts/Body";
import Home from "./pages/Start/Start";
import Singin from "./pages/Auth/Singin"
import About from "./pages/About";
import Singup from "./pages/Auth/Singup";
import SendCode from "./pages/Auth/SendCode";
import Recovery from "./pages/Auth/Recovery";
import LogoutPage from "./pages/Auth/LogoutPage";

const RoutesConfig = () => (
  <>
    <Route path="/" element={<Body />}>

      <Route index element={<Home />} />


      

      <Route path="signin" element={<Singin />} />
      <Route path="signup" element={<Singup />} />
      <Route path="sendcode" element={<SendCode />} />
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
