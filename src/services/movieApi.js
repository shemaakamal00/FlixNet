const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

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

export function searchMovies(query) {
  return fetchFromTMDB(
    `/search/movie?language=sv-SE&query=${encodeURIComponent(query)}&page=1`,
  );
}

export function getMovieDetails(movieId) {
  return fetchFromTMDB(`/movie/${movieId}?language=sv-SE`);
}

export function getSeriesDetails(seriesId) {
  return fetchFromTMDB(`/tv/${seriesId}?language=sv-SE`);
}
