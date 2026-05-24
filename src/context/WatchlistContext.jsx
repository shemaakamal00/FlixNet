import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  createWatchlistEntry,
  watchlistReducer,
} from "../reducers/watchlistReducer";

export const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const [persistedItems, setPersistedItems] = useLocalStorage(
    "flexnet-watchlist",
    [],
  );
  const safeInitialItems = Array.isArray(persistedItems) ? persistedItems : [];
  const [items, dispatch] = useReducer(watchlistReducer, safeInitialItems);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    setPersistedItems(items);
  }, [items, setPersistedItems]);

  function addToWatchlist(movie) {
    dispatch({ type: "ADD_ITEM", payload: createWatchlistEntry(movie) });
    setStatusMessage(`${movie.title || movie.name} lades till i din lista.`);
  }

  function updateWatchlistItem(itemId, values) {
    dispatch({ type: "UPDATE_ITEM", payload: { itemId, values } });
    setStatusMessage("Titeln uppdaterades.");
  }

  function removeFromWatchlist(itemId) {
    dispatch({ type: "DELETE_ITEM", payload: itemId });
    setStatusMessage("Titeln togs bort från din lista.");
  }

  function toggleWatchlist(movie) {
    const exists = items.some((item) => item.id === movie.id);

    if (exists) {
      removeFromWatchlist(movie.id);
      return;
    }

    addToWatchlist(movie);
  }
  const value = useMemo(
    () => ({
      items,
      statusMessage,
      addToWatchlist,
      updateWatchlistItem,
      removeFromWatchlist,
      toggleWatchlist,
      clearStatusMessage: () => setStatusMessage(""),
    }),
    [items, statusMessage],
  );

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}
