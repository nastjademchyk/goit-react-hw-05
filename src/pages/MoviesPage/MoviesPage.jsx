import React from "react";
import { useEffect, useState } from "react";
import s from "./MoviesPage.module.css";
import { fetchSearchMovie } from "../../services/api";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("name") || "";

  useEffect(() => {
    document.title = "Movies";
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

  return (
    <div className={s.search}>
      <form
        className={s.form}
        id="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target;
          const searchQuery = form.elements.query.value.trim();
          setSearchParams(searchQuery ? { name: searchQuery } : {});
        }}
      >
        <input
          type="text"
          id="query"
          placeholder="Search movies..."
          defaultValue={query}
          onChange={(e) => setSearchParams({ name: e.target.value.trim() })}
        />
        <button type="submit" className={s.btn}>
          Search
        </button>
      </form>
      {isLoading && <p>Loading</p>}
      {error && <p>{error}</p>}
      <ul className={s.moviesList}>
        {movies.map((movie) => (
          <li key={movie.id} className={s.movieItem}>
            <Link to={`/movies/${movie.id}`}>
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
