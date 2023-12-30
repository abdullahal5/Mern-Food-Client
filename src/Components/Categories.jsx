import { Link } from "react-router-dom";
import Titlehook from "../Hook/Titlehook";

const categoryItems = [
  {
    id: 1,
    title: "Main Dish",
    des: "(86 dishes)",
    img: "/imgaes/Category/img1.png",
  },
  {
    id: 2,
    title: "Break Fast",
    des: "(12 break fast)",
    img: "/imgaes/Category/img2.png",
  },
  {
    id: 3,
    title: "Dessert",
    des: "(48 dessert)",
    img: "/imgaes/Category/img3.png",
  },
  {
    id: 4,
    title: "Browse All",
    des: "(155 items)",
    img: "/imgaes/Category/img4.png",
  },
];

const Categories = () => {
  return (
    <div>
      <div className="py-16 text-center">
        <Titlehook
          subTitle={"Customer Favorites"}
          title={"Popular Catagories"}
        />
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pb-10">
        {categoryItems.map((item) => (
          <Link to={`/category/${item.id}`} key={item.id}>
            <div className="space-y-1 pt-5 shadow-lg rounded-2xl py-6 px-5 cursor-pointer hover:-translate-y-4 duration-300 transition-all ">
              <img
                className="mx-auto bg-[#C1F1C6] rounded-full p-5 w-28 h-28"
                src={item.img}
                alt=""
              />
              <h1 className="text-lg font-medium text-black text-center">
                {item.title}
              </h1>
              <p className="text-center text-secondary">{item.des}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
