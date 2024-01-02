import { TbFidgetSpinner } from "react-icons/tb";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Register from "../Pages/Register/Register";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center h-[100vh] items-center flex-col">
        <TbFidgetSpinner className="animate-spin text-green" fontSize={'2rem'}/>
        <p className="py-2 font-semibold">Loading...</p>
      </div>
    );
  }

  if (user) {
    return children;
  } else {
    return <Register/>
  }
};

export default PrivateRoute;
