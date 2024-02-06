import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { TiTick } from "react-icons/ti";
import { MdPending } from "react-icons/md";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const {
    isPending,
    data: order = [],
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order");
      return res?.data;
    },
  });

  const handleConfirmOrder = (item) => {
    axiosSecure.patch(`/orderAdmin/${item?._id}`, item).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Good job!",
          text: "You Successfully confirmed a order!",
          icon: "success",
        });
        refetch();
      }
    });
  };

  const handleDeleteOrder = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/orderAdmin/${item?._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold">All Bookings</h1>
      <table className="table ">
        <thead className="bg-green text-white">
          <tr>
            <th>#</th>
            <th>User email</th>
            <th>Transaction Id</th>
            <th>Price</th>
            <th>Status</th>
            <th>Confirm Order</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {order?.map((item, idx) => (
            <tr key={item?._id}>
              <td>{idx + 1}</td>
              <td>{item?.email}</td>
              <td className="flex items-center ">{item?.transactionId}</td>
              <td className="">${item?.price}</td>
              <td>
                {item.status === "Order confirmed" ? (
                  <p className="bg-green text-center text-white text-sm p-1 rounded-md">
                    <TiTick className="inline" /> Order Confirmed
                  </p>
                ) : (
                  <p className="bg-red p-1 rounded-md text-sm text-white text-center">
                    <MdPending className="inline" /> {item.status}
                  </p>
                )}
              </td>
              <td>
                {item.status === "Order confirmed" ? (
                  "Order confirmed"
                ) : (
                  <button
                    onClick={() => handleConfirmOrder(item)}
                    className="btn-sm rounded-md bg-green text-white"
                  >
                    Confirm
                  </button>
                )}
              </td>
              <td>
                <button
                  onClick={() => handleDeleteOrder(item)}
                  className="btn-sm text-sm rounded-md bg-green text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;
