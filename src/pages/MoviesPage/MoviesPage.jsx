import React from "react";
import { useEffect } from "react";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  useEffect(() => {
    document.title = "Movies";
  }, []);
  return (
    <div className={s.search}>
      <form className={s.form} id="search-form">
        <input type="text" id="query" placeholder="Search movies..." />
        <button type="submit" className={s.btn}>
          Search
        </button>
      </form>
      <div id="movies"></div>
    </div>
  );
};

export default MoviesPage;
