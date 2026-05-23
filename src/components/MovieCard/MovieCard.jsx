import { getPosterUrl } from '../../services/movieApi'
import styles from './MovieCard.module.css'

function MovieCard({ movie }) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'Unknown'
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
  const posterUrl = getPosterUrl(movie.poster_path)

  return (
    <article className={styles.card}>
      <a className={styles.posterLink} href={`/movie/${movie.id}`}>
        {posterUrl ? (
          <img className={styles.poster} src={posterUrl} alt={movie.title} />
        ) : (
          <div className={styles.posterFallback}>{movie.title}</div>
        )}
      </a>

      <div className={styles.content}>
        <h3>{movie.title}</h3>
        <div className={styles.meta}>
          <span>{year}</span>
          <span>{rating}</span>
        </div>
      </div>
    </article>
  )
}

export default MovieCard
