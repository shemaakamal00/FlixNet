export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

const GENRES = {
  12: "Äventyr",
  14: "Fantasy",
  16: "Animerat",
  18: "Drama",
  27: "Skräck",
  28: "Action",
  35: "Komedi",
  53: "Thriller",
  80: "Kriminal",
  99: "Dokumentär",
  10749: "Romantik",
  10751: "Familj",
  10759: "Action",
  10765: "Sci-fi",
};

export function getDisplayTitle(movie) {
  return movie.title || movie.name || "Okänd titel";
}

export function getMovieGenres(movie) {
  if (movie.genres) {
    return movie.genres.slice(0, 3).map((genre) => genre.name);
  }

  return (
    movie.genre_ids
      ?.map((id) => GENRES[id])
      .filter(Boolean)
      .slice(0, 3) || []
  );
}

export function getReleaseYear(movie) {
  const date = movie.release_date || movie.first_air_date;
  return date ? new Date(date).getFullYear() : "Okänt år";
}
