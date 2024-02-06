import axios from "axios";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const image = data?.image[0];
    const Ddata = new FormData();
    Ddata.append("image", image);
    const res = await axios.post(
      "https://api.imgbb.com/1/upload?key=e0402a6916e18617c709ea2e5087ca44",
      Ddata,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );


    const addData = {
      name: data.name,
      recipe: data.bio,
      image: res.data.data.display_url,
      category: data.category,
      price: data.price,
    };
    axiosSecure.post("/cartItems", addData).then((res) => {
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          title: "Good job!",
          text: "You Successfully added a cart!",
          icon: "success",
        });
        navigate("/dashboard/manageitems");
      }
    });
  };

  return (
    <div>
      <h1 className="w-full text-3xl font-semibold text-center">Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-5 md:w-2/3 mx-auto">
        <label className="">Recipe Name*</label>
        <input
          type="text"
          placeholder="Your Name"
          name="name"
          {...register("name", { required: true })}
          className="input block input-bordered outline-none w-full mt-2"
        />
        <div className="text-center text-red">
          {errors.name && (
            <span className="text-red-600">Name is required</span>
          )}
        </div>
        <div className="flex flex-col lg:flex-row md:flex-row items-center justify-between my-5 gap-5 md:gap-10 lg:gap-10">
          <div className="md:w-1/2">
            <label>Category*</label>
            <select
              name="category"
              defaultValue=""
              {...register("category", { required: true })}
              className="select select-bordered w-full mt-2"
            >
              <option disabled value="">
                Select a category
              </option>
              <option value="popular">Popular</option>
              <option value="dessert">Dessert</option>
              <option value="pizza">pizza</option>
              <option value="salad">Salad</option>
              <option value="offered">Offered</option>
              <option value="soup">Soup</option>
              <option value="drinks">Drinks</option>
            </select>
            <div className="text-center text-red">
              {errors.category && (
                <span className="text-red-600">Category is required</span>
              )}
            </div>
          </div>
          <div className="md:w-1/2">
            <label>Price*</label>
            <input
              type="number"
              placeholder="Price"
              name="price"
              {...register("price", { required: true })}
              className="input block input-bordered outline-none mt-2 w-full"
            />
            <div className="text-center text-red">
              {errors.price && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>
          </div>
        </div>
        <label>Recipe Details*</label>
        <textarea
          name="bio"
          {...register("bio", { required: true })}
          placeholder="Recipe Bio"
          className="w-full input input-bordered outline-none h-36 resize-none p-4 mt-2"
        ></textarea>
        <div className="text-center text-red">
          {errors.bio && <span className="text-red-600">Bio is required</span>}
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row gap-10 mt-4">
          <div>
            <input
              type="file"
              name="image"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full max-w-xs"
            />
            <div className="text-center text-red">
              {errors.image && (
                <span className="text-red-600">Image is required</span>
              )}
            </div>
          </div>
          <button type="submit" className="btn bg-green text-white">
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;