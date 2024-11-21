import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import s from "./MovieDetailsPage.module.css";
import { fetchMoviesDetails } from "../../services/api";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../../components/Loader/Loader";
import { useRef } from "react";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const goBackLink = useRef(location.state ?? `/movies`);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMoviesDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className={s.error}>{error}</div>;
  }

  if (!movieDetails) {
    return <div>No movie details found.</div>;
  }

  const { title, vote_average, overview, genres, popularity, posterUrl } =
    movieDetails;

  return (
    <div className={s.movie_page}>
      <Link to={goBackLink.current}>
        <button className={s.btn} type="button">
          Go back
        </button>
      </Link>

      <div className={s.details_info}>
        <div className={s.title_poster}>
          <h1>{title}</h1>
          <img src={posterUrl} alt={title} />
        </div>
        <ul className={s.additionl_info}>
          <li>
            <p>
              <strong>User Score:</strong> {Math.round(vote_average * 10)}%{" "}
            </p>
          </li>
          <li>
            {" "}
            <p>
              <strong>Overview:</strong> {overview}
            </p>
          </li>
          <li>
            <p>
              <strong> Genres: </strong>
              {genres && genres.length > 0
                ? genres.map((genre) => genre.name).join(", ")
                : "No genres available"}
            </p>
          </li>
        </ul>
      </div>

      <p className={s.additional}></p>
      <ul className={s.list}>
        <li>
          <NavLink to="reviews" className={buildLinkClass}>
            Reviews
          </NavLink>
        </li>
        <li>
          <NavLink to="cast" className={buildLinkClass}>
            Cast
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
