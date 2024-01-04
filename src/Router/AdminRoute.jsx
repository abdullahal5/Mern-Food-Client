import { TbFidgetSpinner } from "react-icons/tb";
import useAdmin from "../Hook/useAdmin";
import useAuth from "../Hook/useAuth";
import { Navigate } from "react-router-dom";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()

    if(loading || isAdminLoading){
        <div className="flex justify-center h-[100vh] items-center flex-col">
          <TbFidgetSpinner
            className="animate-spin text-green"
            fontSize={"2rem"}
          />
          <p className="py-2 font-semibold">Loading...</p>
        </div>;
    }

    if(user && isAdmin){
        return children
    }

    return <Navigate to="/" />
};

export default AdminRoute;