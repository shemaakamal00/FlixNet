import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import MovieDetails from "./pages/MovieDetails";
import Search from "./pages/Search";
import WatchlistPage from "./pages/WatchlistPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "titles/:mediaType/:id",
        element: <MovieDetails />,
      },
      {
        path: "movie/:id",
        element: <MovieDetail />,
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
