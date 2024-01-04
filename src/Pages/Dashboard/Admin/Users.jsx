import { useQuery } from "@tanstack/react-query";
import { FaUser } from "react-icons/fa6";
import { TbFidgetSpinner } from "react-icons/tb";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const {
    isPending,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res?.data;
    },
  });

  if (isPending) {
    <div className="flex justify-center h-[100vh] items-center flex-col">
      <TbFidgetSpinner className="animate-spin text-green" fontSize={"2rem"} />
      <p className="py-2 font-semibold">Loading...</p>
    </div>;
  }

  const handleDeleteUser = (item) => {
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
        axiosSecure
          .delete(`http://localhost:5000/users/${item}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Users has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleMakeAdmin = (item) => {
    axiosSecure.patch(`http://localhost:5000/users/${item._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "!Good job",
          text: `${item.name} is an Admin now`,
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-around text-green">
        <h1 className="text-3xl  text-center py-2 font-semibold">All Users</h1>
        <h1 className="text-3xl  text-center py-2 font-semibold">
          Total Users: {users?.length}
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="bg-green text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>User Email</th>
              <th>User Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((item, idx) => (
              <tr key={item._id}>
                <td>{idx + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item?.photoURL} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item?.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {item?.role === "Admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(item)}
                      className="btn btn-circle bg-indigo-500 text-white"
                    >
                      <FaUser />
                    </button>
                  )}
                </td>
                <td>{item.email}</td>
                <td>{item._id}</td>
                <th>
                  <button
                    onClick={() => handleDeleteUser(item._id)}
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

export default Users;
