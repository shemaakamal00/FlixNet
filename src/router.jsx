import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
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
        path: "watchlist",
        element: <WatchlistPage />,
      },
    ],
  },
]);

export default router;
