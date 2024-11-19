import React, { useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";
import { fetchTrendingMovies, fetchPosters } from "../../services/api";

const HomePage = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <div>
      <h1 className={s.text}>Most Popular Movies</h1>
      <MovieList />
    </div>
  );
};

export default HomePage;
