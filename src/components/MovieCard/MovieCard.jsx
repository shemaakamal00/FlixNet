import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WatchlistButton from "../WatchlistButton/WatchlistButton";
import { getMovieDetails, getSeriesDetails } from "../../services/movieApi";
import {
  getDisplayTitle,
  getMovieGenres,
  getReleaseYear,
  IMAGE_BASE_URL,
} from "../../utils/helpers";
import "./MovieCard.css";

function MovieCard({ movie, variant = "wide", rank, badge = "" }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState(null);
  const [detailsStatus, setDetailsStatus] = useState("idle");

  const title = getDisplayTitle(movie);
  const image =
    variant === "poster" || variant === "top10"
      ? movie.poster_path
      : movie.backdrop_path || movie.poster_path;

  const ageRating = movie.adult ? "18+" : "13+";
  const genres = getMovieGenres(movie);
  const mediaType = movie.media_type || (movie.first_air_date ? "tv" : "movie");
  const releaseYear = getReleaseYear(movie);

  const runtime =
    expandedDetails?.runtime || expandedDetails?.episode_run_time?.[0] || null;

  const runtimeLabel = runtime ? `${runtime} min` : null;
  const expandedGenres = expandedDetails
    ? getMovieGenres(expandedDetails)
    : genres;
  const overview =
    expandedDetails?.overview ||
    movie.overview ||
    "Detaljer laddas när du öppnar kortet.";

  useEffect(() => {
    if (!isExpanded || expandedDetails || detailsStatus === "loading") {
      return;
    }

    let isMounted = true;

    async function loadExpandedDetails() {
      try {
        setDetailsStatus("loading");

        const data =
          mediaType === "tv"
            ? await getSeriesDetails(movie.id)
            : await getMovieDetails(movie.id);

        if (isMounted) {
          setExpandedDetails({ ...data, media_type: mediaType });
          setDetailsStatus("success");
        }
      } catch {
        if (isMounted) {
          setDetailsStatus("error");
        }
      }
    }

    loadExpandedDetails();

    return () => {
      isMounted = false;
    };
  }, [detailsStatus, expandedDetails, isExpanded, mediaType, movie.id]);

  return (
    <article
      className={`movie-card movie-card--${variant} ${
        isExpanded ? "movie-card--expanded" : ""
      }`}
    >
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
              onClick={() => setIsExpanded((current) => !current)}
              aria-expanded={isExpanded}
              aria-label="Visa fler detaljer"
            >
              {isExpanded ? "⌃" : "⌄"}
            </button>
          </div>

          <p className="movie-card__meta">
            <span>{ageRating}</span>
            <span>{releaseYear}</span>
            {runtimeLabel ? <span>{runtimeLabel}</span> : null}
            <span>HD</span>
          </p>

          {genres.length > 0 ? (
            <p className="movie-card__tags">{genres.join(" • ")}</p>
          ) : null}
        </div>

        {isExpanded ? (
          <div className="movie-card__expanded-panel">
            <div className="movie-card__expanded-top">
              <div>
                <p className="movie-card__expanded-summary">
                  {detailsStatus === "loading"
                    ? "Laddar detaljer..."
                    : detailsStatus === "error"
                      ? "Kunde inte ladda extra detaljer just nu."
                      : overview}
                </p>
              </div>

              <div className="movie-card__expanded-side">
                <p>
                  <span>Genre:</span> {expandedGenres.join(", ") || "Saknas"}
                </p>
                <p>
                  <span>Typ:</span> {mediaType === "tv" ? "Serie" : "Film"}
                </p>
                <p>
                  <span>Status:</span>{" "}
                  {expandedDetails?.status ||
                    (mediaType === "tv" ? "Pågående" : "Tillgänglig")}
                </p>
              </div>
            </div>

            <div className="movie-card__expanded-links">
              <Link
                to={`/titles/${mediaType}/${movie.id}`}
                className="movie-card__expanded-link"
              >
                Öppna hela detaljsidan
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default MovieCard;
