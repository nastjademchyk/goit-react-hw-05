import React from "react";
import { useEffect, useState } from "react";
import s from "./MoviesPage.module.css";
import { fetchSearchMovie } from "../../services/api";
import { useSearchParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();

  const query = searchParams.get("name") ?? "";

  useEffect(() => {
    if (!query) return;

    const searchMovies = async () => {
      try {
        setIsLoading(true);
        const results = await fetchSearchMovie(query);
        setMovies(results);
      } catch (error) {
        setError("Failed to fetch movies.");
      } finally {
        setIsLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = inputValue.trim();
    setSearchParams(trimmedQuery ? { name: trimmedQuery } : {});
    setInputValue("");
  };

  return (
    <div className={s.search}>
      <form className={s.form} id="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="query"
          placeholder="Search movies..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className={s.btn}>
          Search
        </button>
      </form>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <ul className={s.moviesList}>
        {movies.map((movie) => (
          <li key={movie.id} className={s.movieItem}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className={s.movieImage}
              />
              <p>{movie.title}</p>
              <p className={s.release_date}>
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : "N/A"}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <div id="movies"></div>
    </div>
  );
};

export default MoviesPage;
