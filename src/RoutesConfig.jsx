// src/routes.jsx
import React from "react";
import { Route } from "react-router-dom";
import Body from "./layouts/Body";
import Home from "./pages/Start";
import About from "./pages/About";

const RoutesConfig = () => (
  <>
    <Route path="/" element={<Body />}>

      <Route index element={<Home />} />


      

      <Route path="singin" element={<About />} />
      <Route path="singup" element={<About />} />

      <Route path="forum" element={<About />} />
      <Route path="rules" element={<About />} />
      <Route path="support" element={<About />} />

      <Route path="profile" element={<About />} />
      <Route path="friends" element={<About />} />
      <Route path="chats" element={<About />} />
      <Route path="notifications" element={<About />} />
      <Route path="settings" element={<About />} />
      <Route path="logout" element={<About />} />

      <Route path="about" element={<About />} />
    </Route>
  </>
);

export default RoutesConfig;
