import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../utils/helpers";
import "./WatchlistItem.css";

function WatchlistItem({
  item,
  isEditing,
  formValues,
  formErrors,
  onEdit,
  onChange,
  onSave,
  onCancel,
  onDelete,
}) {
  return (
    <article className="watchlist-item">
      <img
        src={
          item.posterPath
            ? `${IMAGE_BASE_URL}${item.posterPath}`
            : "https://placehold.co/220x320?text=No+Image"
        }
        alt={item.title}
        className="watchlist-item__poster"
      />

      <div className="watchlist-item__content">
        <div className="watchlist-item__header">
          <div>
            <h3 className="watchlist-item__title">{item.title}</h3>
            <p className="watchlist-item__meta">
              {item.mediaType === "tv" ? "Serie" : "Film"} ·{" "}
              {item.releaseDate || "Okänt datum"}
            </p>
          </div>

          <div className="watchlist-item__actions">
            <Link
              to={`/titles/${item.mediaType}/${item.id}`}
              className="watchlist-item__link-button"
            >
              Detaljer
            </Link>
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="watchlist-item__delete-button"
            >
              Ta bort
            </button>
          </div>
        </div>
        {isEditing ? (
          <form
            className="watchlist-item__form"
            onSubmit={(event) => onSave(event, item.id)}
          >
            <label className="watchlist-item__field">
              Status
              <select
                name="status"
                value={formValues.status}
                onChange={onChange}
                className="watchlist-item__input"
              >
                <option value="Vill se">Vill se</option>
                <option value="Tittar på">Tittar på</option>
                <option value="Färdig">Färdig</option>
                <option value="Anteckning">Anteckning</option>
              </select>
            </label>

            <label className="watchlist-item__field">
              Rating (1-5)
              <input
                name="rating"
                type="number"
                min="1"
                max="5"
                value={formValues.rating}
                onChange={onChange}
                className="watchlist-item__input"
              />
            </label>

            <label className="watchlist-item__field watchlist-item__field--full">
              Note
              <textarea
                name="note"
                rows="4"
                value={formValues.note}
                onChange={onChange}
                className="watchlist-item__textarea"
              />
            </label>

            {formErrors.general ? (
              <p className="watchlist-item__error">{formErrors.general}</p>
            ) : null}

            <div className="watchlist-item__form-actions">
              <button type="submit" className="watchlist-item__save-button">
                Spara
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="watchlist-item__secondary-button"
              >
                Avbryt
              </button>
            </div>
          </form>
        ) : (
          <div className="watchlist-item__summary">
            <p>
              <strong>Status:</strong> {item.status}
            </p>
            <p>
              <strong>Rating:</strong> {item.rating || "Inte satt"}
            </p>
            <p>
              <strong>Note:</strong>{" "}
              {item.note || "Ingen personlig anteckning än."}
            </p>
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="watchlist-item__secondary-button"
            >
              Redigera
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default WatchlistItem;
