import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageState from "../components/PageState/PageState";
import WatchlistItem from "../components/WatchlistItem/WatchlistItem";
import WatchlistSummary from "../components/WatchlistSummary/WatchlistSummary";
import useWatchlist from "../hooks/useWatchlist";
import "./WatchlistPage.css";

function getInitialFormValues(item) {
  return {
    status: item.status,
    rating: item.rating,
    note: item.note,
  };
}

function validateWatchlistForm(values) {
  if (
    values.rating !== "" &&
    (Number(values.rating) < 1 || Number(values.rating) > 5)
  ) {
    return "Rating måste vara mellan 1 och 5.";
  }

  if (values.note.trim().length > 180) {
    return "Anteckningen får vara max 180 tecken.";
  }

  return "";
}

function WatchlistPage() {
  const {
    items,
    updateWatchlistItem,
    removeFromWatchlist,
    statusMessage,
    clearStatusMessage,
  } = useWatchlist();
  const [editingId, setEditingId] = useState(null);
  const [formValues, setFormValues] = useState({
    status: "Plan to watch",
    rating: "",
    note: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const pageTitleRef = useRef(null);

  useEffect(() => {
    pageTitleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!statusMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      clearStatusMessage();
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [clearStatusMessage, statusMessage]);

  function handleEdit(item) {
    setEditingId(item.id);
    setFormValues(getInitialFormValues(item));
    setFormErrors({});
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  }

  function handleSave(event, itemId) {
    event.preventDefault();
    const errorMessage = validateWatchlistForm(formValues);

    if (errorMessage) {
      setFormErrors({ general: errorMessage });
      return;
    }

    updateWatchlistItem(itemId, formValues);
    setEditingId(null);
    setFormErrors({});
  }

  function handleCancel() {
    setEditingId(null);
    setFormErrors({});
  }

  if (items.length === 0) {
    return (
      <main className="watchlist-page">
        <div className="watchlist-page__header">
          <h1
            ref={pageTitleRef}
            tabIndex="-1"
            className="watchlist-page__title"
          >
            Min lista
          </h1>
        </div>

        <PageState
          title="Din watchlist är tom"
          message="Lägg till filmer eller serier från startsidan för att börja bygga listan."
          action={
            <Link to="/" className="watchlist-page__cta">
              Tillbaka till innehållet
            </Link>
          }
        />
      </main>
    );
  }

  return (
    <main className="watchlist-page">
      <div className="watchlist-page__header">
        <div>
          <h1
            ref={pageTitleRef}
            tabIndex="-1"
            className="watchlist-page__title"
          >
            Min lista
          </h1>
          <p className="watchlist-page__description">
            Den här sidan visar Create, Read, Update och Delete med persistent
            data i localStorage.
          </p>
        </div>

        <Link to="/" className="watchlist-page__cta">
          Hitta fler titlar
        </Link>
      </div>

      <WatchlistSummary items={items} />

      {statusMessage ? (
        <p className="watchlist-page__success">{statusMessage}</p>
      ) : null}

      <section className="watchlist-page__grid">
        {items.map((item) => (
          <WatchlistItem
            key={item.id}
            item={item}
            isEditing={editingId === item.id}
            formValues={formValues}
            formErrors={formErrors}
            onEdit={handleEdit}
            onChange={handleChange}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={removeFromWatchlist}
          />
        ))}
      </section>
    </main>
  );
}

export default WatchlistPage;
