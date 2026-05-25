import styles from "./SearchFilters.module.css";

function SearchFilters({ filters, genres, onChange }) {
  return (
    <div className={styles.filters}>
      <label>
        Genre
        <select
          value={filters.genreId}
          onChange={(event) => onChange({ ...filters, genreId: event.target.value })}
        >
          <option value="">All genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Year
        <input
          type="number"
          min="1900"
          max="2030"
          value={filters.year}
          onChange={(event) => onChange({ ...filters, year: event.target.value })}
          placeholder="Any year"
        />
      </label>

      <label>
        Minimum rating
        <select
          value={filters.rating}
          onChange={(event) => onChange({ ...filters, rating: event.target.value })}
        >
          <option value="">Any rating</option>
          <option value="5">5+</option>
          <option value="6">6+</option>
          <option value="7">7+</option>
          <option value="8">8+</option>
        </select>
      </label>

      <label>
        Sort by
        <select
          value={filters.sortBy}
          onChange={(event) => onChange({ ...filters, sortBy: event.target.value })}
        >
          <option value="relevance">Relevance</option>
          <option value="rating">Rating</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </label>
    </div>
  );
}

export default SearchFilters;
