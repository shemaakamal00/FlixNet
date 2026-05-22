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
    let isMounted = true;

    async function loadHomePage() {
      try {
        setIsLoading(true);
        setError("");

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
    return () => {
      isMounted = false;
    };
  }, []);

  return { sections, isLoading, error };
}

export default useHomeSections;
