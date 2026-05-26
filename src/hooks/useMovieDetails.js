import { useEffect, useState } from "react";
import {
  getMovieDetails,
  getSeriesDetails,
  getSimilarTitles,
} from "../services/movieApi";

// Custom hook that handles fetching of movie/series details and similar titles
function useMovieDetails(id, mediaType) {
  const [titleData, setTitleData] = useState(null);
  const [similarTitles, setSimilarTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || !mediaType) return;
    let isMounted = true;

    async function loadDetails() {
      try {
        setIsLoading(true);
        setError("");

        // Fetch details and similar titles in parallel
        const [data, similarData] = await Promise.all([
          mediaType === "tv" ? getSeriesDetails(id) : getMovieDetails(id),
          getSimilarTitles(id, mediaType),
        ]);

        if (isMounted) {
          setTitleData({ ...data, media_type: mediaType });
          setSimilarTitles(similarData.results.slice(0, 6));
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDetails();
    return () => {
      isMounted = false;
    };
  }, [id, mediaType]);

  return { titleData, similarTitles, isLoading, error };
}

export default useMovieDetails;