const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const MOVIES_PER_PAGE = 24;

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

function createEndpoint(path, params = {}) {
  const searchParams = new URLSearchParams();
  const mergedParams = {
    language: "sv-SE",
    ...params,
  };

  Object.entries(mergedParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, value);
    }
  });

  return `${path}?${searchParams.toString()}`;
}

async function fetchMoviePage(path, params, page) {
  return fetchFromTMDB(createEndpoint(path, { ...params, page }));
}

async function fetchMovieBatch(path, params = {}, page = 1) {
  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  const firstApiPage = Math.floor(startIndex / 20) + 1;
  const offset = startIndex % 20;

  const firstData = await fetchMoviePage(path, params, firstApiPage);
  let combinedResults = firstData.results ?? [];

  if (offset + MOVIES_PER_PAGE > combinedResults.length && firstApiPage < firstData.total_pages) {
    const secondData = await fetchMoviePage(path, params, firstApiPage + 1);
    combinedResults = [...combinedResults, ...(secondData.results ?? [])];
  }

  const totalResults = firstData.total_results ?? combinedResults.length;

  return {
    page,
    results: combinedResults.slice(offset, offset + MOVIES_PER_PAGE),
    totalPages: Math.max(1, Math.ceil(totalResults / MOVIES_PER_PAGE)),
    totalResults,
  };
}

export function getNewMovies() {
  return fetchFromTMDB("/movie/now_playing?language=sv-SE&region=SE&page=1");
}

//FlixNet Top 10 filmer i Sverige just nu
export async function getTop10MoviesSweden() {
  const data = await fetchFromTMDB("/trending/movie/day?language=sv-SE");
  return {
    ...data,
    results: data.results.slice(0, 10),
  };
}

//FlixNet Top 10 serier i Sverige just nu
export async function getTop10SeriesSweden() {
  const data = await fetchFromTMDB("/trending/tv/day?language=sv-SE");
  return {
    ...data,
    results: data.results.slice(0, 10),
  };
}

//kommer nästa vecka
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

//kommande filmer inom kort
export function getUpcomingMovies() {
  return fetchFromTMDB("/movie/upcoming?language=sv-SE&region=SE&page=1");
}

// Sök filmer
export function searchMovies(query) {
  return fetchFromTMDB(
    `/search/movie?language=sv-SE&query=${encodeURIComponent(query)}&page=1`,
  );
}

export function getMovieGenres() {
  return fetchFromTMDB("/genre/movie/list?language=sv-SE").then((data) => data.genres ?? []);
}

export function getPopularMovies() {
  return getBrowseMovies().then((data) => data.results);
}

export function getBrowseMovies({ page = 1, filters = {} } = {}) {
  const sortMap = {
    relevance: "popularity.desc",
    rating: "vote_average.desc",
    newest: "primary_release_date.desc",
    oldest: "primary_release_date.asc",
  };

  return fetchMovieBatch(
    "/discover/movie",
    {
      include_adult: "false",
      region: "SE",
      sort_by: sortMap[filters.sortBy] || sortMap.relevance,
      with_genres: filters.genreId || undefined,
      primary_release_year: filters.year || undefined,
      "vote_average.gte": filters.rating || undefined,
      "vote_count.gte": filters.sortBy === "rating" ? "100" : undefined,
    },
    page,
  );
}

export function getSearchResults(query, { page = 1 } = {}) {
  return fetchMovieBatch(
    "/search/movie",
    {
      query,
      include_adult: "false",
    },
    page,
  );
}

export function getMovieDetails(movieId) {
  return fetchFromTMDB(`/movie/${movieId}?language=sv-SE`);
}

// Seriedetaljer
export function getSeriesDetails(seriesId) {
  return fetchFromTMDB(`/tv/${seriesId}?language=sv-SE`);
}
