import styles from "./SearchForm.module.css";

function SearchForm({ query, onQueryChange, onSubmit, isLoading = false }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label} htmlFor="movie-search">
        Search movies
      </label>
      <div className={styles.controls}>
        <input
          id="movie-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by title"
        />
        <button type="submit" disabled={isLoading}>
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
