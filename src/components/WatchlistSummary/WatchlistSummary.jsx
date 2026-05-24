import "./WatchlistSummary.css";

function WatchlistSummary({ items }) {
  const finishedCount = items.filter(
    (item) => item.status === "Färdig",
  ).length;
  const watchingCount = items.filter(
    (item) => item.status === "Vill se",
  ).length;

  return (
    <section className="watchlist-summary">
      <article className="watchlist-summary__card">
        <span className="watchlist-summary__label">Totalt sparade </span>
        <strong className="watchlist-summary__value">{items.length}</strong>
      </article>

      <article className="watchlist-summary__card">
        <span className="watchlist-summary__label"> Pågående</span>
        <strong className="watchlist-summary__value">{watchingCount}</strong>
      </article>

      <article className="watchlist-summary__card">
        <span className="watchlist-summary__label">Redan tittade</span>
        <strong className="watchlist-summary__value">{finishedCount}</strong>
      </article>
    </section>
  );
}

export default WatchlistSummary;
