import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TitlePreviewModal from "../TitlePreviewModal/TitlePreviewModal";
import WatchlistButton from "../WatchlistButton/WatchlistButton";
import {
  getDisplayTitle,
  getMovieGenres,
  getReleaseYear,
  IMAGE_BASE_URL,
} from "../../utils/helpers";
import "./MovieCard.css";

function MovieCard({ movie, variant = "wide", rank, badge = "" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const title = getDisplayTitle(movie);
  const image =
    variant === "poster" || variant === "top10"
      ? movie.poster_path
      : movie.backdrop_path || movie.poster_path;

  const ageRating = movie.adult ? "18+" : "13+";
  const genres = getMovieGenres(movie);
  const mediaType = movie.media_type || (movie.first_air_date ? "tv" : "movie");
  const releaseYear = getReleaseYear(movie);

  useEffect(() => {
    if (!isModalOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isModalOpen]);

  return (
    <>
      <article className={`movie-card movie-card--${variant}`}>
        {rank ? <span className="movie-card__rank">{rank}</span> : null}

        <div className="movie-card__preview">
          {image ? (
            <img
              src={`${IMAGE_BASE_URL}${image}`}
              alt={title}
              className="movie-card__image"
              loading="lazy"
            />
          ) : (
            <div className="movie-card__fallback">Bild saknas</div>
          )}

          {badge ? <span className="movie-card__badge">{badge}</span> : null}

          <div className="movie-card__info">
            <p className="movie-card__title">{title}</p>
            <div className="movie-card__actions">
              <Link
                to={`/titles/${mediaType}/${movie.id}`}
                className="movie-card__icon-button movie-card__icon-button--play"
                aria-label="Öppna titeln"
              >
                ▶
              </Link>

              <WatchlistButton movie={movie} variant="icon" />

              <button
                type="button"
                className={`movie-card__icon-button ${
                  isLiked ? "movie-card__icon-button--active" : ""
                }`}
                onClick={() => setIsLiked((current) => !current)}
                aria-pressed={isLiked}
                aria-label="Markera att du gillar innehållet"
              >
                👍
              </button>

              <button
                type="button"
                className="movie-card__icon-button movie-card__icon-button--more"
                onClick={() => setIsModalOpen(true)}
                aria-label="Visa fler detaljer"
              >
                ⌄
              </button>
            </div>

            <p className="movie-card__meta">
              <span>{ageRating}</span>
              <span>{releaseYear}</span>
              <span>HD</span>
            </p>

            {genres.length > 0 ? (
              <p className="movie-card__tags">{genres.join(" · ")}</p>
            ) : null}
          </div>
        </div>
      </article>

      {isModalOpen ? (
        <TitlePreviewModal
          movie={movie}
          mediaType={mediaType}
          isLiked={isLiked}
          onToggleLike={() => setIsLiked((current) => !current)}
          onClose={() => setIsModalOpen(false)}
        />
      ) : null}
    </>
  );
}

export default MovieCard;
