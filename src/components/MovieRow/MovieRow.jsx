import { useRef } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieRow.css";

function MovieRow({
  title,
  movies,
  variant = "wide",
  isTop10 = false,
  badge = "",
}) {
  // useRef lets us scroll the DOM element directly without triggering a re-render
  const rowRef = useRef(null);

  function scrollLeft() {
    rowRef.current.scrollBy({ left: -1200, behavior: "smooth" });
  }

  function scrollRight() {
    rowRef.current.scrollBy({ left: 1200, behavior: "smooth" });
  }

  return (
    <section
      className={`movie-row-section ${isTop10 ? "movie-row-section--top10" : ""}`}
    >
      <h2 className="movie-section__title">{title}</h2>

      <div className="movie-slider">
        {/* Only show scroll arrows when there are enough cards to overflow */}
        {movies.length > 6 ? (
          <button
            type="button"
            className="slider-arrow slider-arrow--left"
            onClick={scrollLeft}
            aria-label={`Scroll left in ${title}`}
          />
        ) : null}

        <div className="movie-row" ref={rowRef}>
          {movies.map((movie, index) => (
            // Compound key prevents collisions when the same movie appears in multiple rows
            <MovieCard
              key={`${movie.id}-${title}`}
              movie={movie}
              variant={isTop10 ? "top10" : variant}
              rank={isTop10 ? index + 1 : null}
              badge={badge}
            />
          ))}
        </div>

        {movies.length > 6 ? (
          <button
            type="button"
            className="slider-arrow slider-arrow--right"
            onClick={scrollRight}
            aria-label={`Scroll right in ${title}`}
          />
        ) : null}
      </div>
    </section>
  );
}

export default MovieRow;
