import { Link, Outlet } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { PiUsersThreeFill } from "react-icons/pi";
import { IoAddCircle } from "react-icons/io5";
import { FaBagShopping } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { IoHome } from "react-icons/io5";
import { MdRestaurantMenu } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa6";
import { GoSidebarCollapse } from "react-icons/go";
import { RiCustomerService2Fill } from "react-icons/ri";
import useAdmin from "../Hook/useAdmin";
import useAuth from "../Hook/useAuth";

const DashboardLayout = () => {
  const [isAdmin, isAdminLoading, refetch] = useAdmin();
  const {loading} = useAuth()
  return (
    <div className="mx-3">
      <div className="flex md:flex-row lg:flex-row flex-col">
        <div className="drawer lg:drawer-open w-full md:w-64 lg:w-72  overflow-y-auto">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex  items-center justify-between pt-5 overflow-x-hidden">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-2"
              className="btn btn-circle drawer-button lg:hidden hover:bg-green hover:text-white text-green outline outline-1 outline-green hover:outline-none"
            >
              <GoSidebarCollapse />
              {/* <button className="btn btn-circle btn-sm"></button> */}
            </label>
            <button className="btn rounded-full px-6 bg-green text-white lg:hidden md:hidden block ">
              LogOut
            </button>
          </div>
          <hr className="border-gray-300 my-3" />
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu flex flex-col pt-5 w-64 bg-gray-200 min-h-full text-base-content">
              {
                isAdmin ? <div>
                <div className="py-3 flex items-center gap-3 justify-center text-center mx-auto">
                  <img src="/logo.png" alt="" />
                  <div className="badge badge-primary ">Admin</div>
                </div>
                <hr className="border-gray-300 my-1" />
                <li>
                  <Link className="items-center">
                    <RiDashboardFill fontSize={"1.5rem"} /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="users">
                    <PiUsersThreeFill fontSize={"1.5rem"} /> All Users
                  </Link>
                </li>
                <li>
                  <Link to="addProduct">
                    <IoAddCircle fontSize={"1.5rem"} /> Add Product
                  </Link>
                </li>
                <li>
                  <Link to="managebookings">
                    <FaBagShopping fontSize={"1.5rem"} /> Manage Bookings
                  </Link>
                </li>
                <li>
                  <Link to="manageitems">
                    <FiEdit fontSize={"1.5rem"} /> Manage Items
                  </Link>
                </li>
              </div> : ""
              }
              <hr className="border-gray-300 my-6" />
              <div>
                <li>
                  <Link to="/">
                    <IoHome fontSize={"1.5rem"} /> Home
                  </Link>
                </li>
                <li>
                  <Link to="/menu">
                    <MdRestaurantMenu fontSize={"1.5rem"} /> Menu
                  </Link>
                </li>
                <li>
                  <Link to="ordertracking">
                    <FaLocationArrow fontSize={"1.5rem"} /> Order Tracking
                  </Link>
                </li>
                <li>
                  <Link to="customercare">
                    <RiCustomerService2Fill fontSize={"1.5rem"} /> Customer
                    Support
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div className="w-full pt-5 flex-1 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
