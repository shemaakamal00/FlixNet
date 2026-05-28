import styles from "./SearchFilters.module.css";

function SearchFilters({ filters, genres, onChange, onReset, hasActiveFilters = false }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <label>
          Genre
          <select
            value={filters.genreId}
            onChange={(event) => onChange({ ...filters, genreId: event.target.value })}
          >
            <option value="">Alla genrer</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          År
          <input
            type="number"
            min="1900"
            max="2030"
            value={filters.year}
            onChange={(event) => onChange({ ...filters, year: event.target.value })}
            placeholder="Valfritt år"
          />
        </label>

        <label>
          Minsta betyg
          <select
            value={filters.rating}
            onChange={(event) => onChange({ ...filters, rating: event.target.value })}
          >
            <option value="">Alla betyg</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
          </select>
        </label>

        <label>
          Sortera efter
          <select
            value={filters.sortBy}
            onChange={(event) => onChange({ ...filters, sortBy: event.target.value })}
          >
            <option value="relevance">Relevans</option>
            <option value="rating">Betyg</option>
            <option value="newest">Nyast</option>
            <option value="oldest">Äldst</option>
          </select>
        </label>
      </div>

      <button type="button" onClick={onReset} disabled={!hasActiveFilters}>
        Återställ filter
      </button>
    </div>
  );
}

export default SearchFilters;
