import MovieCard from '../MovieCard/MovieCard'
import styles from './SearchResults.module.css'

function SearchResults({ movies }) {
  if (movies.length === 0) {
    return <p className={styles.message}>No movies found.</p>
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default SearchResults
