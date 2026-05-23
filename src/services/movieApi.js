const API_BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w780'

const apiKey = import.meta.env.VITE_TMDB_API_KEY

async function fetchFromTmdb(endpoint, params = {}) {
  if (!apiKey) {
    throw new Error('TMDB API key is missing')
  }

  const url = new URL(`${API_BASE_URL}${endpoint}`)
  url.searchParams.set('api_key', apiKey)
  url.searchParams.set('language', 'en-US')

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Could not load movies')
  }

  return response.json()
}

export function getPosterUrl(path) {
  return path ? `${IMAGE_BASE_URL}${path}` : ''
}

export function getBackdropUrl(path) {
  return path ? `${BACKDROP_BASE_URL}${path}` : ''
}

export async function getPopularMovies() {
  const data = await fetchFromTmdb('/movie/popular', { page: 1 })
  return data.results ?? []
}

export async function searchMovies(query) {
  const data = await fetchFromTmdb('/search/movie', {
    query,
    include_adult: false,
    page: 1,
  })

  return data.results ?? []
}

export async function getMovieGenres() {
  const data = await fetchFromTmdb('/genre/movie/list')
  return data.genres ?? []
}
