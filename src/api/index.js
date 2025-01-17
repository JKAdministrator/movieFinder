import axios from "axios";
const API = axios.create({ baseURL: "https://api.themoviedb.org/3" });

export const fetchConfig = () => {
  return API.get("/configuration", {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
  });
};
export const fetchGenres = () => {
  return API.get("/genre/movie/list", {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
  });
};
export const fetchMoviesByGenre = (genre) => {
  let queryUrl = `/discover/movie?sort_by=popularity.desc&with_genres=${genre.id}`;
  return API.get(queryUrl, {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
  });
};
export const fetchMoviesByPopularity = (genre) => {
  return API.get("/discover/movie?sort_by=popularity.desc", {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
  });
};
export const fetchMoviesByWords = (words = "", page = 1) => {
  return API.get(`/search/movie?query=${words}&page=${page}`, {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
  });
};
export const fetchMovieData = (id) => {
  return API.get(`/movie/${id}`, {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
  });
};

export const fetchTrendingMovies = (id) => {
  console.log('fetchTrendingMovies',{env:process.env.REACT_APP_API_KEY})
  return API.get(`/trending/movie/day`, {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
  });
}; 
