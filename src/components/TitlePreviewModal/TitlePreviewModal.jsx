import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WatchlistButton from "../WatchlistButton/WatchlistButton";
import { getMovieDetails, getSeriesDetails } from "../../services/movieApi";
import {
  BACKDROP_BASE_URL,
  getDisplayTitle,
  getMovieGenres,
  getReleaseYear,
  IMAGE_BASE_URL,
} from "../../utils/helpers";
import "./TitlePreviewModal.css";

function TitlePreviewModal({
  movie,
  mediaType,
  isLiked,
  onClose,
  onToggleLike,
}) {
  const [details, setDetails] = useState(null);
  const [status, setStatus] = useState("loading");
  const title = getDisplayTitle(details || movie);
  const genres = getMovieGenres(details || movie);
  const releaseYear = getReleaseYear(details || movie);
  const runtime = details?.runtime || details?.episode_run_time?.[0] || null;

  useEffect(() => {
    let isMounted = true;

    async function loadDetails() {
      try {
        setStatus("loading");
        const data =
          mediaType === "tv"
            ? await getSeriesDetails(movie.id)
            : await getMovieDetails(movie.id);

        if (isMounted) {
          setDetails({ ...data, media_type: mediaType });
          setStatus("success");
        }
      } catch {
        if (isMounted) {
          setStatus("error");
        }
      }
    }

    loadDetails();

    return () => {
      isMounted = false;
    };
  }, [mediaType, movie.id]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="title-preview-modal" onClick={onClose}>
      <div
        className="title-preview-modal__dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="title-preview-modal__close"
          onClick={onClose}
          aria-label="Stäng detaljvyn"
        >
          ✕
        </button>

        <div
          className="title-preview-modal__hero"
          style={{
            backgroundImage: details?.backdrop_path
              ? `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(20,20,20,0.2) 55%, #181818 100%), url(${BACKDROP_BASE_URL}${details.backdrop_path})`
              : "linear-gradient(180deg, #2a2a2a, #181818)",
          }}
        >
          <div className="title-preview-modal__hero-content">
            <h2 className="title-preview-modal__title">{title}</h2>

            <div className="title-preview-modal__actions">
              <Link
                to={`/titles/${mediaType}/${movie.id}`}
                className="title-preview-modal__play-button"
              >
                ▶ Öppna titeln  
              </Link>
              <WatchlistButton movie={details || movie} variant="icon" />
              <button
                type="button"
                className={`title-preview-modal__circle-button ${
                  isLiked ? "title-preview-modal__circle-button--active" : ""
                }`}
                onClick={onToggleLike}
                aria-pressed={isLiked}
              >
                👍
              </button>
            </div>
          </div>
        </div>

        <div className="title-preview-modal__body">
          <div className="title-preview-modal__main">
            <p className="title-preview-modal__meta">
              <span>{releaseYear}</span>
              {runtime ? <span>{runtime} min</span> : null}
              <span>HD</span>
              <span>{movie.adult ? "18+" : "13+"}</span>
            </p>

            <p className="title-preview-modal__overview">
              {status === "loading"
                ? "Laddar detaljer..."
                : status === "error"
                  ? "Kunde inte ladda detaljer just nu."
                  : details?.overview ||
                    movie.overview ||
                    "Beskrivning saknas."}
            </p>
          </div>

          <aside className="title-preview-modal__side">
            <p>
              <span>Genre:</span> {genres.join(", ") || "Saknas"}
            </p>
            <p>
              <span>Typ:</span> {mediaType === "tv" ? "Serie" : "Film"}
            </p>
            <p>
              <span>Status:</span>{" "}
              {details?.status ||
                (mediaType === "tv" ? "Pågående" : "Tillgänglig")}
            </p>
          </aside>
        </div>

        <div className="title-preview-modal__footer">
          <img
            src={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${movie.poster_path}`
                : "https://placehold.co/220x320?text=No+Image"
            }
            alt={title}
            className="title-preview-modal__poster"
          />
          <div className="title-preview-modal__footer-copy">
            <h3>Mer om titeln</h3>
            <p>{genres.join(" • ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TitlePreviewModal;
