import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Shop/Menu";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import UpdatedProfile from "../Pages/Dashboard/updatedProfile";
import CartPage from "../Pages/Dashboard/CartPage";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Admin/Dashboard";
import Users from "../Pages/Dashboard/Admin/users";
import AddProducts from "../Pages/Dashboard/Admin/AddProducts";
import ManageBookings from "../Pages/Dashboard/Admin/ManageBookings";
import ManageItems from "../Pages/Dashboard/Admin/ManageItems";
import UpdateManageItems from "../Pages/Dashboard/Admin/UpdateManageItems";

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
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "addProduct",
        element: <AddProducts />,
      },
      {
        path: "managebookings",
        element: <ManageBookings />,
      },
      {
        path: "manageitems",
        element: <ManageItems />,
      },
      {
        path: "manageitems/update/:id",
        element: <UpdateManageItems />,
        loader: ({params}) =>
          fetch(`http://localhost:5000/menu/${params.id}`),
      },
    ],
  },
]);

export default router