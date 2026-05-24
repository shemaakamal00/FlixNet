import MovieCard from "../MovieCard/MovieCard";
import { getDisplayTitle, getReleaseYear } from "../../utils/helpers";
import styles from "./SearchResults.module.css";

function SearchResults({ movies }) {
  if (movies.length === 0) {
    return <p className={styles.message}>No movies found.</p>;
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <article key={movie.id} className={styles.item}>
          <MovieCard movie={movie} variant="search" />
          <div className={styles.caption}>
            <h3>{getDisplayTitle(movie)}</h3>
            <p>
              <span>{getReleaseYear(movie)}</span>
              <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default SearchResults;
