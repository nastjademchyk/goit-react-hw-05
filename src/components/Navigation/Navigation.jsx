import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <NavLink to="/" className={s.navigation_name}>
        Home
      </NavLink>
      <NavLink to="/movies" className={s.navigation_name}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
