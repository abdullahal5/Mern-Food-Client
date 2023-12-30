import { useState } from "react";
import { Link } from "react-router-dom";
import {FaHeart} from 'react-icons/fa'

const Cards = ({item}) => {
  const [isHeartFillted, setIsHeartFillted] = useState(false)
  const handleHeartClick = () =>{
    setIsHeartFillted(!isHeartFillted);
  }
    return (
      <div className="card w-80 h-auto bg-base-100 shadow-xl relative rounded-[30px]">
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
            <button className="btn bg-green text-white">Add To Cart</button>
          </div>
        </div>
      </div>
    );
};

export default Cards;