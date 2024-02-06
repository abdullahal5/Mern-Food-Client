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
import AdminRoute from "./AdminRoute";
import Payment from "../Pages/Shop/Payment";
import Order from "../Pages/Shop/Order";

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
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment />
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
      // <PrivateRoute>
      <DashboardLayout />
      // </PrivateRoute>
    ),
    children: [
      {
        path: "order",
        element: (
          // <PrivateRoute>
          <Order />
          // </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          // <AdminRoute>
          //   <PrivateRoute>
          <Dashboard />
          //   </PrivateRoute>
          // </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          // <AdminRoute>
          //   <PrivateRoute>
          <Users />
          //   </PrivateRoute>
          // </AdminRoute>
        ),
      },
      {
        path: "addProduct",
        element: (
          // <AdminRoute>
          //   <PrivateRoute>
          <AddProducts />
          //   </PrivateRoute>
          // </AdminRoute>
        ),
      },
      {
        path: "managebookings",
        element: (
          // <AdminRoute>
          // <PrivateRoute>
          <ManageBookings />
          // </PrivateRoute>
          // </AdminRoute>
        ),
      },
      {
        path: "manageitems",
        element: (
          // <AdminRoute>
          //   <PrivateRoute>
          <ManageItems />
          //   </PrivateRoute>
          // </AdminRoute>
        ),
      },
      {
        path: "update/:id",
        element: (
          // <AdminRoute>
          //   <PrivateRoute>
          <UpdateManageItems />
          //   </PrivateRoute>
          // </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://food-project-server.vercel.app/cartItems/${params.id}`
          ),
      },
    ],
  },
]);

export default router;
