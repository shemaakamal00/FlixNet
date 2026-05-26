import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import PageState from "../components/PageState/PageState";
import WatchlistButton from "../components/WatchlistButton/WatchlistButton";
import MovieRow from "../components/MovieRow/MovieRow";
import useMovieDetails from "../hooks/useMovieDetails";
import {
  BACKDROP_BASE_URL,
  getDisplayTitle,
  getMovieGenres,
  getReleaseYear,
  IMAGE_BASE_URL,
} from "../utils/helpers";
import "./MovieDetails.css";

function MovieDetails() {
  const { id, mediaType } = useParams();
  const { titleData, similarTitles, isLoading, error } = useMovieDetails(id, mediaType);
  const topRef = useRef(null); // Ref used to scroll to top on navigation

  // Scroll to top whenever the user navigates to a new movie or series
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [id]);

  if (isLoading) return <PageState message="Laddar titel..." />;
  if (error || !titleData) return <PageState message={error || "Titeln kunde inte hittas."} />;

  const title = getDisplayTitle(titleData);
  const genres = getMovieGenres(titleData);

  return (
    <main className="movie-details-page" ref={topRef}>
      <section
        className="movie-details-page__hero"
        style={{
          backgroundImage: titleData.backdrop_path
            ? `linear-gradient(90deg, rgba(20,20,20,0.96) 28%, rgba(20,20,20,0.55) 55%, rgba(20,20,20,0.92) 100%), url(${BACKDROP_BASE_URL}${titleData.backdrop_path})`
            : "linear-gradient(180deg, #202020, #141414)",
        }}
      >
        <div className="movie-details-page__panel">
          <Link to="/" className="movie-details-page__back-link">
            Tillbaka till startsidan
          </Link>

          <img
            src={`${IMAGE_BASE_URL}${titleData.poster_path}`}
            alt={title}
            className="movie-details-page__poster"
          />

          <div className="movie-details-page__content">
            <h1 className="movie-details-page__title">{title}</h1>
            <p className="movie-details-page__meta">
              {getReleaseYear(titleData)} · {titleData.vote_average?.toFixed(1)} i betyg
            </p>
            <p className="movie-details-page__overview">
              {titleData.overview || "Beskrivning saknas."}
            </p>
            <p className="movie-details-page__tags">{genres.join(" · ")}</p>

            <div className="movie-details-page__actions">
              <WatchlistButton movie={titleData} />
              <Link to="/watchlist" className="movie-details-page__secondary-link">
                Gå till min lista
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Show similar titles only if results exist */}
      {similarTitles.length > 0 && (
        <section className="movie-details-page__similar">
          <MovieRow
            title="Liknande titlar"
            movies={similarTitles}
            mediaType={mediaType}
          />
        </section>
      )}
    </main>
  );
}

export default MovieDetails;