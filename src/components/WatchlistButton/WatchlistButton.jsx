import useWatchlist from "../../hooks/useWatchlist";
import "./WatchlistButton.css";

function WatchlistButton({ movie }) {
  const { items, tooggleWatchlist } = useWatchlist();
  const { isSaved } = items.some((item) => item.id === movie.id);

  return (
    <button
      type="button"
      className={`watchlist-button ${isSaved ? "watchlist-button--active" : ""}`}
      onClick={() => tooggleWatchlist(movie)}
      aria-pressed={isSaved}
    >
      {isSaved ? "Min lista" : "Lägg till i Min lista"}
    </button>
  );
}

export default WatchlistButton;
