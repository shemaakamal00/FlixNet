import { useEffect, useState } from "react";
import {
  getComingNextWeek,
  getNewMovies,
  getTop10MoviesSweden,
  getTop10SeriesSweden,
  getUpcomingMovies,
} from "../services/movieApi";

function useHomeSections() {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Tracks whether the component is still mounted to prevent state updates after unmount
    let isMounted = true;

    async function loadHomePage() {
      try {
        setIsLoading(true);
        setError("");

        // Fire all API requests concurrently instead of one by one — much faster
        const [
          newMovies,
          top10Movies,
          top10Series,
          comingNextWeek,
          upcomingMovies,
        ] = await Promise.all([
          getNewMovies(),
          getTop10MoviesSweden(),
          getTop10SeriesSweden(),
          getComingNextWeek(),
          getUpcomingMovies(),
        ]);

        // Skip state update if the component unmounted while requests were in flight
        if (!isMounted) {
          return;
        }

        setSections([
          {
            title: "Nytt på FlexNet",
            movies: newMovies.results,
            badge: "Ny säsong",
          },
          {
            title: "Topp 10 bland filmer i Sverige i dag",
            movies: top10Movies.results,
            isTop10: true,
            badge: "Nytt hos oss",
          },

          {
            title: "Topp 10 bland serier i Sverige i dag",
            movies: top10Series.results,
            isTop10: true,
            badge: "Nytt hos oss",
          },

          { title: "Kommer nästa vecka", movies: comingNextWeek.results },
          { title: "Värda att vänta på", movies: upcomingMovies.results },
        ]);
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

    loadHomePage();
    // Cleanup: signal that the component has unmounted so we don't call setState on it
    return () => {
      isMounted = false;
    };
  }, []);

  return { sections, isLoading, error };
}

export default useHomeSections;
