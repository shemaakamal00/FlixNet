const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w780";

async function fetchFromTMDB(endpoint) {
  if (!API_KEY) {
    throw new Error("Missing VITE_TMDB_API_KEY in your environment variables.");
  }

  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Kunde inte hämta filmer. Status: ${response.statusText}`);
  }

  return response.json();
}

function fetchFromTMDBWithParams(endpoint, params = {}) {
  const searchParams = new URLSearchParams({
    language: "sv-SE",
    ...params,
  });

  return fetchFromTMDB(`${endpoint}?${searchParams.toString()}`);
}

export function getPosterUrl(path) {
  return path ? `${IMAGE_BASE_URL}${path}` : "";
}

export function getBackdropUrl(path) {
  return path ? `${BACKDROP_BASE_URL}${path}` : "";
}

export function getNewMovies() {
  return fetchFromTMDB("/movie/now_playing?language=sv-SE&region=SE&page=1");
}

export async function getTop10MoviesSweden() {
  const data = await fetchFromTMDB("/trending/movie/day?language=sv-SE");
  return {
    ...data,
    results: data.results.slice(0, 10),
  };
}

export async function getTop10SeriesSweden() {
  const data = await fetchFromTMDB("/trending/tv/day?language=sv-SE");
  return {
    ...data,
    results: data.results.slice(0, 10),
  };
}

export function getComingNextWeek() {
  const today = new Date();
  const nextWeek = new Date();

  nextWeek.setDate(today.getDate() + 7);

  const startDate = today.toISOString().split("T")[0];
  const endDate = nextWeek.toISOString().split("T")[0];

  return fetchFromTMDB(
    `/discover/movie?language=sv-SE&region=SE&sort_by=popularity.desc&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&page=1`,
  );
}

export function getUpcomingMovies() {
  return fetchFromTMDB("/movie/upcoming?language=sv-SE&region=SE&page=1");
}

export async function getPopularMovies() {
  const data = await fetchFromTMDBWithParams("/movie/popular", {
    region: "SE",
    page: "1",
  });

  return data.results ?? [];
}

export async function searchMovies(query) {
  const data = await fetchFromTMDBWithParams("/search/movie", {
    query,
    include_adult: "false",
    page: "1",
  });

  return data.results ?? [];
}

export async function getMovieGenres() {
  const data = await fetchFromTMDBWithParams("/genre/movie/list");
  return data.genres ?? [];
}

export function getMovieDetails(movieId) {
  return fetchFromTMDB(`/movie/${movieId}?language=sv-SE`);
}

export function getSeriesDetails(seriesId) {
  return fetchFromTMDB(`/tv/${seriesId}?language=sv-SE`);
}
