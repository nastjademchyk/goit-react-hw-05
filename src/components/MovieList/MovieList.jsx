import React, { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/api";
import s from "./MovieList.module.css";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const fetchedMovies = await fetchTrendingMovies();
      setMovies(fetchedMovies);
    };
    getData();
  }, []);
  return (
    <ul className={s.movies}>
      {movies.map((movie) => (
        <li className={s.list_movies} key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            <p>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
