import React, { useEffect, useState } from "react";
import { fetchTrendingMovies, fetchPosters } from "../../services/api";
import s from "./MovieList.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

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
          <Link to={`/movies/${movie.id}`} state={location}>
            {movie.posterUrl ? (
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className={s.poster}
              />
            ) : (
              <p>No image available</p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
