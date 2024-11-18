import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import { BiSolidMoviePlay } from "react-icons/bi";

const Navigation = () => {
  return (
    <div className={s.nav}>
      <BiSolidMoviePlay size="25px" />
      <nav className={s.nav}>
        <NavLink to="/" className={s.navigation_name}>
          Home
        </NavLink>
        <NavLink to="/movies" className={s.navigation_name}>
          Movies
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
