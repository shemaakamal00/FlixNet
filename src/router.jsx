import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Search from "./pages/Search";
import WatchlistPage from "./pages/WatchlistPage";

const router = createBrowserRouter([
  {
    // App acts as the root layout wrapper — all child routes render inside its <Outlet />
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        // Primary route: includes mediaType (movie/tv) so MovieDetails knows which API to call
        path: "titles/:mediaType/:id",
        element: <MovieDetails />,
      },
      {
        // Fallback route for links that only provide an id (defaults to movie in MovieDetails)
        path: "movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "watchlist",
        element: <WatchlistPage />,
      },
    ],
  },
]);

export default router;
