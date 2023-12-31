import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Main = () => {
  return (
    <div>
      <Navbar />
      {/* <div className="h-screen"> */}
        <Outlet />
      {/* </div> */}
      <Footer />
    </div>
  );
};

export default Main;
