import React from "react";
import { Navbar } from "../navigation-components/Navbar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Mainpage } from "./Mainpage";
import "./Home.css";

export const Home = () => {
  const location = useLocation();

  return (
    <>
      <div>
        <Navbar />
      </div>
      {location.pathname === "/naslovna" && <Mainpage />}
      <Outlet />
    </>
  );
};
