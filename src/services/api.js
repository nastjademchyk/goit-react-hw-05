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
    ки;
  }
};

fetchTrendingMovies();
