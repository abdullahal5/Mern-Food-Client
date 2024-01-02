import { useContext, useState } from "react";
import { Link, json, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import useCart from "../Hook/useCart";

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const [isHeartFillted, setIsHeartFillted] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation()
  const [ , , refetch] = useCart()
  const handleHeartClick = () => {
    setIsHeartFillted(!isHeartFillted);
  };
  const handleAddToCart = (item) => {
    if (user && user?.email) {
      const cartItem = { menuItemId: _id, name, quantity: 1, image, price, email: user.email };
      fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.insertedId){
            Swal.fire({
              title: "Good job!",
              text: "You Successfully added a cart!",
              icon: "success",
            });
            refetch()
          }
        });
    }else{
      Swal.fire({
        title: "Sorry! you can't add cart",
        text: " You are not logged in, Login or Register first!",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/register", {state: {from: location}});
        }
      });
    }
  };
  return (
    <div className="card w-72 h-auto bg-base-100 shadow-xl relative rounded-[30px]">
      <div
        className={`rating gap-1 absolute right-0 top-0 p-4 heartStar bg-green rounded-tr-[30px] rounded-bl-[30px] ${
          isHeartFillted ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item?._id}`}>
        <figure>
          <img
            className="hover:scale-105 transition-all duration-200 md:h-72"
            src={item?.image}
            alt="Shoes"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item?._id}`}>
          <h2 className="card-title">{item?.name}</h2>
          <p className="text-secondary text-sm">Description of the item</p>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <h5 className="font-semibold text-black text-lg">
            <span className="text-red text-sm">$</span>
            {item?.price}
          </h5>
          <button
            onClick={() => handleAddToCart(item)}
            className="btn bg-green text-white"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
