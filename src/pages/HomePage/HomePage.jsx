import React, { useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";

const HomePage = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <div>
      <p className={s.text}>Top 20 Movies</p>
      <MovieList />
    </div>
  );
};

export default HomePage;
