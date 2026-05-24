import useWatchlist from "../../hooks/useWatchlist";
import "./WatchlistButton.css";

function WatchlistButton({ movie, variant = "default" }) {
  const { items, toggleWatchlist } = useWatchlist();
  const isSaved = items.some((item) => item.id === movie.id);
  const isIcon = variant === "icon";

  return (
    <button
      type="button"
      className={`watchlist-button ${
        isSaved ? "watchlist-button--active" : ""
      } ${isIcon ? "watchlist-button--icon" : ""}`}
      onClick={() => toggleWatchlist(movie)}
      aria-pressed={isSaved}
      aria-label={isSaved ? "Ta bort från min lista" : "Lägg till i min lista"}
    >
      {isIcon ? (isSaved ? "✓" : "+") : isSaved ? "I min lista" : "Min lista"}
    </button>
  );
}

export default WatchlistButton;
