import React from "react";
import { useEffect } from "react";

const MoviesPage = () => {
  useEffect(() => {
    document.title = "Movies";
  }, []);
  return <div>MoviesPage</div>;
};

export default MoviesPage;
