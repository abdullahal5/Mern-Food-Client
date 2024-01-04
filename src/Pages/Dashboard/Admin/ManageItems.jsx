import { useQuery } from "@tanstack/react-query";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const ManageItems = () => {
  const axiosSecure = useAxiosSecure();
  const {
    isPending,
    data: items = [],
    refetch,
  } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await axiosSecure.get("/cartItems");
      return res.data;
    },
  });

  if (isPending) {
    <div className="flex justify-center h-[100vh] items-center flex-col">
      <TbFidgetSpinner className="animate-spin text-green" fontSize={"2rem"} />
      <p className="py-2 font-semibold">Loading...</p>
    </div>;
  }

  const handleDeleteItem = (item) => {
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
        axiosSecure.delete(`/cartItems/${item}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Item has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="flex items-center justify-around text-green">
        <h1 className="text-3xl  text-center py-2 font-semibold">All Items</h1>
        <h1 className="text-3xl  text-center py-2 font-semibold">
          Total Item: {items?.length}
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="bg-green text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, idx) => (
              <tr key={item._id}>
                <td>{idx + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item?.image} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item?.name}</div>
                    </div>
                  </div>
                </td>
                <td>{item?.category}</td>
                <td>$ {item?.price}</td>
                <th>
                  <Link to={`/dashboard/update/${item._id}`}>
                    <button className="btn btn-ghost btn-xs bg-green text-white">
                      Update
                    </button>
                  </Link>
                </th>
                <th>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="btn btn-ghost btn-xs bg-green text-white"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;