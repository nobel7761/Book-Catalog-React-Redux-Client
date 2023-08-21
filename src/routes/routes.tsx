import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import AllBooks from "../pages/AllBooks";
import Signup from "../pages/Signup";
import PrivateRoute from "./PrivateRoute";
import BookDetails from "../pages/BookDetails";
import EditBook from "../pages/EditBook";
import AddNewBook from "../pages/AddNewBook";
import FeaturedPage from "../pages/FeaturedPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-book/:id",
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/book/:id",
        element: <BookDetails />,
      },
      {
        path: "/wish-list",
        element: <FeaturedPage />,
      },
      {
        path: "/read-soon",
        element: <FeaturedPage />,
      },
      {
        path: "/read-future",
        element: <FeaturedPage />,
      },
      {
        path: "/finish-reading",
        element: <FeaturedPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default routes;
