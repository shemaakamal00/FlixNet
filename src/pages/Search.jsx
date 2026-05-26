import { useEffect, useState } from "react";
import SearchFilters from "../components/SearchFilters/SearchFilters";
import SearchForm from "../components/SearchForm/SearchForm";
import SearchResults from "../components/SearchResults/SearchResults";
import { getBrowseMovies, getMovieGenres, getSearchResults } from "../services/movieApi";
import "./Search.css";

const defaultFilters = {
  genreId: "",
  year: "",
  rating: "",
  sortBy: "relevance",
};

function filterAndSortMovies(movies, filters) {
  return movies
    .filter((movie) => {
      const matchesGenre = filters.genreId
        ? movie.genre_ids?.includes(Number(filters.genreId))
        : true;
      const matchesYear = filters.year
        ? movie.release_date?.startsWith(filters.year)
        : true;
      const matchesRating = filters.rating
        ? movie.vote_average >= Number(filters.rating)
        : true;

      return matchesGenre && matchesYear && matchesRating;
    })
    .sort((firstMovie, secondMovie) => {
      if (filters.sortBy === "rating") {
        return secondMovie.vote_average - firstMovie.vote_average;
      }

      if (filters.sortBy === "newest") {
        return (secondMovie.release_date || "").localeCompare(firstMovie.release_date || "");
      }

      if (filters.sortBy === "oldest") {
        return (firstMovie.release_date || "").localeCompare(secondMovie.release_date || "");
      }

      return 0;
    });
}

function getVisiblePages(currentPage, totalPages) {
  const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const endPage = Math.min(totalPages, startPage + 4);

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );
}

function Search() {
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGenres() {
      try {
        const movieGenres = await getMovieGenres();
        setGenres(movieGenres);
      } catch {
        setGenres([]);
      }
    }

    loadGenres();
  }, []);

  useEffect(() => {
    async function loadMovies() {
      try {
        setStatus("loading");
        setError("");

        const data = activeQuery
          ? await getSearchResults(activeQuery, { page })
          : await getBrowseMovies({ page, filters });

        setMovies(data.results ?? []);
        setTotalPages(data.totalPages ?? 1);
        setStatus("success");
      } catch (err) {
        setError(err.message);
        setMovies([]);
        setTotalPages(1);
        setStatus("error");
      }
    }

    loadMovies();
  }, [activeQuery, filters, page]);

  function handleSubmit(event) {
    event.preventDefault();
    setActiveQuery(query.trim());
    setPage(1);
  }

  function handleClearSearch() {
    setQuery("");
    setActiveQuery("");
    setPage(1);
  }

  function handleFilterChange(nextFilters) {
    setFilters(nextFilters);
    setPage(1);
  }

  function handleResetFilters() {
    setFilters(defaultFilters);
    setPage(1);
  }

  const filteredMovies = filterAndSortMovies([...movies], filters);
  const visiblePages = getVisiblePages(page, totalPages);
  const hasQuery = Boolean(activeQuery);
  const isLoading = status === "loading";
  const hasActiveFilters = Object.entries(defaultFilters).some(
    ([key, value]) => filters[key] !== value,
  );

  return (
    <main className="search-page">
      <section className="search-page__header">
        <p className="search-page__eyebrow">FlixNet Search</p>
        <h1 className="search-page__title">Find your next title</h1>
        <p className="search-page__description">
          Search by title or browse the catalog with genre, year, rating, and sorting controls.
        </p>
      </section>

      <section className="search-page__toolbar">
        <SearchForm
          query={query}
          onQueryChange={setQuery}
          onSubmit={handleSubmit}
          onClear={handleClearSearch}
          isLoading={isLoading}
        />
        <SearchFilters
          filters={filters}
          genres={genres}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </section>

      <section className="search-page__results">
        <div className="search-page__results-header">
          <div>
            <h2 className="search-page__results-title">
              {hasQuery ? `Results for "${activeQuery}"` : "Browse movies"}
            </h2>
            <p className="search-page__results-count">
              Page {page} of {totalPages}
            </p>
          </div>
        </div>

        {status === "loading" ? <p className="search-page__message">Loading movies...</p> : null}
        {status === "error" ? <p className="search-page__error">{error}</p> : null}
        {status === "success" ? <SearchResults movies={filteredMovies} /> : null}

        <div className="search-page__pagination" aria-label="Search result pages">
          <button
            type="button"
            onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
            disabled={page === 1 || isLoading}
          >
            Previous
          </button>

          {visiblePages.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              className={pageNumber === page ? "is-active" : ""}
              onClick={() => setPage(pageNumber)}
              disabled={isLoading}
            >
              {pageNumber}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
            disabled={page === totalPages || isLoading}
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}

export default Search;
