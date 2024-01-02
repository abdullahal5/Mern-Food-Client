import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const Profile = ({ user, setLoading, logout }) => {
  const handleLogout = () => {
    logout().then(() => {
      setLoading(false);
      toast.success("Successfully Logout!");
    });
  };
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content z-50">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className=" btn-circle btn">
          {user.photoURL ? (
            <img
              className="w-50 h-50 rounded-full"
              src={user?.photoURL}
              alt=""
            />
          ) : (
            <FaUserAlt/>
          )}
        </label>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu  p-4 w-80 min-h-full bg-base-200 text-base-content">
          <h1 className="text-center font-semibold text-3xl">
            {user.displayName}
          </h1>
          <hr className="border-black my-3" />
          <li>
            <Link to="/updatedprofile">Profile</Link>
          </li>
          <li>
            <Link>Order</Link>
          </li>
          <li>
            <Link>Settings</Link>
          </li>
          <li>
            <button className="w-full" onClick={handleLogout}>
              LogOut
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;