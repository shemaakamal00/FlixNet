import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Search from "./pages/Search";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
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
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "titles/:mediaType/:id",
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
