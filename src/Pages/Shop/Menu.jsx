import { useEffect, useState } from "react";
import Cards from "../../Components/Cards";
import { FaFilter } from "react-icons/fa";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const categoryName = [
  {
    id: 1,
    name: "All",
    path: "all",
  },
  {
    id: 2,
    name: "Salad",
    path: "salad",
  },
  {
    id: 3,
    name: "Pizza",
    path: "pizza",
  },

  {
    id: 4,
    name: "Desserts",
    path: "dessert",
  },
  {
    id: 5,
    name: "Soup",
    path: "soup",
  },
  {
    id: 6,
    name: "Drinks",
    path: "drinks",
  },
  {
    id: 7,
    name: "Offered",
    path: "offered",
  },
];

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get("/cartItems");
        setMenu(response.data);
        setFilteredItems(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  //   pagination

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="text-center bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100% top-0 left-0 right-0 flex justify-center items-center">
      <div className="section-container">
        <div className=" space-y-7 px-4 py-48">
          <h1 className="text-4xl md:text-4xl font-bold md:leading-snug leading-snug">
            Dive into Delights Of Delectable
            <span className="text-green"> Food</span>
          </h1>
          <p className="text-lg lg:text-xl md:text-xl text-secondary">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate
            Craftsmanship
          </p>
          <button className="btn bg-green text-white px-8 py-3 font-semibold rounded-full">
            Order Now
          </button>
        </div>
        {/* menu item */}
        <h1 className="text-4xl font-bold ">Filtering and Sorting</h1>
        <p className="font-semibold my-5 text-lg">
          Total Items {filteredItems?.length}
        </p>
        <div className="my-7 flex flex-col md:flex-row lg:flex-row justify-between">
          <div className="flex-wrap flex mb-5 gap-8 justify-center md:justify-start md:items-center">
            {categoryName.map((item) => (
              <button
                className={`${
                  selectedCategory === item.path
                    ? "rounded-full px-5 py-2 bg-green text-white"
                    : ""
                }`}
                key={item.id}
                onClick={() => filterItems(`${item.path}`)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="relative">
            <FaFilter
              className="absolute top-3 p-1"
              fontSize={"1.5rem"}
              color="#39DB4A"
            />
            <select
              name="sort"
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-[#90BD95] px-5 py-3 text-black"
              id=""
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center items-center my-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {currentItems?.map((item) => (
              <Cards key={item._id} item={item} />
            ))}
          </div>
        </div>
        <div className="py-5 flex flex-wrap justify-center gap-5">
          {Array.from({
            length: Math.ceil(filteredItems.length / itemsPerPage),
          }).map((_, index) => (
            <button
              className={`btn rounded-full ${
                currentPage === index + 1 ? "bg-green text-white" : ""
              }`}
              key={index + 1}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;