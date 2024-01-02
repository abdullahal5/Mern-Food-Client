import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Shop/Menu";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import UpdatedProfile from "../Pages/Dashboard/updatedProfile";
import CartPage from "../Pages/Dashboard/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/updatedprofile",
        element: (
          <PrivateRoute>
            <UpdatedProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/cartpage",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router