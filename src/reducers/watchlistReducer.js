function normalizeRating(rating) {
  const parsed = Number(rating);
  return Number.isNaN(parsed) ? "" : parsed;
}

export function createWatchlistEntry(movie) {
  return {
    id: movie.id,
    title: movie.title || movie.name || "Untitled",
    mediaType: movie.media_type || (movie.first_air_date ? "tv" : "movie"),
    posterPath: movie.poster_path || movie.backdrop_path || "",
    releaseDate: movie.release_date || movie.first_air_date || "",
    status: "Plan to watch",
    rating: "",
    note: "",
    addedAt: new Date().toISOString(),
  };
}

export function watchlistReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const alreadySaved = state.some((item) => item.id === action.payload.id);

      if (alreadySaved) {
        return state;
      }

      return [action.payload, ...state];
    }
    case "UPDATE_ITEM": {
      return state.map((item) =>
        item.id === action.payload.itemId
          ? {
              ...item,
              ...action.payload.values,
              rating: normalizeRating(action.payload.values.rating),
            }
          : item,
      );
    }
    case "DELETE_ITEM": {
      return state.filter((item) => item.id !== action.payload);
    }
    default:
      return state;
  }
}
