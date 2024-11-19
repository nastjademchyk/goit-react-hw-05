import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const ACCESS_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTQ4OGRmNzA3ZTkzYTdmNDU2ZTJmMDRkYWVhYWUwOCIsIm5iZiI6MTczMTk2NjUwMS45MDgxNTMsInN1YiI6IjY3M2JiNDU4NzAzMDRmMjhjODVmZjgyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.enCJMrTJN_7E6IPU_j1uqf5RSsQBy7HeVb4M_0tnO34";

axios.defaults.headers.common.Authorization = `Bearer ${ACCESS_KEY}`;

export const fetchTrendingMovies = async () => {
  try {
    const { data } = await axios.get("/trending/movie/day", {
      params: { language: "en-US", page: 1 },
    });
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

fetchTrendingMovies();

export const fetchMoviesDetails = async (movieId) => {
  if (!movieId) {
    console.error("Movie ID is required.");
    return null;
  }
  try {
    const base_url = await fetchPosters();
    if (!base_url) {
      throw new Error("Base URL for images could not be fetched.");
    }
    const { data } = await axios.get(`/movie/${movieId}`, {
      params: { language: "en-US" },
    });
    const file_size = "w500";
    const posterUrl = `${base_url}${file_size}${data.poster_path}`;
    return { ...data, posterUrl };
  } catch (error) {
    console.error(
      "Error fetching movie details:",
      error.message,
      error.response?.data
    );
    return null;
  }
};

export const fetchPosters = async () => {
  try {
    const response = await axios.get("/configuration");
    const { images } = response.data;
    return images.base_url;
  } catch (error) {
    console.error("Error fetching image configuration:", error);
    return null;
  }
};
