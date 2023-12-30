import { Link } from "react-router-dom";
import logo from "/logo.png";
import { BiPhoneCall } from "react-icons/bi";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <Link  to="/">Home</Link>
      </li>
      <li>
        <details>
          <summary>Menu</summary>
          <ul className="p-2">
            <li>
              <Link to="/all">All</Link>
            </li>
            <li>
              <Link to="/salad">Salad</Link>
            </li>
            <li>
              <Link to="/pizza">Pizza</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li>
              <Link to="/onlineorder">
                Online <br /> Order
              </Link>
            </li>
            <li>
              <Link to="tablebooking">
                Table <br /> Booking
              </Link>
            </li>
            <li>
              <Link to="/ordertracking">
                Order <br /> Tracking
              </Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link to="/offers">Offers</Link>
      </li>
    </>
  );
  return (
    <div
      className={`bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100% fixed top-0 left-0 right-0
      ${
        isSticky
          ? "shadow-md bg-base-100  transition-all duration-300 ease-in-out"
          : ""
      } z-50`}
    >
      <div className="section-container">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navItems}
              </ul>
            </div>
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>
          <div className="navbar-end">
            <button className="btn btn-ghost btn-circle hidden lg:flex md:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle mr-3 items-center justify-center hidden lg:flex md:flex"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <button className="btn bg-green text-white rounded-full px-6 flex items-center gap-2 ">
              <BiPhoneCall /> Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
