import { useEffect, useMemo, useState } from 'react'
import SearchFilters from '../components/SearchFilters/SearchFilters'
import SearchForm from '../components/SearchForm/SearchForm'
import SearchResults from '../components/SearchResults/SearchResults'
import { getMovieGenres, getPopularMovies, searchMovies } from '../services/movieApi'
import styles from './SearchPage.module.css'

const defaultFilters = {
  genreId: '',
  year: '',
  rating: '',
  sortBy: 'relevance',
}

function filterMovies(movies, filters) {
  return movies
    .filter((movie) => {
      const matchesGenre = filters.genreId
        ? movie.genre_ids?.includes(Number(filters.genreId))
        : true
      const matchesYear = filters.year
        ? movie.release_date?.startsWith(filters.year)
        : true
      const matchesRating = filters.rating
        ? movie.vote_average >= Number(filters.rating)
        : true

      return matchesGenre && matchesYear && matchesRating
    })
    .sort((firstMovie, secondMovie) => {
      if (filters.sortBy === 'rating') {
        return secondMovie.vote_average - firstMovie.vote_average
      }

      if (filters.sortBy === 'newest') {
        return (secondMovie.release_date || '').localeCompare(firstMovie.release_date || '')
      }

      if (filters.sortBy === 'oldest') {
        return (firstMovie.release_date || '').localeCompare(secondMovie.release_date || '')
      }

      return 0
    })
}

function SearchPage() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [filters, setFilters] = useState(defaultFilters)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadStartData() {
      try {
        setStatus('loading')
        setError('')

        const [popularMovies, movieGenres] = await Promise.all([
          getPopularMovies(),
          getMovieGenres(),
        ])

        setMovies(popularMovies)
        setGenres(movieGenres)
        setStatus('success')
      } catch (err) {
        setError(err.message)
        setStatus('error')
      }
    }

    loadStartData()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    if (!query.trim()) {
      return
    }

    try {
      setStatus('loading')
      setError('')
      setFilters(defaultFilters)

      const results = await searchMovies(query.trim())

      setMovies(results)
      setStatus('success')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  const filteredMovies = useMemo(() => filterMovies(movies, filters), [movies, filters])

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <p className={styles.kicker}>FlixNet search</p>
        <h1>Find movies for tonight</h1>
      </section>

      <section className={styles.panel}>
        <SearchForm query={query} onQueryChange={setQuery} onSubmit={handleSubmit} />
        <SearchFilters filters={filters} genres={genres} onChange={setFilters} />
      </section>

      <section className={styles.results}>
        <div className={styles.resultsHeader}>
          <h2>{query.trim() ? `Results for "${query.trim()}"` : 'Popular movies'}</h2>
          <span>{filteredMovies.length} movies</span>
        </div>

        {status === 'loading' && <p className={styles.message}>Loading movies...</p>}
        {status === 'error' && <p className={styles.error}>{error}</p>}
        {status === 'success' && <SearchResults movies={filteredMovies} />}
      </section>
    </main>
  )
}

export default SearchPage
