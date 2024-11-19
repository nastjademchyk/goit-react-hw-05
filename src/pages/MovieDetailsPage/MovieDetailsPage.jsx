import React from "react";
import { NavLink } from "react-router-dom";

const MovieDetailsPage = () => {
  return (
    <div>
      <p>Additional information</p>
      <ul>
        <li>
          <NavLink to="/movies/:movieId/reviews">Reviews</NavLink>
        </li>
        <li>
          <NavLink to="/movies/:movieId/cast">Cast</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
