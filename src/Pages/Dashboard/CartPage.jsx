import { TbFidgetSpinner } from "react-icons/tb";
import useCart from "../../Hook/useCart";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const CartPage = () => {
  const [cart, isPending, refetch] = useCart();
  const { user } = useAuth();
  const [cartItems, setItems] = useState([]);
  const [cartSubTotal1, setCartSubTotal] = useState(0);
  const axiosSecure = useAxiosSecure()

  if (isPending) {
    <div className="flex justify-center h-[100vh] items-center flex-col">
      <TbFidgetSpinner className="animate-spin text-green" fontSize={"2rem"} />
      <p className="py-2 font-semibold">Loading...</p>
    </div>;
  }

  const handleDelete = (item) => {
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
          .delete(`/add/${item}`)
          .then((res) => {
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

  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      axiosSecure
        .put(`/add/${item?._id}`, { quantity: item.quantity - 1 })
        .then(() => {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item._id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          refetch();
          setItems(updatedCart);
        });
    } else {
      return alert("noo");
    }
  };
  const handleIncrease = (item) => {
    axiosSecure
      .put(`/add/${item?._id}`, { quantity: item.quantity + 1 })
      .then(() => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        refetch();
        setItems(updatedCart);
      });
  };


  useEffect(() => {
    const subTotal = cart.reduce((total, item) => {
      return total + calculatePrice(item);
    }, 0);
    setCartSubTotal(subTotal);
  }, [cart]);


  return (
    <div className="section-container min-h-screen">
      <div className=" space-y-7 px-4 pt-28 text-center">
        <h1 className="text-4xl md:text-4xl font-bold md:leading-snug leading-snug">
          Items Added To The
          <span className="text-green"> Food</span>
        </h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-green text-white">
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((item, idx) => (
                <tr key={item._id}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="">$ {calculatePrice(item).toFixed(2)}</td>
                  <td className="flex items-center ">
                    <button
                      onClick={() => handleDecrease(item)}
                      className="btn btn-xs btn-circle"
                    >
                      -
                    </button>
                    <input
                      value={item.quantity}
                      type="number"
                      name=""
                      onChange={() => console.log(item.quantity)}
                      id=""
                      className="w-10 mx-2 text-center overflow-hidden appearance-none"
                      readOnly
                    />
                    <button
                      onClick={() => handleIncrease(item)}
                      className="btn btn-xs btn-circle"
                    >
                      +
                    </button>
                  </td>
                  <th>
                    <button
                      onClick={() => handleDelete(item._id)}
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
      <div className="my-7 flex justify-around items-center md:flex-row lg:flex-row flex-col gap-10 border p-10">
        <div className=" space-y-3 ">
          <h3 className="font-semibold text-xl ">Customer Details</h3>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>User_id: {user.uid}</p>
        </div>
        <div className=" space-y-3">
          <h3 className="font-semibold text-xl ">Shopping Details</h3>
          <p>Total Items: {cart.length}</p>
          <p>Total Price: ${cartSubTotal1.toFixed(2)}</p>
          <Link to="/payment">
            <button className="btn bg-green text-white">
              Procceed Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;