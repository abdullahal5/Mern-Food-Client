import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link } from "react-router-dom";

const Order = () => {
    const { user } = useAuth();
    const token = localStorage.getItem("access-token");
    const axiosSecure = useAxiosSecure();
    const {
      isPending,
      isLoading,
      data: order = [],
      refetch,
    } = useQuery({
      queryKey: ["order"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/orderAdmin?email=${user?.email}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      },
    });
    
    if(isPending){
        <div className="flex justify-center h-[100vh] items-center flex-col">
          <TbFidgetSpinner
            className="animate-spin text-green"
            fontSize={"2rem"}
          />
          <p className="py-2 font-semibold">Loading...</p>
        </div>;
    }

    if(isLoading){
    <div className="flex justify-center h-[100vh] items-center flex-col">
      <TbFidgetSpinner className="animate-spin text-green" fontSize={"2rem"} />
      <p className="py-2 font-semibold">Loading...</p>
    </div>
    }
    return (
      <div className="section-container my-10">
        <h1 className="text-3xl mt-28 mb-10 font-semibold text-center">
          Track your All <span className="text-green">Orders</span>
        </h1>
        <table className="table ">
          <thead className="bg-green text-white">
            <tr>
              <th>#</th>
              <th>Order Date</th>
              <th>Transaction</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {order?.map((item, idx) => (
              <tr key={item?._id}>
                <td>{idx + 1}</td>
                <td>{item?.orderDate}</td>
                <td className="flex items-center ">{item?.transactionId}</td>
                <td className="">${item?.price}</td>
                <td>{item.status}</td>
                <Link to="/contact">
                  <td className=" text-white">
                    <span className="bg-red text-sm rounded-md p-1">
                      Contact
                    </span>
                  </td>
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default Order;